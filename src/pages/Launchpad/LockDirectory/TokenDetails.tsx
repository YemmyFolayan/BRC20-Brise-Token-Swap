/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import moment from 'moment'
import { Oval } from 'react-loader-spinner'

import Container from 'components/Container'

import { getLocksByToken } from './apicalls'
import './style.css'

import { TableWrapper, Table, LoaderWrapper, TableHeader } from './styleds'

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
  const [token, setToken] = useState<any>(null)
  const [locks, setLocks] = useState<any[]>([])
  const [totalAmount, setTotalAmount] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)

  // fetch lock info
  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      getLocksByToken(tokenId)
        .then(async (response) => {
          setLoading(false)
          setToken(response[0])
          setLocks(response)
          let totalAmount = 0
          for (let i = 0; i < response.length; i++) {
            totalAmount += response[i].amount
          }
          setTotalAmount(totalAmount)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
          swal('Oops', 'Something went wrong!', 'error')
        })
    }
    fetch()
  }, [tokenId])

  return (
    <Container>
      <TableWrapper>
        <TableHeader>Lock Info</TableHeader>

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
        {token !== null && (
          <Table>
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
        )}
      </TableWrapper>

      <TableWrapper>
        <TableHeader>Lock records</TableHeader>

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

        {locks.length !== 0 && (
          <Table>
            <thead>
              <tr>
                <th>Wallet</th>
                <th>Amount</th>
                <th>Cycle(d)</th>
                <th>Cycle Release(%)</th>
                <th>TGE(%)</th>
                <th>Unlock time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {locks.map(
                ({
                  release_date,
                  tge_date,
                  release_cycle,
                  tge_percent,
                  release_percent,
                  owner_address,
                  amount,
                  _id,
                }) => (
                  <tr>
                    <td>{`${owner_address.slice(0, 6)}...${owner_address.slice(38)}`}</td>
                    <td> {amount || '-'} </td>
                    <td> {release_cycle || '-'} </td>
                    <td> {release_percent || '-'}</td>
                    <td> {tge_percent || '-'} </td>
                    <td>
                      {' '}
                      {release_date !== null
                        ? moment(release_date).format('YYYY-MM-DD H:mm')
                        : moment(tge_date).format('YYYY-MM-DD H:mm')}{' '}
                    </td>
                    <td>
                      <Link to={`/lock/${_id}`}>View</Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        )}
      </TableWrapper>
    </Container>
  )
}
