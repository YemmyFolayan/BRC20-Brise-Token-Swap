/* eslint-disable */
import React, { useState, useEffect, useMemo } from 'react'
import { Card, Badge, Button as BSButton, ProgressBar, Table } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import swal from 'sweetalert'
import { Button, CardBody, Input } from '@evofinance9/uikit'
import { DateTimePicker } from '@material-ui/pickers'
import { TextField, withStyles } from '@material-ui/core'
import { Checkbox, useCheckboxState } from 'pretty-checkbox-react'
import '@djthoms/pretty-checkbox'

import { ethers } from 'ethers'
import CountDownTimer from '../CountDownTimer'
import moment from 'moment'

import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import Container from 'components/Container'
import { getLockById, getLocksByToken } from './apicalls'

// import contributeInLock from './apicalls'
// import WithdrawFromLock from './apicalls'

import { useActiveWeb3React } from 'hooks'
import { useDateTimeContract } from 'hooks/useContract'
import getUnixTimestamp from 'utils/getUnixTimestamp'

import './style.css'
import { AppBodyExtended } from 'pages/AppBody'
import TransactionConfirmationModal from 'components/TransactionConfirmationModal'
import { RouteComponentProps } from 'react-router-dom'
import TokenLocks from './TokenLocks'

interface FormComponentProps {
  match: {
    params: { tokenId }
  }
}

export default function TokenDetails({
  match: {
    params: { tokenId },
  },
}: FormComponentProps) {
  const [token, setToken] = useState<any>({})
  const [locks, setLocks] = useState<any[]>([])
  const [totalAmount, setTotalAmount] = useState<any>()

  // fetch lock info
  useEffect(() => {
    const fetch = async () => {
      getLocksByToken(tokenId)
        .then(async (response) => {
          setToken(response[0])
          setLocks(response)
          let totalAmount = 0
          for (let i = 0; i < response.length; i++) {
            totalAmount += response[i].amount
          }
          setTotalAmount(totalAmount)
        })
        .catch((err) => {
          console.log(err)
          swal('Oops', 'Something went wrong!', 'error')
        })
    }
    fetch()
  }, [tokenId])

  return (
    <div>
      <div className=" px-5 py-5">
        <Table striped bordered hover variant="dark" className="table table-borderless">
          <br />
          <header className="d-flex justify-content-center">Lock Info</header>
          <br />
          <tbody>
            <tr className="d-flex justify-content-between">
              <td> Current Locked Amount </td>
              <td>
                {' '}
                {totalAmount} {token.token_symbol}{' '}
              </td>
            </tr>
            <tr className="d-flex justify-content-between">
              <td>Current Values Locked </td>
              <td>{token.amount} </td>
            </tr>
            <tr className="d-flex justify-content-between">
              <td>Token Address </td>
              <td>{token.token_address} </td>
            </tr>
            <tr className="d-flex justify-content-between">
              <td>Token Name</td>
              <td>{token.token_name} </td>
            </tr>
            <tr className="d-flex justify-content-between">
              <td>Token Symbol</td>
              <td> {token.token_symbol} </td>
            </tr>
            <tr className="d-flex justify-content-between">
              <td>Token Decimals </td>
              <td>{token.token_decimal} </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className=" px-5 pb-5">
        <Table striped bordered hover variant="dark" className="table table-borderless">
          <thead>
            {/* <tr className='d-flex justify-content-center'>
              <th >
                  Lock Records
              </th>
            </tr> */}
            <tr>
              <th>Wallet</th>
              <th>Amount</th>
              <th>Cycle(d)</th>
              <th>Cycle Release(%)</th>
              <th>TGE(%)</th>
              <th>Unlock time(UTC)</th>
            </tr>
          </thead>
          {locks.map((lock) => (
            <TokenLocks data={lock} key={lock._id} />
          ))}
        </Table>
      </div>
    </div>
  )
}
