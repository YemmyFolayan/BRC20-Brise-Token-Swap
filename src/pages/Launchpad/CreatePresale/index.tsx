/* eslint-disable */
import React, { useState } from 'react'
import swal from 'sweetalert'
import Stepper from 'react-stepper-horizontal'
import { BigNumber } from '@ethersproject/bignumber'
import { Button } from '@evofinance9/uikit'
import { TransactionResponse } from '@ethersproject/providers'
import moment from 'moment'
import Container from 'components/Container'

import AdditionalInfo from './AdditionalInfo'
import TokenInfo from './TokenInfo'
import PresaleRate from './PresaleRate'
import SwapInfo from './SwapInfo'
import Timing from './Timing'

import addPresale from './apicalls'

import { ROUTER_ADDRESS } from 'constants/index'
import { useActiveWeb3React } from 'hooks'
import { usePresaleContract } from 'hooks/useContract'
import { bnDivideByDecimal, getPresaleContract, calculateGasMargin } from 'utils'

import './style.css'
import { AppBodyExtended } from 'pages/AppBody'

export default function CreatePresale() {
  const { account, chainId, library } = useActiveWeb3React()
  const presaleContract = usePresaleContract(true)

  const [currentSaleId, setCurrentSaleId] = useState(0)
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
    token_address: '0x9892fFB5Ec3Eaa1EE980B8c14976A71c8455374b',
    token_name: 'BSC Token',
    token_symbol: 'BSC',
    token_decimal: '18',
    tier1: '100',
    tier2: '200',
    tier3: '300',
    soft_cap: '1000',
    hard_cap: '2000',
    min_buy: '10',
    max_buy: '100',
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

  const handleDateChange = (name, value) => {
    console.log(value)
    setFormData({ ...formData, [name]: value })
  }
  const onClickNext = () => setState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }))
  const onClickPrev = () =>
    setState((prev) => ({ ...prev, currentStep: prev.currentStep !== 0 ? prev.currentStep - 1 : prev.currentStep }))

  const createPresale = async (formData) => {
    if (!chainId || !library || !account) return
    const presale = getPresaleContract(chainId, library, account)

    const {
      token_address,
      soft_cap,
      hard_cap,
      tier1,
      tier2,
      tier3,
      min_buy,
      max_buy,
      router_rate,
      start_time,
      end_time,
      tier1_time,
      tier2_time,
      lock_time,
    } = formData
    console.log(account)

    // get sale Id
    const currentPresaleId = await presaleContract?.callStatic.currentPresaleId()
    console.log(currentPresaleId.toNumber())
    const currentFee = await presaleContract?.callStatic.currentFee()
    console.log(bnDivideByDecimal(currentFee).toNumber())

    const payload = {
      saleId: currentPresaleId,
      token: token_address,
      minContributeRate: min_buy,
      maxContributeRate: max_buy,
      startTime: moment(start_time).format('X'),
      tier1Time: moment(tier1_time).format('X'),
      tier2Time: moment(tier2_time).format('X'),
      endTime: moment(end_time).format('X'),
      liquidityLockTime: moment(lock_time).format('X'),
      routerId: ROUTER_ADDRESS,
      tier1Rate: tier1,
      tier2Rate: tier2,
      publicRate: tier3,
      liquidityRate: router_rate,
      softCap: soft_cap,
      hardCap: hard_cap,
      defaultRouterRate: router_rate,
      routerRate: router_rate,
      isGold: false,
      isVesting: false,
      ifCollectOtherToken: false,
      otherToken: '',
    }

    const estimate = presaleContract!.estimateGas.createPresale
    const method: (...args: any) => Promise<TransactionResponse> = presaleContract!.createPresale
    const args: Array<object | string[] | number> = [payload]
    const value: BigNumber | null = currentFee

    await estimate(...args)
      .then((estimatedGasLimit) =>
        method(...args, {
          ...(value ? { value } : {}),
          gasLimit: calculateGasMargin(estimatedGasLimit),
        }).then((response) => {
          console.log(response)
        })
      )
      .catch((e) => {
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
      !certik_audit ||
      !doxxed_team ||
      !utility ||
      !kyc ||
      !start_time ||
      !end_time ||
      !tier1_time ||
      !tier2_time ||
      !lock_time
    ) {
      swal('Are you sure?', 'There are incomplete fields in your submission!', 'warning')
      return
    }

    createPresale(formData)

    addPresale(formData)
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
  }

  return (
    <>
      <Container>
        <AppBodyExtended>
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
              {currentStep === 0 && <TokenInfo data={formData} handleChange={handleChange} />}
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
        </AppBodyExtended>
      </Container>
      <div className="mt-5"> </div>
    </>
  )
}
