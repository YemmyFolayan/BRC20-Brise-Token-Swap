/* eslint-disable */
import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import { Button, CardBody, Input, CardHeader } from '@evofinance9/uikit'
import { ethers } from 'ethers'

import { BigNumber } from '@ethersproject/bignumber'
import { DateTimePicker } from '@material-ui/pickers'
import { TextField, withStyles } from '@material-ui/core'
import { TransactionResponse } from '@ethersproject/providers'

import { FaInfoCircle } from 'react-icons/fa'

import addAirdrop from './apicalls'

import { useAirdropContract, useDateTimeContract } from 'hooks/useContract'
import { getAirdropContract, getTokenContract } from 'utils'
import getUnixTimestamp from 'utils/getUnixTimestamp'

import './style.css'
import { AppBodyExtended } from 'pages/AppBody'

import { useActiveWeb3React } from 'hooks'

import Container from 'components/Container'
import TransactionConfirmationModal from 'components/TransactionConfirmationModal'
import Tooltip from 'components/Tooltip'

const CssTextField = withStyles({
  root: {
    '&': {
      border: 'red',
      borderRadius: '16px',
    },
    '& label.Mui-focused': {
      color: '#aaa',
    },

    '& .MuiInputBase-input': {
      color: '#F4EEFF',
      backgroundColor: '#18191A',
      borderRadius: '16px',
      boxShadow: 'inset 0px 2px 2px -1px rgb(74 74 104 / 10%)',
      display: 'block',
      fontSize: '16px',
      height: '48px',
      outline: '0',
      padding: '0 16px',
    },
    '& .MuiInputBase-input:focus': {
      boxShadow: '0px 0px 0px 1px #7645D9,0px 0px 0px 4pxrgba(118,69,217,0.6)',
    },
  },
})(TextField)

