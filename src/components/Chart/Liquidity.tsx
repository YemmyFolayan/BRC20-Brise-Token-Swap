import React, { useEffect, useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const ChartContainer = styled.div`
  height: 400px;
  margin-top: 1rem;
`

const DAY_UPDATE_QUERY = gql`
  {
    uniswapDayDatas {
      date
      totalLiquidityUSD
    }
  }
`

const Liquidity = () => {
  const { data: graphData } = useQuery(DAY_UPDATE_QUERY)

  const [data, setData] = useState([])

  useEffect(() => {
    if (!graphData) return
    const { uniswapDayDatas } = graphData
    const formattedData = uniswapDayDatas.map((uniswapDayData) => ({
      ...uniswapDayData,
      liquidity: Math.floor(Math.random() * (4000 - 1000 + 1) + 1000),
      date: moment.unix(uniswapDayData.date).format('DD MMM'),
    }))
    setData(formattedData)
  }, [graphData])

  return (
    <ChartContainer>
      {data && (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis dataKey="date" strokeWidth={0} />
            <YAxis strokeWidth={0} />
            <Tooltip />
            <Area type="monotone" dataKey="liquidity" stroke="#9a6aff" fill="#aa85f6" />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  )
}

export default Liquidity
