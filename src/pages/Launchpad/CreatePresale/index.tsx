/* eslint-disable */
import React, { useState } from 'react'
import moment from 'moment'
import swal from 'sweetalert'
import Stepper from 'react-stepper-horizontal'
import { ethers } from 'ethers'

import { BigNumber } from '@ethersproject/bignumber'
import { Button, CardHeader, CardBody } from '@evofinance9/uikit'
import { TransactionResponse } from '@ethersproject/providers'
import Container from 'components/Container'

import AdditionalInfo from './AdditionalInfo'
import TokenInfo from './TokenInfo'
import PresaleRate from './PresaleRate'
import SwapInfo from './SwapInfo'
import Timing from './Timing'

import addPresale from './apicalls'

import { ROUTER_ADDRESS } from 'constants/index'
import Tooltip from 'components/Tooltip'
import { useActiveWeb3React } from 'hooks'
import { usePresaleContract, useDateTimeContract } from 'hooks/useContract'
import { getPresaleContract } from 'utils'
import getUnixTimestamp from 'utils/getUnixTimestamp'

import './style.css'
import { AppBodyExtended } from 'pages/AppBody'
import TransactionConfirmationModal from 'components/TransactionConfirmationModal'
import { FaInfoCircle } from 'react-icons/fa'

export default function CreatePresale() {
  const { account, chainId, library } = useActiveWeb3React()
  const presaleContract = usePresaleContract(true)
  const dateTimeContract = useDateTimeContract()

  const [currentSaleId, setCurrentSaleId] = useState(0)
  const [txHash, setTxHash] = useState<string>('')
  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm
  const [feeTooltip, setFeeTooltip] = useState<boolean>(false)

  const [state, setState] = useState({
    steps: [
      {
        title: 'Token Address',
        onClick: (e) => {
          e.preventDefault()
          setState((prev) => ({ ...prev, currentStep: 0 }))
        },
      },
      {
        title: 'Launchpad Info',
        onClick: (e) => {
          e.preventDefault()
          setState((prev) => ({ ...prev, currentStep: 1 }))
        },
      },
      {
        title: 'BitgertSwap Info',
        onClick: (e) => {
          e.preventDefault()
          setState((prev) => ({ ...prev, currentStep: 2 }))
        },
      },
      {
        title: 'Additional Information',
        onClick: (e) => {
          e.preventDefault()
          setState((prev) => ({ ...prev, currentStep: 3 }))
        },
      },
      {
        title: 'Timing',
        onClick: (e) => {
          e.preventDefault()
          setState((prev) => ({ ...prev, currentStep: 4 }))
        },
      },
    ],
    currentStep: 0,
  })

  const [formData, setFormData] = useState({
    chain_id: '32520',
    owner_address: '',
    token_address: '',
    token_name: '',
    token_symbol: '',
    token_decimal: '',
    tier1: '',
    tier2: '',
    tier3: '',
    soft_cap: '',
    hard_cap: '',
    min_buy: '',
    max_buy: '',
    router_rate: '',
    default_router_rate: '',
    listing_rate: '',
    logo_link: '',
    website_link: '',
    github_link: '',
    twitter_link: '',
    reddit_link: '',
    telegram_link: '',
    project_dec: '',
    update_dec: '',
    token_level: '',
    start_time: new Date(),
    end_time: new Date(),
    tier1_time: new Date(),
    tier2_time: new Date(),
    lock_time: new Date(),
    liquidity: '',
    contribution: '',
    liquidity_lock: false,
    certik_audit: false,
    doxxed_team: false,
    utility: false,
    kyc: false,
    other_token: '',
    other_symbol: '',
    is_other: false,
    is_brise: false,
  })

  const { steps, currentStep } = state

  const handleChange = (name) => (event) => {
    if (name === 'certik_audit' || name === 'doxxed_team' || name === 'utility' || name === 'kyc') {
      const value = event.target.checked
      setFormData({ ...formData, [name]: value })
    } else {
      const value = event.target.value
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleChangeWithoutEvent = (obj: { token_name: string; token_symbol: string; token_decimal: string }) => {
    console.log(obj)
    setFormData({ ...formData, ...obj })
  }

  const handleDismissConfirmation = () => {
    setShowConfirm(false)
    setTxHash('')
  }

  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }
  const onClickNext = () => setState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }))
  const onClickPrev = () =>
    setState((prev) => ({ ...prev, currentStep: prev.currentStep !== 0 ? prev.currentStep - 1 : prev.currentStep }))

  const createPresale = async (formData) => {
    if (!chainId || !library || !account) return
    const presale = getPresaleContract(chainId, library, account)

    const {
      owner_address,
      token_address,
      token_decimal,
      soft_cap,
      hard_cap,
      tier1,
      tier2,
      tier3,
      listing_rate,
      min_buy,
      max_buy,
      router_rate,
      start_time,
      end_time,
      tier1_time,
      tier2_time,
      lock_time,
    } = formData

    // get sale Id
    const currentPresaleId = await presaleContract?.callStatic.currentPresaleId()
    const currentFee = await presaleContract?.callStatic.currentFee()

    const payload = [
      currentPresaleId.toNumber(),
      token_address,
      ethers.utils.parseUnits(min_buy, parseInt(token_decimal)).toString(),
      ethers.utils.parseUnits(max_buy, parseInt(token_decimal)).toString(),
      moment(start_time).format('X'),
      moment(tier1_time).format('X'),
      moment(tier2_time).format('X'),
      moment(end_time).format('X'),
      moment(lock_time).format('X'),
      ROUTER_ADDRESS,
      ethers.utils.parseUnits(tier1, parseInt(token_decimal)).toString(),
      ethers.utils.parseUnits(tier2, parseInt(token_decimal)).toString(),
      ethers.utils.parseUnits(tier3, parseInt(token_decimal)).toString(),
      ethers.utils.parseUnits(listing_rate, parseInt(token_decimal)).toString(),
      ethers.utils.parseUnits(soft_cap, parseInt(token_decimal)).toString(),
      ethers.utils.parseUnits(hard_cap, parseInt(token_decimal)).toString(),
      router_rate,
      0,
      false,
      false,
      '0',
      '0',
      '0',
      false,
      '0x0000000000000000000000000000000000000000',
    ]

    const method: (...args: any) => Promise<TransactionResponse> = presale!.createPresale
    const args: Array<object | string[] | number> = [payload]
    const value: BigNumber = ethers.utils.parseEther(`${ethers.utils.formatEther(currentFee.toString())}`)

    setAttemptingTxn(true)
    await method(...args, {
      value: value,
    })
      .then((response) => {
        setAttemptingTxn(false)
        setTxHash(response.hash)

        addPresale({ ...formData, owner_address: account, sale_id: currentPresaleId.toNumber() })
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
                tier1: '',
                tier2: '',
                tier3: '',
                soft_cap: '',
                hard_cap: '',
                min_buy: '',
                max_buy: '',
                router_rate: '',
                default_router_rate: '',
                listing_rate: '',
                logo_link: '',
                website_link: '',
                github_link: '',
                twitter_link: '',
                reddit_link: '',
                telegram_link: '',
                project_dec: '',
                update_dec: '',
                token_level: '',
                start_time: new Date(),
                end_time: new Date(),
                tier1_time: new Date(),
                tier2_time: new Date(),
                lock_time: new Date(),
                liquidity: '',
                contribution: '',
                liquidity_lock: false,
                certik_audit: false,
                doxxed_team: false,
                utility: false,
                kyc: false,
                other_token: '',
                other_symbol: '',
                is_other: false,
                is_brise: false,
              })
              swal('Congratulations!', 'Presale is added!', 'success')
            }
          })
          .catch((err) => console.log('Error in signup'))
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

  const handleSubmit = () => {
    // validation
    const {
      token_address,
      token_name,
      token_symbol,
      token_decimal,
      soft_cap,
      hard_cap,
      tier1,
      tier2,
      tier3,
      min_buy,
      max_buy,
      router_rate,
      listing_rate,
      logo_link,
      website_link,
      github_link,
      twitter_link,
      reddit_link,
      telegram_link,
      project_dec,
      certik_audit,
      doxxed_team,
      utility,
      kyc,
      start_time,
      end_time,
      tier1_time,
      tier2_time,
      lock_time,
    } = formData
    if (
      !token_address ||
      !token_name ||
      !token_symbol ||
      !token_decimal ||
      !soft_cap ||
      !hard_cap ||
      !tier1 ||
      !tier2 ||
      !tier3 ||
      !min_buy ||
      !max_buy ||
      !router_rate ||
      !listing_rate ||
      !logo_link ||
      !website_link ||
      !github_link ||
      !twitter_link ||
      !reddit_link ||
      !telegram_link ||
      !project_dec ||
      !start_time ||
      !end_time ||
      !tier1_time ||
      !tier2_time ||
      !lock_time
    ) {
      swal('Are you sure?', 'There are incomplete fields in your submission!', 'warning')
      return
    }

    if (parseInt(router_rate) < 70) {
      swal('Oops', 'Liquidity rate must be greater that 70!', 'warning')
      return
    }

    createPresale(formData)
  }

  return (
    <>
      <Container>
        <AppBodyExtended>
          <CardHeader className="d-flex justify-content-between">
            <span>Create Presale</span>

            <Tooltip show={feeTooltip} placement="right" text="Fee: 20000000 BRISE">
              <FaInfoCircle onMouseEnter={() => setFeeTooltip(true)} onMouseLeave={() => setFeeTooltip(false)} />
            </Tooltip>
          </CardHeader>
          <CardBody>
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
            <Stepper
              steps={steps}
              activeStep={currentStep}
              completeTitleColor="#fff"
              activeTitleColor="#fff"
              completeColor="#F9D849"
              activeColor="#F9D849"
              completeBarColor="#F9D849"
            />

            <div className=" text-white mb-5  ">
              <form>
                {currentStep === 0 && (
                  <TokenInfo
                    data={formData}
                    handleChange={handleChange}
                    handleChangeWithoutEvent={handleChangeWithoutEvent}
                  />
                )}
                {currentStep === 1 && <PresaleRate data={formData} handleChange={handleChange} />}
                {currentStep === 2 && <SwapInfo data={formData} handleChange={handleChange} />}
                {currentStep === 3 && <AdditionalInfo data={formData} handleChange={handleChange} />}
                {currentStep === 4 && <Timing data={formData} handleChange={handleDateChange} />}
              </form>

              <div className="d-flex justify-content-center gap-3 mt-3">
                <Button variant="subtle" className="mx-2" onClick={onClickPrev}>
                  Prev
                </Button>

                {currentStep === 4 ? (
                  <Button onClick={handleSubmit}>Submit</Button>
                ) : (
                  <Button onClick={onClickNext}>Next</Button>
                )}
              </div>
            </div>
          </CardBody>
        </AppBodyExtended>
      </Container>
      <div className="mt-5"> </div>
    </>
  )
}
