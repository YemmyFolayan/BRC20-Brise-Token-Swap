/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Button, CardBody, Grid } from '@evofinance9/uikit'
import swal from 'sweetalert'

import Container from 'components/Container'

import { AppBodyExtended } from 'pages/AppBody'

import './style.css'
import getAllTokens from './apicalls'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function LockDirectory() {
  const [tokenDetails, setTokenDetails] = useState<any>({})

  useEffect(() => {
    const fetchLockList = () => {
      getAllTokens()
        .then((response) => {
          const tmp = {}
          const rs = response.reduce((acc, e) => {
            if (tmp[e.token_address]) {
              tmp[e.token_address][0] += e.amount
            } else {
              tmp[e.token_address] = [e.amount, e.token_name, e.token_symbol]
            }
          }, [])
          setTokenDetails(tmp)
        })
        .catch((err) => {
          console.log(err)
          swal('Oops', 'Something went wrong!', 'error')
        })
    }
    fetchLockList()
  }, [])

  return (
    <>
      <Container>
        <div className="row w-100 h-100">
          <Table striped bordered hover variant="dark" className="table table-borderless p-3">
            <thead>
              <tr>
                <th>Token</th>
                <th>Amount</th>
              </tr>
            </thead>
            {Object.entries(tokenDetails).map((token) => (
              <tbody>
                <tr>
                  <td>
                    {tokenDetails[token[0]][1]} <br /> <span className="text-secondary"> {tokenDetails[token[0]][2]} </span>{' '}
                  </td>
                  <td>{tokenDetails[token[0]][0]}</td>
                  <td>
                    <Link to={`/locks/${token[0]}`}>View</Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </Container>
      <div className="mt-5"> </div>
    </>
  )
}
