/* eslint-disable */
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { Card, Badge, Button as BSButton, ProgressBar } from 'react-bootstrap'

import swal from 'sweetalert'
import { Button, CardBody, Input } from '@evofinance9/uikit'
import { DateTimePicker } from '@material-ui/pickers'
import { TextField, withStyles } from '@material-ui/core'
import { Checkbox, useCheckboxState } from 'pretty-checkbox-react'
import '@djthoms/pretty-checkbox'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { TelegramIcon, TwitterIcon, WWWIcon } from '../../../assets/images'

import { ethers } from 'ethers'

import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import Container from 'components/Container'

import { useActiveWeb3React } from 'hooks'
import { usePresaleContract, useDateTimeContract, useTokenContract } from 'hooks/useContract'
import { getPresaleContract, getTokenContract } from 'utils'
import getUnixTimestamp from 'utils/getUnixTimestamp'
import CountDownTimer from '../CountDownTimer'

import './style.css'
import { AppBodyExtended } from 'pages/AppBody'
import TransactionConfirmationModal from 'components/TransactionConfirmationModal'
import { RouteComponentProps } from 'react-router-dom'
import { getPresaleById } from './apicalls'

interface FormComponentProps {
  match: {
    params: { saleId }
  }
}

const currentTimeInitialState = async () => {}

