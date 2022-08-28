import React, { useEffect, useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { SWAP_API } from 'backend'
import { CardBody, Card, Input } from '@evofinance9/uikit'
import { useQuery, gql } from '@apollo/client'
import { createChart, ColorType } from 'lightweight-charts'
import { isAddress } from 'ethers/lib/utils'
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
  InputWrapper,
  SearchResContainer,
  SearchResItem,
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
  query TokenDayDatas($first: Int, $orderDirection: OrderDirection, $where: TokenDayData_filter) {
    tokenDayDatas(first: $first, orderDirection: $orderDirection, where: $where) {
      priceUSD
      date
      open
      high
      low
      close
      token {
        name
        symbol
        id
      }
    }
  }
`

const TOKENS_QUERY = gql`
  query Tokens($where: Token_filter) {
    tokens(where: $where) {
      name
      symbol
      id
    }
  }
`

export default function Chart() {
  const { data: graphData, loading } = useQuery(PAIR_QUERY)
  const { data: priceGraphData, refetch: priceRefetch } = useQuery(PRICE_QUERY)
  const { data: tokensData, refetch } = useQuery(TOKENS_QUERY)

  const [priceData, setPriceData] = useState([])
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState('')
  const [tokens, setTokens] = useState<
    {
      id: string
      symbol: string
    }[]
  >([])

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

    const element = document.getElementById('chartContainer') as HTMLDivElement

    if (element) {
      element.innerHTML = ''
    }

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
    const candlestickSeries = firstChart.addCandlestickSeries({
      priceFormat: {
        type: 'custom',
        formatter: (price) => parseFloat(price).toFixed(8),
      },
    })
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
      open: tokenDayData.open,
      high: tokenDayData.high,
      low: tokenDayData.low,
      close: tokenDayData.close,
      time: moment.unix(tokenDayData.date).format('YYYY-MM-DD'),
    }))
    setPriceData(formattedData)
  }, [priceGraphData])

  useEffect(() => {
    if (!tokensData || !search) return
    setTokens(tokensData.tokens)
    console.log(tokensData.tokens)
  }, [tokensData, search])

  useEffect(() => {
    priceRefetch({
      first: 100,
      orderDirection: 'asc',
      where: {
        token: '0x267ae4ba9ce5ef3c87629812596b0d89ecbd81dd',
      },
    })
  }, [priceRefetch])

  return (
    <ContainerExtended>
      <BodyWrapper>
        <CardBody>
          <div>
            <InputWrapper>
              <Input
                placeholder="Search here"
                onChange={(e) => {
                  setSearch(e.target.value.toUpperCase())
                  setShow(true)
                  refetch({
                    where: isAddress(e.target.value)
                      ? {
                          id: e.target.value,
                        }
                      : {
                          symbol: e.target.value.toUpperCase(),
                        },
                  })
                }}
              />
              {show && (
                <SearchResContainer>
                  {tokens.map((token) => (
                    <SearchResItem
                      key={token.id}
                      onClick={() => {
                        priceRefetch({
                          first: 100,
                          orderDirection: 'asc',
                          where: {
                            token: token.id,
                          },
                        })
                        setShow(false)
                      }}
                    >
                      <h4>{token.symbol}</h4>
                      <p>{token.id}</p>
                    </SearchResItem>
                  ))}
                </SearchResContainer>
              )}
            </InputWrapper>
            {loading && (
              <LoaderContainer>
                <Loader size="25px" />
              </LoaderContainer>
            )}
            {!loading && data && (
              <>
                <HeadingContainer>
                  <TokenLogoContainer>
                    <TokenLogo
                      src={`${SWAP_API}/images/${
                        priceGraphData?.tokenDayDatas[priceGraphData?.tokenDayDatas?.length - 1]?.token?.id
                      }.png`}
                      alt={priceGraphData?.tokenDayDatas[priceGraphData?.tokenDayDatas?.length - 1]?.token?.symbol}
                    />
                    <TokenLogo src={`${SWAP_API}/images/${data.token0.id}.png`} alt={data.token0.symbol} />
                  </TokenLogoContainer>
                  <StyledHeading>
                    {priceGraphData?.tokenDayDatas[priceGraphData?.tokenDayDatas?.length - 1]?.token?.symbol}/
                    {data.token0.symbol}
                  </StyledHeading>
                </HeadingContainer>

                <PriceHeadingContainer>
                  <PriceHeading>
                    ${' '}
                    {parseFloat(
                      priceGraphData?.tokenDayDatas[priceGraphData?.tokenDayDatas?.length - 1]?.priceUSD
                    ).toFixed(8)}
                  </PriceHeading>
                </PriceHeadingContainer>
              </>
            )}
          </div>
          <ChartContainerDiv id="chartContainer" />
        </CardBody>
      </BodyWrapper>
    </ContainerExtended>
  )
}
