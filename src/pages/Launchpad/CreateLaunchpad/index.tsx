/* eslint-disable */
import React, { useState } from 'react'
import swal from 'sweetalert'
import Stepper from 'react-stepper-horizontal'

import AdditionalInfo from './AdditionalInfo'
import TokenInfo from './TokenInfo'
import PresaleRate from './PresaleRate'
import SwapInfo from './SwapInfo'
import Timing from './Timing'

import addPresale from './apicalls'

import './style.css'

export default function CreateLaunchpad() {
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

  const handleDateChange = (name, value) => {
    console.log(value)
    setFormData({ ...formData, [name]: value })
  }
  const onClickNext = () => setState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }))
  const onClickPrev = () =>
    setState((prev) => ({ ...prev, currentStep: prev.currentStep !== 0 ? prev.currentStep - 1 : prev.currentStep }))

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
      <Stepper
        steps={steps}
        activeStep={currentStep}
        completeTitleColor="#fff"
        activeTitleColor="#fff"
        completeColor="#F9D849"
        activeColor="#F9D849"
        completeBarColor="#F9D849"
      />

      <div className="container text-white mb-5 form__container extend__form__container__width">
        <form>
          {currentStep === 0 && <TokenInfo data={formData} handleChange={handleChange} />}
          {currentStep === 1 && <PresaleRate data={formData} handleChange={handleChange} />}
          {currentStep === 2 && <SwapInfo data={formData} handleChange={handleChange} />}
          {currentStep === 3 && <AdditionalInfo data={formData} handleChange={handleChange} />}
          {currentStep === 4 && <Timing data={formData} handleChange={handleDateChange} />}
        </form>

        <div className="d-flex justify-content-center gap-3">
          <button type="button" onClick={onClickPrev} className="btn btn-outline-secondary extended__btn m-1">
            Back
          </button>
          {currentStep === 4 ? (
            <button type="button" onClick={handleSubmit} className="btn btn-outline-warning extended__btn m-1">
              Submit
            </button>
          ) : (
            <button type="button" onClick={onClickNext} className="btn btn-outline-warning extended__btn m-1">
              Next
            </button>
          )}
        </div>
      </div>

      <div className="mt-5"> </div>
    </>
  )
}