export default function Airdrop() {
  const { account, chainId, library } = useActiveWeb3React()
  const airdropContract = useAirdropContract(true)

  const dateTimeContract = useDateTimeContract()

  const [txHash, setTxHash] = useState<string>('')
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)
  const [allowcationTooltip, setAllowcationTooltip] = useState<boolean>(false)
  const [allowcationAmountTooltip, setAllowcationAmountTooltip] = useState<boolean>(false)

  const [formData, setFormData] = useState({
    chain_id: '32520',
    owner_address: '',
    token_address: '',
    token_name: '',
    token_symbol: '',
    token_decimal: '',
    addresses_to: '',
    amounts_to: '',
    logo_url: '',
    website_url: '',
    twitter_url: '',
    instagram_url: '',
    telegram_url: '',
    discord_url: '',
    reddit_url: '',
    github_url: '',
    title: '',
    description: '',
  })

  // destructure
  const {
    token_address,
    token_name,
    token_decimal,
    token_symbol,
    logo_url,
    website_url,
    title,
    addresses_to,
    amounts_to,
    twitter_url,
    instagram_url,
    telegram_url,
    discord_url,
    reddit_url,
    github_url,
    description,
  } = formData

  useEffect(() => {
    const fetch = async () => {
      if (!library || !account) return
      const tokenContract = getTokenContract(token_address, library, account)
      const TName = await tokenContract?.callStatic.name()
      const TSymbol = await tokenContract?.callStatic.symbol()
      const TDecimals = await tokenContract?.callStatic.decimals()

      setFormData((prev) => ({ ...prev, token_name: TName, token_symbol: TSymbol, token_decimal: TDecimals }))
    }
    if (account && token_address && library instanceof ethers.providers.Web3Provider) {
      fetch()
    }
  }, [token_address, account, library])

  const handleDismissConfirmation = () => {
    setShowConfirm(false)
    setTxHash('')
  }

  const handleChange = (name) => (event) => {
    const value = event.target.value
    setFormData({ ...formData, [name]: value })
  }

  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const createAirdrop = async (formData) => {
    if (!chainId || !library || !account) return
    const airdrop = getAirdropContract(chainId, library, account)

    // const currentAirdropId = await airdropContract?.callStatic.currentAirdropId()
    const staticFee = await airdropContract?.callStatic.staticFee()

    const payload = [
      addresses_to.split(','),
      amounts_to
        .split(',')
        .map((amount) => ethers.utils.parseUnits(amount.toString(), parseInt(token_decimal)).toString()),
      token_address,
      false,
      0,
      0,
      0,
    ]
    console.log(airdrop)
    console.log(payload)
    const method: (...args: any) => Promise<TransactionResponse> = airdrop!.createAirdrop
    const args: Array<object | string[] | string | boolean | number> = payload
    const value: BigNumber = ethers.utils.parseEther(`${ethers.utils.formatEther(staticFee.toString())}`)

    setAttemptingTxn(true)
    await method(...args, {
      value: value,
    })
      .then(async (response: any) => {
        const txReceipt = await response.wait()
        console.log(txReceipt)
        const airdropId = txReceipt.events[0].args.airdropID.toNumber()
        console.log(airdropId)
        setAttemptingTxn(false)
        console.log(response)
        addAirdrop({
          ...formData,
          addresses_to: addresses_to.split(','),
          amounts_to: amounts_to.split(','),
          airdrop_id: airdropId,
          owner_address: account,
        })
          .then((data) => {
            if (data.error) {
              swal('Oops', 'Something went wrong!', 'error')
            } else {
              setFormData({
                ...formData,
                chain_id: '32520',
                owner_address: '',
                token_address: '',
                token_name: '',
                token_symbol: '',
                token_decimal: '',
                addresses_to: '',
                amounts_to: '',
                logo_url: '',
                website_url: '',
                twitter_url: '',
                instagram_url: '',
                telegram_url: '',
                discord_url: '',
                reddit_url: '',
                github_url: '',
                title: '',
                description: '',
              })
              swal('Congratulations!', 'Airdrop is added!', 'success')
            }
          })
          .catch((err) => console.log('Error in signup'))
        setTxHash(response.hash)
      })
      .catch((e) => {
        setAttemptingTxn(false)
        // we only care if the error is something _other_ than the user rejected the tx
        if (e?.code !== 4001) {
          console.error(e)
          alert(e.message)
        }
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !token_address ||
      !token_name ||
      !token_decimal ||
      !token_symbol ||
      !title ||
      !addresses_to ||
      !amounts_to ||
      !description
    ) {
      swal('Are you sure?', 'There are incomplete fields in your submission!', 'warning')
      return
    }

    createAirdrop(formData)
  }

  return (
    <>
      <Container>
        <AppBodyExtended>
          {txHash && (
            <TransactionConfirmationModal
              isOpen={true}
              onDismiss={handleDismissConfirmation}
              attemptingTxn={false}
              hash={txHash}
              content={() => <></>}
              pendingText={''}
            />
          )}
          <CardHeader>Create Airdrop</CardHeader>
          <CardBody>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Input
                  placeholder="Token Address"
                  className="mt-3"
                  scale="lg"
                  value={token_address}
                  onChange={handleChange('token_address')}
                />
              </div>

              <div className="col-md-6 mb-3">
                <Input
                  placeholder="Token Name"
                  scale="lg"
                  className="mt-3"
                  value={token_name}
                  onChange={handleChange('token_name')}
                />
              </div>

              <div className="col-md-6 mb-3">
                <Input
                  placeholder="Token Symbol"
                  scale="lg"
                  className="mt-3"
                  value={token_symbol}
                  onChange={handleChange('token_symbol')}
                />
              </div>

              <div className="col-md-6 mb-3">
                <Input
                  placeholder="Token Decimal"
                  className="mt-3"
                  scale="lg"
                  value={token_decimal}
                  onChange={handleChange('token_decimal')}
                />
              </div>

              <div className="col-md-12 mb-3">
                <Input
                  placeholder="Airdrop Title"
                  className="mt-3"
                  scale="lg"
                  value={title}
                  onChange={handleChange('title')}
                />
              </div>

              <div className="col-md-12 mb-3">
                <div className="row">
                  <div className="col-md-11">
                    <Input
                      placeholder="Airdrop Addresses"
                      className="mt-3"
                      scale="lg"
                      value={addresses_to}
                      onChange={handleChange('addresses_to')}
                    />
                  </div>
                  <div className="col-md-1 d-flex align-items-center justify-content-center">
                    <Tooltip
                      show={allowcationTooltip}
                      placement="right"
                      text="Allocation addresses must be comma-separated"
                    >
                      <FaInfoCircle
                        onMouseEnter={() => setAllowcationTooltip(true)}
                        onMouseLeave={() => setAllowcationTooltip(false)}
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>

              <div className="col-md-12 mb-3">
                <div className="row">
                  <div className="col-md-11">
                    <Input
                      placeholder="Airdrop Amounts"
                      className="mt-3"
                      scale="lg"
                      value={amounts_to}
                      onChange={handleChange('amounts_to')}
                    />
                  </div>
                  <div className="col-md-1 d-flex align-items-center justify-content-center">
                    <Tooltip
                      show={allowcationAmountTooltip}
                      placement="right"
                      text="Allocation amounts must be comma-separated"
                    >
                      <FaInfoCircle
                        onMouseEnter={() => setAllowcationAmountTooltip(true)}
                        onMouseLeave={() => setAllowcationAmountTooltip(false)}
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-3">
                <Input
                  placeholder="Logo URL"
                  scale="lg"
                  className="mt-3"
                  value={logo_url}
                  onChange={handleChange('logo_url')}
                />
              </div>

              <div className="col-md-6 mb-3">
                <Input
                  placeholder="Website"
                  className="mt-3"
                  scale="lg"
                  value={website_url}
                  onChange={handleChange('website_url')}
                />
              </div>

              <div className="col-md-6 mb-3">
                <Input
                  placeholder="Twiiter URL"
                  className="mt-3"
                  scale="lg"
                  value={twitter_url}
                  onChange={handleChange('twitter_url')}
                />
              </div>

              <div className="col-md-6 mb-3">
                <Input
                  placeholder="Instagram URL"
                  className="mt-3"
                  scale="lg"
                  value={instagram_url}
                  onChange={handleChange('instagram_url')}
                />
              </div>

              <div className="col-md-6 mb-3">
                <Input
                  placeholder="Telegram URL"
                  className="mt-3"
                  scale="lg"
                  value={telegram_url}
                  onChange={handleChange('telegram_url')}
                />
              </div>

              <div className="col-md-6 mb-3">
                <Input
                  placeholder="Discord URL"
                  className="mt-3"
                  scale="lg"
                  value={discord_url}
                  onChange={handleChange('discord_url')}
                />
              </div>

              <div className="col-md-6 mb-3">
                <Input
                  placeholder="Reddit URL"
                  className="mt-3"
                  scale="lg"
                  value={reddit_url}
                  onChange={handleChange('reddit_url')}
                />
              </div>

              <div className="col-md-6 mb-3">
                <Input
                  placeholder="Github URL"
                  className="mt-3"
                  scale="lg"
                  value={github_url}
                  onChange={handleChange('github_url')}
                />
              </div>

              <div className="col-md-12 mb-3">
                <Input
                  placeholder="Description"
                  className="mt-3"
                  scale="lg"
                  value={description}
                  onChange={handleChange('description')}
                />
              </div>
            </div>
          </CardBody>

          <div className="d-flex justify-content-center  mb-5">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </AppBodyExtended>
      </Container>
      <div className="mt-5"> </div>
    </>
  )
}
