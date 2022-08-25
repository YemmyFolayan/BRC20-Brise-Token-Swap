/* eslint-disable */
import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import { Button, CardHeader, CardBody, Input } from '@evofinance9/uikit'
import { DateTimePicker } from '@material-ui/pickers'
import { TextField, withStyles } from '@material-ui/core'
import { Checkbox, useCheckboxState } from 'pretty-checkbox-react'
import '@djthoms/pretty-checkbox'

import { ethers } from 'ethers'

import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'

import addBitgertLock from './apicalls'

import { useBitgertLockContract, useDateTimeContract, useTokenContract } from 'hooks/useContract'
import { getBitgertLockContract, getTokenContract } from 'utils'
import getUnixTimestamp from 'utils/getUnixTimestamp'

import './style.css'

import { useActiveWeb3React } from 'hooks'

import Container from 'components/Container'
import TransactionConfirmationModal from 'components/TransactionConfirmationModal'

import { AppBodyExtended } from 'pages/AppBody'
import { LOCK_ADDRESS } from 'constants/abis/lock'

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

export default function Locker() {
  const checkbox = useCheckboxState({ state: [] })
  const { account, chainId, library } = useActiveWeb3React()
  const bitgertLockContract = useBitgertLockContract(true)
  const dateTimeContract = useDateTimeContract()

  const [currentSaleId, setCurrentSaleId] = useState(0)
  const [tokenName, setTokenName] = useState<any>()
  const [tokenSymbol, setTokenSymbol] = useState<any>()
  const [tokenDecimal, setTokenDecimal] = useState(0)
  const [txHash, setTxHash] = useState<string>('')
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [showApprove, setShowApprove] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)

  const [formData, setFormData] = useState({
    chain_id: '32520',
    owner_address: '',
    token_address: '',
    token_name: '',
    token_symbol: '',
    token_decimal: '',
    isLPToken: false,
    title: '',
    amount: '',
    is_another: false,
    is_vesting: false,
    tge_percent: '',
    release_cycle: '',
    release_percent: '',
    release_date: new Date(),
    tge_date: new Date(),
    description: '',
  })

  // destructure
  const {
    token_address,
    token_name,
    token_decimal,
    token_symbol,
    isLPToken,
    title,
    amount,
    owner_address,
    is_another,
    is_vesting,
    tge_percent,
    release_cycle,
    release_percent,
    tge_date,
    release_date,
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
      setTokenName(TName)
      setTokenName(TSymbol)
      setTokenName(TDecimals)
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
    if (name === 'is_another' || name === 'is_vesting' || name === 'isLPToken') {
      const value = event.target.checked
      setFormData({ ...formData, [name]: value })
    } else {
      const value = event.target.value
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const createBitgertLock = async (formData) => {
    if (!chainId || !library || !account) return
    const bitgertLock = getBitgertLockContract(chainId, library, account)

    if (!is_vesting) {
      const payload_1 = [
        owner_address ? owner_address : account,
        token_address,
        isLPToken,
        amount,
        await getUnixTimestamp(dateTimeContract, release_date),
        description,
      ]

      const method: (...args: any) => Promise<TransactionResponse> = bitgertLock!.lock
      const args: Array<string | number | boolean> = payload_1

      setAttemptingTxn(true)
      await method(...args)
        .then(async (response: any) => {
          const txReceipt = await response.wait()
          const lockId = txReceipt.events[2].args.id.toNumber()
          setAttemptingTxn(false)
          addBitgertLock({ ...formData, owner_address: owner_address ? owner_address : account, lock_id: lockId })
            .then((data) => {
              setFormData({
                ...formData,
                chain_id: '32520',
                owner_address: '',
                token_address: '',
                token_name: '',
                token_symbol: '',
                token_decimal: '',
                isLPToken: false,
                title: '',
                amount: '',
                is_another: false,
                is_vesting: false,
                tge_percent: '',
                release_cycle: '',
                release_percent: '',
                release_date: new Date(),
                tge_date: new Date(),
                description: '',
              })
              if (data.error) {
                swal('Oops', 'Something went wrong!', 'error')
              }
            })
            .catch((err) => console.log('Error in signup'))
          swal('Congratulations!', 'Bitgert Lock is added!', 'success')
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
    } else {
      const payload_2 = [
        owner_address ? owner_address : account,
        token_address,
        isLPToken,
        amount,
        await getUnixTimestamp(dateTimeContract, tge_date),
        tge_percent,
        release_cycle,
        release_percent,
        description,
      ]

      const method: (...args: any) => Promise<TransactionResponse> = bitgertLock!.vestingLock
      const args: Array<string | number | boolean> = payload_2

      setAttemptingTxn(true)
      await method(...args)
        .then(async (response: any) => {
          const txReceipt = await response.wait()
          const lockId = txReceipt.events[2].args.id.toNumber()
          setAttemptingTxn(false)
          addBitgertLock({ ...formData, owner_address: owner_address ? owner_address : account, lock_id: lockId })
            .then((data) => {
              setFormData({
                ...formData,
                chain_id: '32520',
                owner_address: '',
                token_address: '',
                token_name: '',
                token_symbol: '',
                token_decimal: '',
                isLPToken: false,
                title: '',
                amount: '',
                is_another: false,
                is_vesting: false,
                tge_percent: '',
                release_cycle: '',
                release_percent: '',
                release_date: new Date(),
                tge_date: new Date(),
                description: '',
              })
              if (data.error) {
                swal('Oops', 'Something went wrong!', 'error')
              }
            })
            .catch((err) => console.log('Error in signup'))

          swal('Congratulations!', 'Bitgert Lock is added!', 'success')
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
  }

  const ApproveBitgertLock = async (formData) => {
    if (!chainId || !library || !account) return
    const tokenContract = getTokenContract(token_address, library, account)

    const payload = [LOCK_ADDRESS, amount]

    const method: (...args: any) => Promise<TransactionResponse> = tokenContract!.approve
    const args: Array<string | string[] | number> = payload

    setAttemptingTxn(true)
    await method(...args)
      .then((response) => {
        setAttemptingTxn(false)
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (false) {
      swal('Are you sure?', 'There are incomplete fields in your submission!', 'warning')
      return
    }

    createBitgertLock(formData)
  }

  const handleAllowance = () => {
    if (!account || !token_address) return
    ApproveBitgertLock(formData)
  }

  return (
    <>
      <Container>
        <AppBodyExtended>
          <CardHeader>Lock Your Token</CardHeader>
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

          <div className=" text-white mb-5  ">
            <CardBody>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <Input
                    placeholder="Token or LP Token address"
                    className="mt-3"
                    scale="lg"
                    value={token_address}
                    onChange={handleChange('token_address')}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <Checkbox
                    checked={isLPToken}
                    onChange={handleChange('isLPToken')}
                    color="warning"
                    bigger
                    shape="curve"
                    animation="jelly"
                    icon={<i className="fas fa-check" />}
                  >
                    LP token ?
                  </Checkbox>
                </div>

                <div className="col-md-12 mb-3">
                  <Checkbox
                    checked={is_another}
                    onChange={handleChange('is_another')}
                    color="warning"
                    bigger
                    shape="curve"
                    animation="jelly"
                    icon={<i className="fas fa-check" />}
                  >
                    use another owner?
                  </Checkbox>
                </div>

                {is_another && (
                  <div className="col-md-12 mb-3">
                    <Input
                      placeholder="Owner Address"
                      className="mt-3"
                      scale="lg"
                      value={owner_address}
                      onChange={handleChange('owner_address')}
                    />
                  </div>
                )}

                <div className="col-md-12 mb-3">
                  <Input
                    placeholder="Lock Title"
                    className="mt-3"
                    scale="lg"
                    value={title}
                    onChange={handleChange('title')}
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
                  <Checkbox
                    checked={is_vesting}
                    onChange={handleChange('is_vesting')}
                    color="warning"
                    bigger
                    shape="curve"
                    animation="jelly"
                    icon={<i className="fas fa-check" />}
                  >
                    use vesting?
                  </Checkbox>
                </div>

                {!is_vesting && (
                  <div className="col-md-12 mb-3">
                    <label htmlFor="inputTokenAddress" className="form-label mb-2 mx-1">
                      Lock until (UTC time)
                    </label>{' '}
                    <br />
                    <DateTimePicker
                      size="small"
                      color="primary"
                      fullWidth
                      inputVariant="outlined"
                      value={release_date}
                      onChange={(date) => {
                        handleDateChange('release_date', date)
                      }}
                      TextFieldComponent={(params) => {
                        return <CssTextField {...params} />
                      }}
                    />
                  </div>
                )}

                {is_vesting && (
                  <>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="inputTokenAddress" className="form-label mb-2 mx-1">
                        TGE Date (UTC time)
                      </label>{' '}
                      <br />
                      <DateTimePicker
                        size="small"
                        color="primary"
                        fullWidth
                        inputVariant="outlined"
                        value={tge_date}
                        onChange={(date) => {
                          handleDateChange('tge_date', date)
                        }}
                        TextFieldComponent={(params) => {
                          return <CssTextField {...params} />
                        }}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <Input
                        placeholder="TGE Percent"
                        className="mt-3"
                        scale="lg"
                        value={tge_percent}
                        onChange={handleChange('tge_percent')}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <Input
                        placeholder="Cycle (minutes)"
                        className="mt-3"
                        scale="lg"
                        value={release_cycle}
                        onChange={handleChange('release_cycle')}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <Input
                        placeholder="Cycle Release Percent"
                        className="mt-3"
                        scale="lg"
                        value={release_percent}
                        onChange={handleChange('release_percent')}
                      />
                    </div>
                  </>
                )}

                <div className="col-md-12 mb-3">
                  <Input
                    placeholder="Amount"
                    className="mt-3"
                    scale="lg"
                    value={amount}
                    onChange={handleChange('amount')}
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

            <div className="d-flex justify-content-center gap-3 mt-3">
              <Button className="mx-3" onClick={handleAllowance}>
                Approve
              </Button>
              <Button className="mx-3" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </AppBodyExtended>
      </Container>
      <div className="mt-5"> </div>
    </>
  )
}
