import React from 'react'
import millify from 'millify'
import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'

import Container from 'components/Container'

const Column = styled.div`
  background-color: #0e0e0e;
  color: #fff;
  padding: 1rem;
  margin: 0;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const TableHeader = styled.th`
  font-weight: 500;
  padding: 0.7rem;
`

const TableRow = styled.tr`
  border-bottom: 1px solid #3e3e3e;
`

const TableRowItem = styled.td`
  padding: 0.7rem;
`

const ASSETS_QUERY = gql`
  {
    tokens(
      orderBy: tradeVolume
      orderDirection: desc
      where: {
        id_not_in: [
          "0x0eb9036cbe0f052386f36170c6b07ef0a0e3f710"
          "0xc1f9bdd0603665b9ae1e4d56e58240a018596b1a"
          "0x52f26febc4f99e2a08c5d0c8b2e9be1a8f113f3c"
          "0xf7dec488c42972d12ec3a216a48676f111196448"
          "0xdff3eb18ac39285331521ba2316deecb082f7371"
          "0x218961247cf30b67983cbdbe4d198c8bc1e45541"
          "0x9892ffb5ec3eaa1ee980b8c14976a71c8455374b"
        ]
      }
    ) {
      id
      name
      symbol
      tradeVolumeUSD
      totalLiquidity
      tokenDayData(orderDirection: "desc", first: 1, orderBy: "date") {
        priceUSD
        totalLiquidityUSD
      }
    }
  }
`

const TopTradingAssets = () => {
  const { data } = useQuery(ASSETS_QUERY)
  return (
    <Container>
      <Column>
        <table className="text-white">
          <thead>
            <TableRow>
              <TableHeader>#</TableHeader>
              <TableHeader>Token</TableHeader>
              <TableHeader>Price</TableHeader>
              <TableHeader>Volume</TableHeader>
              <TableHeader>Liquidity</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {data?.tokens?.map((token, idx) => (
              <TableRow key={token.id}>
                <TableRowItem>{idx + 1}</TableRowItem>
                <TableRowItem>
                  {token.name} ({token.symbol})
                </TableRowItem>
                <TableRowItem>$ {parseFloat(token?.tokenDayData[0]?.priceUSD || 0).toFixed(8)}</TableRowItem>
                <TableRowItem>$ {parseFloat(token.tradeVolumeUSD).toFixed(4)}</TableRowItem>
                <TableRowItem>$ {millify(parseFloat(token?.tokenDayData[0]?.totalLiquidityUSD || 0))}</TableRowItem>
              </TableRow>
            ))}
          </tbody>
        </table>
      </Column>
    </Container>
  )
}

export default TopTradingAssets
