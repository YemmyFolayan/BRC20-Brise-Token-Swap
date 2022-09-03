/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { Oval } from 'react-loader-spinner'

import './style.css'

import Container from 'components/Container'

import getAllTokens from './apicalls'
import { TableWrapper, Table, LoaderWrapper } from './styleds'

export default function LockDirectory() {
  const [tokenDetails, setTokenDetails] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchLockList = () => {
      setLoading(true)
      getAllTokens()
        .then((response) => {
          setLoading(false)
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
          setLoading(false)
          console.log(err)
          swal('Oops', 'Something went wrong!', 'error')
        })
    }
    fetchLockList()
  }, [])

  return (
    <>
      <Container>
        <TableWrapper>
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

          {Object.entries(tokenDetails).length !== 0 && (
            <Table>
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(tokenDetails).map((token) => (
                  <tr key={tokenDetails[token[0]][1].toString()}>
                    <td>
                      {tokenDetails[token[0]][1]}
                      <span className="text-secondary ml-2"> {tokenDetails[token[0]][2]} </span>{' '}
                    </td>
                    <td>{tokenDetails[token[0]][0]}</td>
                    <td>
                      <Link to={`/locks/${token[0]}`}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </TableWrapper>
      </Container>
      <div className="mt-5"> </div>
    </>
  )
}
