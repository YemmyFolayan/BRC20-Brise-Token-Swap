import React, { useState, useEffect } from 'react'
import { Container, Table, FormControl } from 'react-bootstrap'

import { SWAP_API } from 'backend'

import getTokens from './apicalls'

export default function WatchlistTables() {
  const [tokens, setTokens] = useState<any>([])
  const [searchResult, setSearchResult] = useState<any>([])

  const [loading, setLoading] = useState(false)

  const preload = () => {
    setLoading(true)
    getTokens().then((data) => {
      setLoading(false)
      if (data) {
        setTokens(data)
      }
    })
  }

  useEffect(() => {
    preload()
    const intervalId = setInterval(() => {
      preload()
    }, 20000)

    return () => clearInterval(intervalId)
  }, [])

  const getLogoURL = (token) => {
    switch (token.id) {
      case 'OMNIA2':
        return `${SWAP_API}/images/0x5d4685c2C75581C67b9D6292A065a767bC214681.png`
      case 'ELTG':
        return `${SWAP_API}/images/0xb860eCD8400600c13342a751408737235E177077.png`
      case 'WBRISE':
        return `${SWAP_API}/images/0x8fff93e810a2edaafc326edee51071da9d398e83.png`
      case 'BROGE2':
        return `${SWAP_API}/images/0x41c5ae56681Fb19334eCF7d914919805DaE2Ec8f.png`
      case 'VEF2':
        return `${SWAP_API}/images/0xd6447d2fa919811c41a064bdbdab1e281f8de9b2.png`
      case 'BPAD4':
        return `${SWAP_API}/images/0x71946a5C9dA7C95ee804a9BE561EC15A3F286A7D.png`

      default:
        return token.logo_url
    }
  }

  const handleSearch = (e) => {
    console.log(e.target.value)

    const result = tokens.filter(
      (o) => o.id.includes(e.target.value.toUpperCase()) || o.symbol.includes(e.target.value.toUpperCase())
    )
    setSearchResult(result)
  }

  return (
    <div className="table_section">
      <Container>
        <div className="d-flex justify-content-between my-3">
          <h3>
            <span role="img" aria-label="active" className="emoji">
              ⚡️
            </span>{' '}
            Actively Traded
          </h3>
          <div className="search_input">
            <FormControl type="search" placeholder="Search ( / )" aria-label="Search" onChange={handleSearch} />
          </div>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Price Change (1D)</th>
              <th>Volume (24H)</th>
            </tr>
          </thead>
          <tbody>
            {searchResult.length === 0 &&
              tokens.map((token, idx) => {
                if (!['OMNIA2', 'BDSL'].includes(token!.id)) {
                  return (
                    <tr key={token.id}>
                      <td style={{ width: '5%' }}>
                        <div className="heading">
                          <span>{idx}</span>
                        </div>
                      </td>
                      <td style={token.id === 1 ? { borderTop: '0' } : {}}>
                        <a href={getLogoURL(token)} rel="noreferrer">
                          <span>
                            <img src={getLogoURL(token)} alt={token.name} />
                          </span>
                          <span className="title">{token.symbol}</span>
                          <span className="dib" />
                        </a>
                      </td>
                      <td>${token.price}</td>
                      {/* <td className="text-danger">-1.75%</td> */}
                      <td className={token['1d']?.price_change < 0 ? 'text-danger' : 'text-success'}>
                        {token['1d']?.price_change ? `${token['1d'].price_change}` : '-'}
                      </td>
                      {/* <td className="filter">-1.75%</td> */}
                      <td>{token['1d']?.volume ? `$${token['1d'].volume}` : '-'}</td>
                    </tr>
                  )
                }
                return ''
              })}

            {searchResult.map((token, idx) => {
              if (!['OMNIA2', 'BDSL'].includes(token!.id)) {
                return (
                  <tr key={token.id}>
                    <td style={{ width: '5%' }}>
                      <div className="heading">
                        <span>{++idx}</span>
                      </div>
                    </td>
                    <td style={token.id === 1 ? { borderTop: '0' } : {}}>
                      <a href={getLogoURL(token)} rel="noreferrer">
                        <span>
                          <img src={getLogoURL(token)} alt={token.name} />
                        </span>
                        <span className="title">{token.symbol}</span>
                        <span className="dib" />
                      </a>
                    </td>
                    <td>${token.price}</td>
                    {/* <td className="text-danger">-1.75%</td> */}
                    <td className={token['1d']?.price_change < 0 ? 'text-danger' : 'text-success'}>
                      {token['1d']?.price_change ? `${token['1d'].price_change}` : '-'}
                    </td>
                    {/* <td className="filter">-1.75%</td> */}
                    <td>{token['1d']?.volume ? `$${token['1d'].volume}` : '-'}</td>
                  </tr>
                )
              }
              return ''
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}
