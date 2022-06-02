import React, { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import { Star } from '../../assets/images'

import getTokens from './apicalls'

export default function WatchlistTables() {
  const [tokens, setTokens] = useState<any>([])
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
        return `https://evo-server.in/images/0x5d4685c2C75581C67b9D6292A065a767bC214681.png`
      case 'ELTG':
        return `https://evo-server.in/images/0xb860eCD8400600c13342a751408737235E177077.png`
      case 'WBRISE':
        return `https://evo-server.in/images/0x8fff93e810a2edaafc326edee51071da9d398e83.png`
      case 'BROGE2':
        return `https://evo-server.in/images/0x41c5ae56681Fb19334eCF7d914919805DaE2Ec8f.png`

      default:
        return token.logo_url
    }
  }

  return (
    <div className="table_section">
      <Container fluid>
        <h3>
          <span role="img" aria-label="active" className="emoji">
            ⚡️
          </span>{' '}
          Actively Traded
        </h3>
        <Table responsive>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Price Change</th>
              <th>Volume (24H)</th>
              <th>Liquidity</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token) => (
              <tr key={token.id}>
                <td style={{ width: '5%' }}>
                  <div className="heading">
                    <img src={Star} alt="" />
                    <span>{token.name}</span>
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
                  <button className="btn" type="button">
                    Buy
                  </button>
                </td>
                <td>${token.price}</td>
                {/* <td className="text-danger">-1.75%</td> */}
                <td className="filter">-1.75%</td>
                {/* <td className="filter">-1.75%</td> */}
                <td>{token['1d']?.volume ? `$${token['1d'].volume}` : '-'}</td>
                <td className="filter">$557.79B</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}
