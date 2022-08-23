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

const PRICE_QUERY = gql`
  {
    tokenDayDatas(first: 100, orderDirection: asc, where: { token: "0x267ae4ba9ce5ef3c87629812596b0d89ecbd81dd" }) {
      date
      priceUSD
    }
  }
`

export default function Chart() {
  const { data: graphData, loading } = useQuery(PAIR_QUERY)
  const { data: priceGraphData } = useQuery(PRICE_QUERY)

  const [priceData, setPriceData] = useState([])

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
    if (!priceData || priceData?.length === 0) return
    console.log("Called!!!!")
    console.log(priceData)
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
    candlestickSeries.setData(priceData)
  }, [priceData])

  useEffect(() => {
    if (graphData) {
      setData(graphData?.pair)
    }
  }, [graphData])

  useEffect(() => {
    if (!priceGraphData) return
    const { tokenDayDatas } = priceGraphData
    const formattedData = tokenDayDatas.map((tokenDayData) => ({
      open: Math.floor(Math.random() * (10 - 1 + 1) + 1),
      high: Math.floor(Math.random() * (10 - 1 + 1) + 1),
      low: Math.floor(Math.random() * (10 - 1 + 1) + 1),
      close: Math.floor(Math.random() * (10 - 1 + 1) + 1),
      time: moment.unix(tokenDayData.date).format('YYYY-MM-DD'),
    }))
    setPriceData(formattedData)
  }, [priceGraphData])

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
