import React from 'react'
import styled from 'styled-components'
import millify from 'millify'
import { useQuery, gql } from '@apollo/client'

import { FaTractor, FaChartLine, FaMoneyCheckAlt } from 'react-icons/fa'

import { CgCircleci } from 'react-icons/cg'
import { IoFileTray } from 'react-icons/io5'

import Banner from 'components/Banner'
import Container from 'components/Container'
import Liquidity from 'components/Chart/Liquidity'
import TopTradingAssets from 'components/Dashboard/TopTradingAssets'

const ContainerExtended = styled(Container)`
  display: grid;
  padding: 1rem;
  grid-column-gap: 1rem;
  grid-template-columns: 1fr 3fr;
  grid-auto-rows: 1fr;
  ${({ theme }) => theme.mediaQueries.xs} {
    grid-template-columns: 1fr;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1fr 3fr;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: 1fr 3fr;
  }
`

const Column = styled.div`
  background-color: #0e0e0e;
  color: #fff;
  padding: 1rem;
  margin: 0;
  height: 100%;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const BannerContainer = styled.div`
  padding: 1rem;
  margin-top: 1rem;
`

const BannerWrapper = styled.div`
  margin: 40px 0;
  border-radius: 5px 5px 0px 5px;
  overflow: hidden;
`

const IconGrid = styled.div`
  background-color: #151212;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 1rem;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 1rem;
`

const IconGridRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const IconGridHeader = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
`
const IconGridSub = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #f9d849;
`

const FACTORY_QUERY = gql`
  {
    uniswapFactory(id: "0x456405E3d355ad27010Fd87e3c7cC8a2DcA372fD") {
      totalVolumeUSD
      totalLiquidityUSD
    }

    token(id: "0xc1f9bdd0603665b9ae1e4d56e58240a018596b1a") {
      totalLiquidity
    }
  }
`

const Dashboard = () => {
  const { data } = useQuery(FACTORY_QUERY)

  return (
    <>
      <BannerContainer>
        <BannerWrapper>
          <Banner />
        </BannerWrapper>
      </BannerContainer>
      <ContainerExtended>
        <Column>
          {/* <IconGrid>
          <FaTractor fontSize="3rem" />
          <IconGridRowContainer>
            <IconGridHeader>Farming APY</IconGridHeader>
            <IconGridSub>upto NaN%</IconGridSub>
          </IconGridRowContainer>
        </IconGrid> */}
          <IconGrid>
            <FaChartLine fontSize="3rem" />
            <IconGridRowContainer>
              <IconGridHeader>Total Liquidity</IconGridHeader>
              <IconGridSub>$ {data?.uniswapFactory?.totalLiquidityUSD || `0`} </IconGridSub>
            </IconGridRowContainer>
          </IconGrid>
          <IconGrid>
            <FaMoneyCheckAlt fontSize="3rem" />
            <IconGridRowContainer>
              <IconGridHeader>Trading Fees</IconGridHeader>
              <IconGridSub>$ 0</IconGridSub>
            </IconGridRowContainer>
          </IconGrid>
          <IconGrid>
            <CgCircleci fontSize="3rem" />
            <IconGridRowContainer>
              <IconGridHeader>Cir. Market Cap</IconGridHeader>
              <IconGridSub>$ {data?.uniswapFactory?.totalVolumeUSD || `0`}</IconGridSub>
            </IconGridRowContainer>
          </IconGrid>
          <IconGrid>
            <IoFileTray fontSize="3rem" />
            <IconGridRowContainer>
              <IconGridHeader>Circulating Supply</IconGridHeader>
              <IconGridSub>{millify(parseFloat(data?.token?.totalLiquidity)) || `0`} BTS</IconGridSub>
            </IconGridRowContainer>
          </IconGrid>
        </Column>

        <Column>
          <IconGridHeader>Liquidity</IconGridHeader>

          <Liquidity />
        </Column>
      </ContainerExtended>

      <TopTradingAssets />
    </>
  )
}

export default Dashboard
