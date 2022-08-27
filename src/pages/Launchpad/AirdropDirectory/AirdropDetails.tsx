/* eslint-disable */
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { Card, Badge, Button as BSButton, ProgressBar, Table } from 'react-bootstrap'

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
import Form from 'react-bootstrap/Form'

import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import Container from 'components/Container'

import { useActiveWeb3React } from 'hooks'
import { useAirdropContract, useDateTimeContract, useTokenContract } from 'hooks/useContract'
import { getAirdropContract, getTokenContract } from 'utils'
import getUnixTimestamp from 'utils/getUnixTimestamp'
import CountDownTimer from '../CountDownTimer'
import { AIRDROP_ADDRESS } from 'constants/abis/airdrop'

import './style.css'
import { AppBodyExtended } from 'pages/AppBody'
import TransactionConfirmationModal from 'components/TransactionConfirmationModal'
import { RouteComponentProps } from 'react-router-dom'
import { getAirdropById } from './apicalls'
import { setFlagsFromString } from 'v8'

interface FormComponentProps {
  match: {
    params: { airdropId }
  }
}

const currentTimeInitialState = async () => {}

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

export default function AirdropDetails({
  match: {
    params: { airdropId },
  },
}: FormComponentProps) {
  const { account, chainId, library } = useActiveWeb3React()
  const airdropContract = useAirdropContract(true)
  const dateTimeContract = useDateTimeContract()
  const tokenContract = useTokenContract('0x0eb9036cbE0f052386f36170c6b07eF0a0E3f710', true)

  const [airdrop, setAirdrop] = useState<any>({})
  const [totalAmount, setTotalAmount] = useState(0)
  const [balance, setBalance] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  const [finalTime, setFinalTime] = useState<any>()
  const [startDate, setStartDate] = useState<any>()
  const [tokenAddress, setTokenAddress] = useState<any>()
  const [isDeposited, setIsDeposited] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<any>()
  const [addressAmount, setAddressAmount] = useState<any[]>([])
  const [airdropID, setAirdropID] = useState<any>()
  const [amounts, setAmounts] = useState<any[]>([])
  const [userContributionBNB, setUserContributionBNB] = useState<any>()
  const [userContributionToken, setUserContributionToken] = useState<any>()
  const [airdropStarted, setAirdropStarted] = useState<boolean>(false)
  const [startTimeFlag, setStartTimeFlag] = useState<boolean>(false)
  const [started, setStarted] = useState<boolean>(false)
  const [cancelled, setCancelled] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>('')
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)

  const [formData, setFormData] = useState({
    chain_id: '32520',
    owner_address: '',
    token_address: '',
    start_date: new Date(),
  })

  // destructure
  const { start_date } = formData

  // fetch airdrop info
  useEffect(() => {
    const fetch = async () => {
      getAirdropById(airdropId)
        .then(async (response) => {
          setAirdrop(response)
          setAirdropID(response.airdrop_id)
          setTokenAddress(response.token_address)

          // get airdrop details
          if (!chainId || !library || !account) return
          const airdrop = getAirdropContract(chainId, library, account)

          const isStarted = await airdrop?.callStatic.isStarted(BigInt(response.airdrop_id).toString())
          setStarted(isStarted)

          const isCancelled = await airdrop?.callStatic.isCancelled(BigInt(response.airdrop_id).toString())
          setCancelled(isCancelled)

          if (isStarted) {
            const start_time = await airdrop?.callStatic.airdropStartTime(BigInt(response.airdrop_id).toString())
            setAirdropStarted(true)
            setCurrentTime(moment().format('X'))
            setFinalTime(start_time.toString())
            setStartDate(moment.unix(start_time).format('dddd, MMMM Do YYYY, h:mm:ss a'))
          }

          let combineArr: { address: string; amount: string }[] = []
          for (let i = 0; i < response.amounts_to.length; i++) {
            combineArr.push({
              address: response.addresses_to[i],
              amount: response.amounts_to[i],
            })
          }
          setAddressAmount(combineArr)

          let arr = 0
          for (let i = 0; i < response.amounts_to.length; i++) {
            arr += parseFloat(response.amounts_to[i])
          }
          setTotalAmount(arr)
        })
        .catch((err) => {
          console.log(err)
          swal('Oops', 'Something went wrong!', 'error')
        })
    }
    fetch()
  }, [airdropId])

  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const StartAirdrop = async (formData) => {
    if (!chainId || !library || !account) return
    const airdrop = getAirdropContract(chainId, library, account)

    const payload = [parseInt(airdropID), moment(start_date).format('X')]

    const method: (...args: any) => Promise<TransactionResponse> = airdrop!.startAirdrop
    const args: Array<string | number | boolean> = payload

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

  const handleStart = () => {
    if (!airdropId) {
      swal('Are you sure?', 'There are incomplete fields in your submission!', 'warning')
      return
    }

    StartAirdrop(formData)
  }

  const ApproveBitgertAirdrop = async (formData) => {
    if (!chainId || !library || !account) return
    const tokenContract = getTokenContract(tokenAddress, library, account)

    const payload = [AIRDROP_ADDRESS, totalAmount]

    const method: (...args: any) => Promise<TransactionResponse> = tokenContract!.approve
    const args: Array<string | string[] | string | number> = payload

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

  const handleAllowance = () => {
    if (!account || !tokenAddress) return
    ApproveBitgertAirdrop(formData)
  }

  const WithdrawAirdrop = async () => {
    if (!chainId || !library || !account) return
    const airdrop = getAirdropContract(chainId, library, account)

    const payload = [parseInt(airdropID)]

    const method: (...args: any) => Promise<TransactionResponse> = airdrop!.cancelAirdrop
    const args: Array<string | number | boolean> = payload

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
    if (!airdropId) {
      swal('Are you sure?', 'There are incomplete fields in your submission!', 'warning')
      return
    }

    WithdrawAirdrop()
  }

  const ClaimAirdrop = async () => {
    if (!chainId || !library || !account) return
    const airdrop = getAirdropContract(chainId, library, account)

    const payload = [parseInt(airdropID)]

    const method: (...args: any) => Promise<TransactionResponse> = airdrop!.claim
    const args: Array<string | number | boolean> = payload

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
    if (!airdropId) {
      swal('Are you sure?', 'There are incomplete fields in your submission!', 'warning')
      return
    }

    ClaimAirdrop()
  }

  return (
    <div>
      <div className=" d-flex justify-content-between my-3 ">
        <Card style={{ width: '35rem', margin: '0 auto' }} className="airdrop__card" text="light">
          <Card.Body>
            <div className="d-flex justify-content-center">
              <div className="airdrop__logo">
                <img src={airdrop.logo_link} alt="Airdrop Logo" className="rounded" />
              </div>
            </div>
            <div className="d-flex justify-content-center my-3">
              <h1 className="col-xs-3">{airdrop.title}</h1>
            </div>
            <div className="d-flex justify-content-center text-justify my-3">
              <h2 className="col-sx-3 font-italic">{airdrop.description}</h2>
            </div>
            <div className=" d-flex justify-content-between my-4">
              <Link to={airdrop.telegram_link}>
                <div className="links__logo">
                  <img src={TelegramIcon} alt="Telegram Logo" className="rounded " />
                </div>
              </Link>
              <Link to={airdrop.twitter_link}>
                <div className="links__logo">
                  <img src={TwitterIcon} alt="Twitter Logo" className="rounded " />
                </div>
              </Link>
              <Link to={airdrop.website_link}>
                <div className="links__logo">
                  <img src={WWWIcon} alt="WWW Logo" className="rounded " />
                </div>
              </Link>
            </div>

            <div className="d-flex justify-content-between">
              <div>
                <h5 className="col-sx-2 font-weight-light py-2 ">Airdrop Address :</h5>
                <h5 className="col-sx-2 font-weight-light pb-2">Token Address :</h5>
                <h5 className="col-sx-2 font-weight-light pb-2">Token Name :</h5>
                <h5 className="col-sx-2 font-weight-light pb-2">Token Symbol :</h5>
                <h5 className="col-sx-2 font-weight-light pb-2">Tokens For Airdrop:</h5>
                {started && airdropStarted && <h5 className="col-sx-2 font-weight-light pb-2">Airdrop Start Time:</h5>}
              </div>
              <div>
                <h5 className="col-sx-2 font-weight-light py-2">{AIRDROP_ADDRESS}</h5>
                <h5 className="col-sx-2 font-weight-light pb-2">{airdrop.token_address}</h5>
                <h5 className="col-sx-2 font-weight-light pb-2">{airdrop.token_name}</h5>
                <h5 className="col-sx-2 font-weight-light pb-2">{airdrop.token_symbol}</h5>
                <h5 className="col-sx-2 font-weight-light pb-2">{totalAmount}</h5>
                {started && airdropStarted && <h5 className="col-sx-2 font-weight-light pb-2">{startDate}</h5>}
              </div>
            </div>
          </Card.Body>
        </Card>
        <Card style={{ width: '25rem', margin: '0 auto' }} className="airdrop__card row-cols-0" text="light">
          <Card.Body>
            <div className="d-flex justify-content-between my-4">
              {!started && !cancelled && (
                <div className="">
                  <div className=" d-flex justify-content-center ml-5 my-4">
                    {airdrop.owner_address !== account && (
                      <div>
                        <h1 className=" d-flex justify-content-center ml-5 my-4">Airdrop will be starting soon!</h1>
                      </div>
                    )}
                    {airdrop.owner_address === account && (
                      <div>
                        <h1 className=" d-flex justify-content-center ml-5 my-4">
                          Airdrop cannot be cancelled once started!
                        </h1>
                        <div className=" d-flex justify-content-center ml-5 my-4">
                          <DateTimePicker
                            size="small"
                            color="primary"
                            fullWidth
                            inputVariant="outlined"
                            value={start_date}
                            onChange={(date) => {
                              handleDateChange('start_date', date)
                            }}
                            TextFieldComponent={(params) => {
                              return <CssTextField {...params} />
                            }}
                          />
                        </div>
                        <div className=" d-flex justify-content-center gap-3 ml-5 my-4">
                          <Button scale="md" variant="secondary" onClick={handleAllowance}>
                            Approve
                          </Button>
                          <Button scale="md" variant="secondary" onClick={handleStart}>
                            Start Airdrop
                          </Button>
                        </div>
                        <div className=" d-flex justify-content-center ml-5 my-4">
                          <Button scale="md" variant="secondary" onClick={handleWithdraw}>
                            Withdraw Airdrop
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {cancelled && (
                <div className=" d-flex justify-content-center ml-5 my-4">
                  <h1>Airdrop cancelled!</h1>
                </div>
              )}

              {started && airdropStarted && (
                <div className="">
                  {finalTime > currentTime && (
                    <div>
                      <div className=" d-flex justify-content-center ml-5 mt-4 mb-2">
                        <h1>Airdrop Timer:</h1>
                      </div>
                      <div className=" d-flex justify-content-center ml-5 mt-2 mb-4">
                        <h1>
                          <CountDownTimer endtime={finalTime} currTime={currentTime} />
                        </h1>
                      </div>
                    </div>
                  )}
                  {finalTime <= currentTime && (
                    <div className=" d-flex justify-content-center ml-5 mt-4 mb-2">
                      <h1>Airdrop Started! Claim your tokens!</h1>
                    </div>
                  )}
                  <div className="mb-3">
                    <h1 className=" d-flex justify-content-center ml-5">Go back to the dashboard to view others!</h1>
                    <div className=" d-flex justify-content-center ml-5 my-4">
                      <Link to={`/swap`}>
                        <Button scale="md" variant="secondary">
                          Bitgert Swap
                        </Button>
                      </Link>
                    </div>
                    <h1 className=" d-flex justify-content-center ml-5">If you are one of the Participants</h1>
                    <h1 className=" d-flex justify-content-center ml-5">Claim your tokens!</h1>
                    <div className=" d-flex justify-content-center ml-5 my-4">
                      <Button scale="md" variant="secondary" onClick={handleClaim}>
                        Claim
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className=" px-5 pb-5">
        <Table striped bordered hover variant="dark" className="table table-borderless">
          <thead>
            <tr>
              <th>Participants</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {addressAmount.map((token) => (
              <tr key={token.address}>
                <td> {token.address} </td>
                <td> {token.amount} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