export default function PoolDetails({
  match: {
    params: { saleId },
  },
}: FormComponentProps) {
  const { account, chainId, library } = useActiveWeb3React()
  const presaleContract = usePresaleContract(true)
  const dateTimeContract = useDateTimeContract()
  const tokenContract = useTokenContract('0x0eb9036cbE0f052386f36170c6b07eF0a0E3f710', true)

  const [presale, setPresale] = useState<any>({})
  const [end_time, setEnd_time] = useState(0)
  const [current_time, setCurrent_time] = useState(0)
  const [balance, setBalance] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  const [finalTime, setFinalTime] = useState<any>()
  const [currentTime, setCurrentTime] = useState<any>()
  const [minContributeRate, setMinContributeRate] = useState<any>()
  const [maxContributeRate, setMaxContributeRate] = useState<any>()
  const [userContributionBNB, setUserContributionBNB] = useState<any>()
  const [userContributionToken, setUserContributionToken] = useState<any>()
  const [presaleStatus, setPresaleStatus] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>('')
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)

  const [formData, setFormData] = useState({
    chain_id: '32520',
    owner_address: '',
    token_address: '',
    amount: '',
  })

  // destructure
  const { amount } = formData

  // fetch presale info
  useEffect(() => {
    const fetch = async () => {
      getPresaleById(saleId)
        .then(async (response) => {
          setPresale(response)
          const endtime = await getUnixTimestamp(dateTimeContract, response.end_time)
          const currTime = await getUnixTimestamp(dateTimeContract, moment())
          setCurrentTime(moment().format('X'))
          setFinalTime(moment(response.end_time).format('X'))
          setEnd_time(endtime)
          setCurrent_time(currTime)
          // get presale details
          if (!chainId || !library || !account) return
          const presale = getPresaleContract(chainId, library, account)
          const minRate = await presale?.callStatic.minContributeRate(BigInt(saleId).toString())
          setMinContributeRate(minRate.toString())
          const maxRate = await presale?.callStatic.maxContributeRate(BigInt(saleId).toString())
          setMaxContributeRate(maxRate.toString())
          const userBNB = await presale?.callStatic.userContributionBNB(BigInt(saleId).toString(), account)
          setUserContributionBNB(userBNB.toString())
          const userToken = await presale?.callStatic.userContributionToken(BigInt(saleId).toString(), account)
          setUserContributionToken(userToken.toString())
          const statusOfPresale = await presale?.callStatic.presaleStatus(BigInt(saleId).toString())
          setPresaleStatus(statusOfPresale)
          // get token details 
          const CurrentToken = getTokenContract(response.token_address, library, account)
          const TSupply = await CurrentToken?.callStatic.totalSupply()
          setTotalSupply(TSupply.toString())
        })
        .catch((err) => {
          console.log(err)
          swal('Oops', 'Something went wrong!', 'error')
        })
    }
    fetch()
  }, [saleId])

  const handleChange = (name) => (end) => {
    const value = end.target.value
    setFormData({ ...formData, [name]: value })
  }

  const fetchBalanceFromAccount = async () => {
    if (!chainId || !library || !account) return
    const tokenBrise = getTokenContract('0x0eb9036cbE0f052386f36170c6b07eF0a0E3f710', library, account)
    const bal = await tokenBrise?.callStatic.balanceOf(account)
    setBalance(bal.toString())
    setFormData({ ...formData, amount: bal.toString() })
  }

  const contributePresale = async (formData) => {
    if (!chainId || !library || !account) return
    const presale = getPresaleContract(chainId, library, account)

    const payload = [saleId, amount]

    const method: (...args: any) => Promise<TransactionResponse> = presale!.contribute
    const args: string[] = payload
    const value: BigNumber = ethers.utils.parseEther(`${ethers.utils.formatEther(amount.toString())}`)

    setAttemptingTxn(true)
    await method(...args, {
      value: value,
    })
      .then((response) => {
        setAttemptingTxn(false)
        setFormData({
          ...formData,
          amount: '',
        })
        swal('Congratulations!', 'You have contributed the in the presale!', 'success')
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

  const handleContribute = () => {
    if (!amount || !saleId) {
      swal('Are you sure?', 'There are incomplete fields in your submission!', 'warning')
      return
    }

    contributePresale(formData)
  }

  const WithdrawPresale = async (formData) => {
    if (!chainId || !library || !account) return
    const presale = getPresaleContract(chainId, library, account)

    const payload = [saleId]

    const method: (...args: any) => Promise<TransactionResponse> = presale!.emergencyWithdraw
    const args: string[] = payload

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

  const handleWithdraw = () => {
    if (!saleId) {
      swal('Are you sure?', 'There are incomplete fields in your submission!', 'warning')
      return
    }

    WithdrawPresale(formData)
  }

  const FinalizePresale = async (formData) => {
    if (!chainId || !library || !account) return
    const presale = getPresaleContract(chainId, library, account)

    const payload = [saleId]

    const method: (...args: any) => Promise<TransactionResponse> = presale!.finalize
    const args: string[] = payload

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

  const handleFinalize = () => {
    if (!saleId) {
      swal('Are you sure?', 'There are incomplete fields in your submission!', 'warning')
      return
    }

    FinalizePresale(formData)
  }

  const ClaimPresale = async (formData) => {
    if (!chainId || !library || !account) return
    const presale = getPresaleContract(chainId, library, account)

    const payload = [saleId]

    const method: (...args: any) => Promise<TransactionResponse> = presale!.claimToken
    const args: string[] = payload

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

  const handleClaim = () => {
    if (!saleId) {
      swal('Are you sure?', 'There are incomplete fields in your submission!', 'warning')
      return
    }

    ClaimPresale(formData)
  }

  return (
    <div className=" d-flex justify-content-between my-3 ">
      <Card style={{ width: '35rem', margin: '0 auto' }} className="presale__card" text="light">
        <Card.Body>
          <div className="d-flex justify-content-center">
            <div className="presale__logo">
              <img src={presale.logo_link} alt="Presale Logo" className="rounded" />
            </div>
          </div>
          <div className="d-flex justify-content-center my-3">
            <h1 className="col-xs-3">{presale.token_name}</h1>
          </div>
          <div className="d-flex justify-content-center text-justify my-3">
            <h2 className="col-sx-3 font-italic">{presale.project_dec}</h2>
          </div>
          {/* check */}
          <div className="d-flex justify-content-center text-justify mb-3">
            <h5 className="col-sx-3 font-weight-light">Presale Address : {presale.token_address}</h5>
          </div>

          <div className="d-flex justify-content-between">
            <div>
              <h5 className="col-sx-2 font-weight-light py-2 ">Sale ID :</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">Token Address :</h5>
              <h5 className="col-sx-3 font-weight-light pb-2">Total Supply :</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">Tokens For Presale:</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">Tokens For Liquidity:</h5>
              <h5 className="col-sx-2 font-weight-light pb-2 ">Soft Cap:</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">Hard Cap:</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">Presale Rate(tier1):</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">Presale Rate(tier2):</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">Presale Rate:</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">Listing Rate:</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">BriseSwap Liquidity:</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">Min Contribution:</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">Max Contribution:</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">Presale Start Time:</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">Tier1 End Time:</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">Tier2 End Time:</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">Presale End Time:</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">Liquidity Unlock:</h5>
            </div>
            <div>
              <h5 className="col-sx-2 font-weight-light py-2 ">{saleId}</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">{presale.token_address}</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">
                {totalSupply !== null ? totalSupply : 0} {presale.token_symbol}
              </h5>
              <h5 className="col-sx-2 font-weight-light pb-2">
                {presale.tokens_presale !== null ? presale.tokens_presale : 0} {presale.token_symbol}
              </h5>
              <h5 className="col-sx-2 font-weight-light pb-2">
                {presale.tokens_liquidity !== null ? presale.tokens_liquidity : 0} {presale.token_symbol}
              </h5>
              <h5 className="col-sx-2 font-weight-light pb-2 ">{presale.soft_cap} BRISE</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">{presale.hard_cap} BRISE</h5>
              <h5 className="col-sx-2 font-weight-light pb-2">
                {presale.tier1 !== null ? presale.tier1 : 0} {presale.token_symbol} per BRISE
              </h5>
              <h5 className="col-sx-2 font-weight-light pb-2">
                {presale.tier2 !== null ? presale.tier2 : 0} {presale.token_symbol} per BRISE
              </h5>
              <h5 className="col-sx-2 font-weight-light pb-2">
                {presale.tier3 !== null ? presale.tier3 : 0} {presale.token_symbol} per BRISE
              </h5>
              <h5 className="col-sx-2 font-weight-light pb-2 ">
                {presale.listing_rate !== null ? presale.listing_rate : 0} {presale.token_symbol} per BRISE
              </h5>
              <h5 className="col-sx-2 font-weight-light pb-2">
                {presale.liquidity !== null ? presale.liquidity : 0} %
              </h5>
              <h5 className="col-sx-2 font-weight-light pb-2">
                {minContributeRate !== null ? minContributeRate : 0} BRISE
              </h5>
              <h5 className="col-sx-2 font-weight-light pb-2">
                {maxContributeRate !== null ? maxContributeRate : 0} BRISE
              </h5>
              <h5 className="col-sx-2 font-weight-light pb-2 ">
                {moment(presale.start_time).format('dddd, MMMM Do YYYY, h:mm:ss a')}
              </h5>
              <h5 className="col-sx-2 font-weight-light pb-2">
                {moment(presale.tier1_time).format('dddd, MMMM Do YYYY, h:mm:ss a')}
              </h5>
              <h5 className="col-sx-2 font-weight-light pb-2">
                {moment(presale.tier2_time).format('dddd, MMMM Do YYYY, h:mm:ss a')}
              </h5>
              <h5 className="col-sx-2 font-weight-light pb-2">
                {moment(presale.end_time).format('dddd, MMMM Do YYYY, h:mm:ss a')}
              </h5>
              <h5 className="col-sx-2 font-weight-light pb-2">
                {moment(presale.lock_time).format('dddd, MMMM Do YYYY, h:mm:ss a')}
              </h5>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Card style={{ width: '25rem', margin: '0 auto' }} className="presale__card row-cols-0" text="light">
        <Card.Body>
          <div className="d-flex justify-content-between my-4">
            {end_time > current_time && (
              <div className="">
                <div className=" d-flex justify-content-center ml-5 mt-4 mb-2">
                  <h1>Presale Timer:</h1>
                </div>
                <div className=" d-flex justify-content-center ml-5 mt-2 mb-4">
                  <h1>
                    <CountDownTimer endtime={finalTime} currTime={currentTime} />
                  </h1>
                </div>
                <div className=" d-flex justify-content-between ml-5 my-4">
                  <Link to={presale.telegram_link}>
                    <div className="links__logo">
                      <img src={TelegramIcon} alt="Telegram Logo" className="rounded " />
                    </div>
                  </Link>
                  <Link to={presale.twitter_link}>
                    <div className="links__logo">
                      <img src={TwitterIcon} alt="Twitter Logo" className="rounded " />
                    </div>
                  </Link>
                  <Link to={presale.website_link}>
                    <div className="links__logo">
                      <img src={WWWIcon} alt="WWW Logo" className="rounded " />
                    </div>
                  </Link>
                </div>
                <div className=" d-flex justify-content-center ml-5 my-3">
                  <Input
                    placeholder="Amount"
                    className=" d-flex justify-content-center mt-3 text-align-center"
                    scale="lg"
                    value={amount}
                    onChange={handleChange('amount')}
                  />
                  <button onClick={fetchBalanceFromAccount}> Max </button>
                </div>
                <div className=" d-flex justify-content-center ml-5 mb-4">
                  <Button scale="md" variant="secondary" onClick={handleContribute}>
                    Contribute
                  </Button>
                </div>
                <div className="d-flex justify-content-between ml-5 my-4">
                  <div>
                    <h1 className=" my-3">1 BRISE :</h1>
                    <h1 className=" my-3">Your Contributed Account:</h1>
                    <h1 className=" my-3">Your Reserved Tokens:</h1>
                  </div>
                  <div>
                    <h1 className=" my-3">
                      {presale.listing_rate} {presale.token_symbol}
                    </h1>
                    <h1 className=" my-3">{userContributionBNB !== null ? userContributionBNB : 0} BRISE</h1>
                    <h1 className=" my-3">
                      {userContributionToken !== null ? userContributionToken : 0} {presale.token_symbol}
                    </h1>
                  </div>
                </div>
                <div>
                  <div className=" d-flex justify-content-center ml-5 my-4">
                    <Button scale="md" variant="secondary" onClick={handleWithdraw}>
                      Withdraw
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {end_time <= current_time && (
              <div className="">
                <div className=" d-flex justify-content-center mt-4 mb-2">
                  <h1>Presale Timer:</h1>
                </div>
                <div className=" d-flex justify-content-center mb-4">
                  <h1>00 Days 00 Hours 00 Minutes 00 Seconds</h1>
                </div>
                <div className=" mb-3">
                  <h1>This presale has ended. Go back to the dashboard to view others!</h1>
                  <div className=" d-flex justify-content-center my-4">
                    <Link to={`/swap`}>
                      <Button scale="md" variant="secondary">
                        Bitgert Swap
                      </Button>
                    </Link>
                  </div>
                  <div className=" d-flex justify-content-center ml-5 my-3">
                    <Input
                      placeholder="Amount"
                      className=" d-flex justify-content-center mt-3 text-align-center"
                      scale="lg"
                      value={amount}
                      onChange={handleChange('amount')}
                    />
                    <button onClick={fetchBalanceFromAccount}> Max </button>
                  </div>
                  <h1>If you participated in the presale click the claim button below to claim your tokens!</h1>
                  {!presaleStatus && (
                    <div className=" d-flex justify-content-center my-4">
                      <Button scale="md" variant="secondary" disabled>
                        Claim
                      </Button>
                    </div>
                  )}
                  {presaleStatus && (
                    <div className=" d-flex justify-content-center my-4">
                      <Button scale="md" variant="secondary" onClick={handleClaim}>
                        Claim
                      </Button>
                    </div>
                  )}
                  {presale.owner_address === account && (
                    <div className=" d-flex justify-content-center my-4">
                      <h1>Finalize the presale for others to claim there tokens!</h1>
                      <Button scale="md" variant="secondary" onClick={handleFinalize}>
                        Finalize
                      </Button>
                    </div>
                  )}
                </div>
                <div className=" d-flex justify-content-between mb-4">
                  <div>
                    <h1 className=" my-3">Your Contributed Account:</h1>
                    <h1 className=" my-3">Your Reserved Tokens:</h1>
                  </div>
                  <div>
                    <h1 className=" my-3">{userContributionBNB !== null ? userContributionBNB : 0} BRISE</h1>
                    <h1 className=" my-3">
                      {userContributionToken !== null ? userContributionToken : 0} {presale.token_symbol}
                    </h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}
