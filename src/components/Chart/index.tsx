import React, { useEffect, useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { SWAP_API } from 'backend'
import { CardBody, Card } from '@evofinance9/uikit'
import { useQuery, gql } from '@apollo/client'
import { createChart, ColorType } from 'lightweight-charts'

import Container from 'components/Container'
import Loader from 'components/Loader'

import {
  ChartContainerDiv,
  StyledHeading,
  TokenLogo,
  HeadingContainer,
  TokenLogoContainer,
  PriceHeading,
  PriceSubHeading,
  PriceHeadingContainer,
  DateText,
  LoaderContainer,
} from './styleds'

const ContainerExtended = styled(Container)`
  padding: 0;
`

const BodyWrapper = styled(Card)`
  width: 100%;
  flex: 2;
`

const PAIR_QUERY = gql`
  {
    pair(id: "0x77575200f7a35072e0c5e691b32b26286d43a973") {
      id
      token0 {
        id
        symbol
      }
      token1 {
        id
        symbol
      }
      token0Price
      token1Price
      totalSupply
      createdAtTimestamp
    }
  }
`

export default function Chart() {
  const { data: graphData, loading } = useQuery(PAIR_QUERY)
  const [data, setData] = useState<{
    id: string
    token0: {
      id: string
      symbol: string
    }
    token1: {
      id: string
      symbol: string
    }
    totalSupply: string
    token0Price: string
    token1Price: string
    createdAtTimestamp: string
  } | null>(null)

  useEffect(() => {
    const firstChart = createChart('chartContainer', {
      layout: {
        background: { type: ColorType.Solid, color: '#131722' },
        textColor: '#d1d4dc',
      },
      width: document.getElementById('chartContainer')?.clientWidth,
      height: 400,
      grid: {
        vertLines: {
          color: 'rgba(42, 46, 57, 0)',
        },
        horzLines: {
          color: 'rgba(42, 46, 57, 0.6)',
        },
      },
    })

    const candlestickSeries = firstChart.addCandlestickSeries()
    candlestickSeries.setData([
      { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
      { time: '2018-12-23', open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
      { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
      { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
      { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
      { time: '2018-12-27', open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
      { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
      { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
      { time: '2018-12-30', open: 106.33, high: 110.2, low: 90.39, close: 98.1 },
      { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
    ])
  }, [])

  useEffect(() => {
    if (graphData) {
      setData(graphData?.pair)
    }
  }, [graphData])

  return (
    <ContainerExtended>
      <BodyWrapper>
        <CardBody>
          <div>
            {loading && (
              <LoaderContainer>
                <Loader size="25px" />
              </LoaderContainer>
            )}
            {!loading && data && (
              <>
                <HeadingContainer>
                  <TokenLogoContainer>
                    <TokenLogo src={`${SWAP_API}/images/${data.token1.id}.png`} alt={data.token1.symbol} />
                    <TokenLogo src={`${SWAP_API}/images/${data.token0.id}.png`} alt={data.token0.symbol} />
                  </TokenLogoContainer>
                  <StyledHeading>
                    {data.token1.symbol}/{data.token0.symbol}
                  </StyledHeading>
                </HeadingContainer>

                <PriceHeadingContainer>
                  <PriceHeading>{parseFloat(data.token1Price).toFixed(4)}</PriceHeading>
                  <PriceSubHeading>
                    {data.token1.symbol}/{data.token0.symbol}
                  </PriceSubHeading>
                </PriceHeadingContainer>

                <HeadingContainer>
                  <DateText>{moment.unix(parseInt(data.createdAtTimestamp)).format('MMM DD, YYYY, h:mm A')}</DateText>
                </HeadingContainer>
              </>
            )}
          </div>
          <ChartContainerDiv id="chartContainer" />
        </CardBody>
      </BodyWrapper>
    </ContainerExtended>
  )
}
