import React from 'react'
import styled from 'styled-components'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const ChartContainer = styled.div`
  height: 400px;
  margin-top: 1rem;
`

const Liquidity = () => {
  const data = [
    {
      name: '9 Apr',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: '10 Apr',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: '11 Apr',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: '12 Apr',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: '13 Apr',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: '14 Apr',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: '15 Apr',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ]

  return (
    <ChartContainer>
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
          <XAxis dataKey="name" strokeWidth={0} />
          <YAxis strokeWidth={0} />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#9a6aff" fill="#aa85f6" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default Liquidity
