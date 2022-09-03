/* eslint-disable */
import React, { useState, useEffect, useMemo } from 'react'
import { Card, Badge, Button as BSButton, ProgressBar } from 'react-bootstrap'

import { Link } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'

import swal from 'sweetalert'
import { Button, CardBody, Input } from '@evofinance9/uikit'
import { DateTimePicker } from '@material-ui/pickers'
import { TextField, withStyles } from '@material-ui/core'
import { Checkbox, useCheckboxState } from 'pretty-checkbox-react'
import '@djthoms/pretty-checkbox'

import { ethers } from 'ethers'
import CountDownTimer from '../CountDownTimer'
import moment from 'moment'
import { getBitgertLockContract } from 'utils'

import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import Container from 'components/Container'
import { getLockById } from './apicalls'

import { useActiveWeb3React } from 'hooks'
import { useDateTimeContract } from 'hooks/useContract'
import getUnixTimestamp from 'utils/getUnixTimestamp'

import './style.css'
import { AppBodyExtended } from 'pages/AppBody'
import TransactionConfirmationModal from 'components/TransactionConfirmationModal'
import { RouteComponentProps } from 'react-router-dom'
import { TableWrapper, Table, LoaderWrapper, TableHeader } from './styleds'

interface FormComponentProps {
  match: {
    params: { lockId }
  }
}

export default function LockDetails({
  match: {
    params: { lockId },
  },
}: FormComponentProps) {
  const [lock, setLock] = useState<any>(null)
  const [finalTime, setFinalTime] = useState<any>()
  const [currentTime, setCurrentTime] = useState<any>()
  const [lockID, setLockID] = useState<any>()
  const [owner, setOwner] = useState<any>()
  const { account, chainId, library } = useActiveWeb3React()
  const [txHash, setTxHash] = useState<string>('')
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  // fetch lock info
  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      getLockById(lockId)
        .then(async (response) => {
          setLoading(false)
          setLock(response)
          setLockID(response.lock_id)
          setOwner(response.owner_address)
          const end_time = response.release_date !== null ? response.release_date : response.tge_date
          setCurrentTime(moment().format('X'))
          setFinalTime(moment(end_time).format('X'))
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
          swal('Oops', 'Something went wrong!', 'error')
        })
    }
    fetch()
  }, [lockId])

  const UnlockBitgertLock = async () => {
    if (!chainId || !library || !account) return
    const bitgertLock = getBitgertLockContract(chainId, library, account)

    const payload = [parseInt(lockID)]

    const method: (...args: any) => Promise<TransactionResponse> = bitgertLock!.unlock
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

  const handleUnlock = () => {
    if (!account || !lockId) return
    UnlockBitgertLock()
  }

  return (
    <Container>
      <TableWrapper className="p-3">
        <div>
          <div className="d-flex justify-content-center p-2">
            <TableHeader> Unlock In </TableHeader>
          </div>
          <div className="d-flex justify-content-center text-white">
            {finalTime > currentTime && <CountDownTimer endtime={finalTime} currTime={currentTime} />}
            {finalTime <= currentTime && <h1> 00 Days 00 Hours 00 Minutes 00 Seconds </h1>}
          </div>
          <br />
        </div>

        <TableHeader>Token Info</TableHeader>
        {loading && (
          <LoaderWrapper>
            <Oval
              height={80}
              width={80}
              color="#000FFF"
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

        {lock !== null && (
          <Table>
            <tbody>
              <tr className="d-flex justify-content-between">
                <td>Token Address </td>
                <td> {lock.token_address} </td>
              </tr>
              <tr className="d-flex justify-content-between">
                <td>Token Name </td>
                <td>{lock.token_name} </td>
              </tr>
              <tr className="d-flex justify-content-between">
                <td>Token Symbol </td>
                <td> {lock.token_symbol} </td>
              </tr>
              <tr className="d-flex justify-content-between">
                <td>Token Decimals </td>
                <td>{lock.token_decimal} </td>
              </tr>
            </tbody>
          </Table>
        )}
      </TableWrapper>
      <TableWrapper>
        <TableHeader>Lock Info</TableHeader>

        {loading && (
          <LoaderWrapper>
            <Oval
              height={80}
              width={80}
              color="#000FFF"
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

        {lock !== null && (
          <Table>
            <tbody>
              <tr className="d-flex justify-content-between">
                <td>Title </td>
                <td>{lock.title} </td>
              </tr>
              <tr className="d-flex justify-content-between">
                <td>Total Amount Locked </td>
                <td>
                  {lock.amount} {lock.token_symbol}
                </td>
              </tr>
              <tr className="d-flex justify-content-between">
                <td>Owner </td>
                <td> {lock.owner_address} </td>
              </tr>
              {!lock.is_vesting && (
                <tr className="d-flex justify-content-between">
                  <td> Unlock Date </td>
                  <td> {moment(lock.release_date).format('YYYY-MM-DD H:mm')} </td>
                </tr>
              )}
              {lock.is_vesting && (
                <tr className="d-flex justify-content-between">
                  <td>TGE Date </td>
                  <td>{moment(lock.tge_date).format('YYYY-MM-DD H:mm')} </td>
                </tr>
              )}
              <tr className="d-flex justify-content-between">
                <td>TGE Percent </td>
                <td>{lock.tge_percent || '-'} </td>
              </tr>
              <tr className="d-flex justify-content-between">
                <td> Cycle</td>
                <td> {lock.Cycle || '-'} </td>
              </tr>
              <tr className="d-flex justify-content-between">
                <td> Release Cycle </td>
                <td> {lock.release_cycle || '-'} </td>
              </tr>
              {/* <tr className="d-flex justify-content-between">
              <td> Unlocked Amount </td>
              <td> {lock.amount !== null ? 0 : lock.amount} </td>
            </tr> */}
            </tbody>
          </Table>
        )}

        {owner === account && (
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Button className="mx-3" onClick={handleUnlock}>
              Unlock
            </Button>
          </div>
        )}
      </TableWrapper>
    </Container>
  )
}
