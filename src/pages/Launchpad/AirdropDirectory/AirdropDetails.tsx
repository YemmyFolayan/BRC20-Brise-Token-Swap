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
import { SocialIcon } from 'react-social-icons'

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
import { Oval } from 'react-loader-spinner'

import './style.css'
import { AppBodyExtended } from 'pages/AppBody'
import TransactionConfirmationModal from 'components/TransactionConfirmationModal'
import { RouteComponentProps } from 'react-router-dom'
import { getAirdropById } from './apicalls'
import { setFlagsFromString } from 'v8'
import {
  TableWrapper,
  Table,
  TableHeader,
  AirdropCardWrapper,
  AirdropCard,
  AirdropCardBody,
  AirdropHeader,
  AirdropSubHeader,
  TableWrapperExtended,
  IconsWrapper,
  LoaderWrapper,
} from './styleds'

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

  const [airdrop, setAirdrop] = useState<any>(null)
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
  const [isArroved, setIsArroved] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

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
      setLoading(true)
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
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)

          console.log(err)
          swal('Oops', 'Something went wrong!', 'error')
        })
    }
    fetch()
  }, [airdropId])

  const handleDateChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const startAirdrop = async () => {
    if (!chainId || !library || !account || !airdropId) return
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

  const handleAllowance = async () => {
    if (!chainId || !library || !account || !tokenAddress) return
    const tokenContract = getTokenContract(tokenAddress, library, account)

    const payload = [
      AIRDROP_ADDRESS,
      ethers.utils.parseUnits(totalAmount.toString(), parseInt(airdrop.token_decimal)).toString(),
    ]

    const method: (...args: any) => Promise<TransactionResponse> = tokenContract!.approve
    const args: Array<string | string[] | string | number> = payload

    setAttemptingTxn(true)
    setIsArroved(false)
    await method(...args)
      .then((response) => {
        setIsArroved(true)
        setAttemptingTxn(false)
        setTxHash(response.hash)
      })
      .catch((e) => {
        setIsArroved(false)
        setAttemptingTxn(false)
        // we only care if the error is something _other_ than the user rejected the tx
        if (e?.code !== 4001) {
          console.error(e)
          alert(e.message)
        }
      })
  }

  const handleWithdraw = async () => {
    if (!chainId || !library || !account || !airdropId) return
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

  const handleClaim = async () => {
    if (!chainId || !library || !account || !airdropId) return
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

  return (
    <Container>
      {loading && (
        <LoaderWrapper>
          <Oval
            height={80}
            width={80}
            color="#f9d849"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#f4d85b"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </LoaderWrapper>
      )}
      {airdrop !== null && !loading && (
        <div>
          <AirdropCardWrapper>
            <AirdropCard>
              <AirdropCardBody>
                <TableWrapperExtended className="d-flex flex-column justify-content-center align-items-center ">
                  <div className="airdrop__logo mb-2">
                    <img src={airdrop.logo_url} alt="Airdrop Logo" className="rounded" />
                  </div>
                  <AirdropHeader fontSize="2rem">{airdrop.title}</AirdropHeader>
                  <AirdropSubHeader fontSize="1.2rem">{airdrop.description}</AirdropSubHeader>
                </TableWrapperExtended>

                <div className="d-flex justify-content-center">
                  <IconsWrapper className="d-flex justify-content-between">
                    <SocialIcon
                      url={airdrop.instagram_url}
                      network="instagram"
                      fgColor="#fff"
                      style={{ height: 40, width: 40 }}
                    />
                    <SocialIcon
                      url={airdrop.twitter_url}
                      network="twitter"
                      fgColor="#fff"
                      style={{ height: 40, width: 40 }}
                    />
                    <SocialIcon
                      url={airdrop.reddit_url}
                      network="reddit"
                      fgColor="#fff"
                      style={{ height: 40, width: 40 }}
                    />
                    <SocialIcon
                      url={airdrop.github_url}
                      network="github"
                      fgColor="#fff"
                      style={{ height: 40, width: 40 }}
                    />
                    <SocialIcon
                      url={airdrop.telegram_url}
                      network="telegram"
                      fgColor="#fff"
                      style={{ height: 40, width: 40 }}
                    />
                    <SocialIcon
                      url={airdrop.website_url}
                      network="dribbble"
                      fgColor="#fff"
                      style={{ height: 40, width: 40 }}
                    />
                  </IconsWrapper>
                </div>

                <TableWrapperExtended>
                  <Table>
                    <tbody>
                      <tr>
                        <td>Airdrop Address</td>
                        <td>{AIRDROP_ADDRESS}</td>
                      </tr>

                      <tr>
                        <td>Token Address</td>
                        <td>{airdrop.token_name}</td>
                      </tr>

                      <tr>
                        <td>Token Name </td>
                        <td>{airdrop.token_name}</td>
                      </tr>

                      <tr>
                        <td>Token Symbol</td>
                        <td>{airdrop.token_symbol}</td>
                      </tr>

                      <tr>
                        <td>Tokens For Airdrop</td>
                        <td>{totalAmount}</td>
                      </tr>

                      {started && airdropStarted && (
                        <tr>
                          <td>Start Date</td>
                          <td>{startDate}</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </TableWrapperExtended>
              </AirdropCardBody>
            </AirdropCard>

            <AirdropCard>
              <AirdropCardBody>
                {!started && !cancelled && (
                  <TableWrapperExtended>
                    {airdrop.owner_address !== account && (
                      <div>
                        <h1 className=" d-flex justify-content-center  my-4">Airdrop will be starting soon!</h1>
                      </div>
                    )}
                    {airdrop.owner_address === account && (
                      <>
                        <TableHeader>Airdrop cannot be cancelled once started!</TableHeader>
                        <div className=" d-flex justify-content-center my-4">
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
                        <div className=" d-flex justify-content-center my-4">
                          {isArroved ? (
                            <Button scale="md" variant="secondary" onClick={startAirdrop} className="ml-2">
                              Start Airdrop
                            </Button>
                          ) : (
                            <Button scale="md" variant="secondary" onClick={handleAllowance}>
                              Approve
                            </Button>
                          )}
                        </div>
                        <div className=" d-flex justify-content-center  my-4">
                          <Button scale="md" variant="secondary" onClick={handleWithdraw}>
                            Withdraw Airdrop
                          </Button>
                        </div>
                      </>
                    )}
                  </TableWrapperExtended>
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
                      <div className=" d-flex justify-content-center  mt-4 mb-2">
                        <h1>Airdrop Started! Claim your tokens!</h1>
                      </div>
                    )}
                    <div className="mb-3">
                      <h1 className=" d-flex justify-content-center ">If you are one of the Participants</h1>
                      <h1 className=" d-flex justify-content-center ">Claim your tokens!</h1>
                      <div className=" d-flex justify-content-center  my-4">
                        <Button scale="md" variant="secondary" onClick={handleClaim}>
                          Claim
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </AirdropCardBody>
            </AirdropCard>
          </AirdropCardWrapper>
          <TableWrapperExtended>
            <Table>
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
          </TableWrapperExtended>
        </div>
      )}
    </Container>
  )
}
