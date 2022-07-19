/* eslint-disable */
import React from 'react'
import { CardBody, Input } from '@evofinance9/uikit'

interface FormComponentProps {
  handleChange: (params: any) => any
  data: { token_address: string; token_name: string; token_symbol: string; token_decimal: string }
}

export default function TokenInfo({ handleChange, data }: FormComponentProps) {
  const { token_address, token_name, token_symbol, token_decimal } = data

  return (
    <CardBody>
      <Input
        placeholder="Token Address"
        className="mt-3"
        value={token_address}
        scale="lg"
        onChange={handleChange('token_address')}
      />
      <Input
        placeholder="Token Name"
        scale="lg"
        className="mt-3"
        value={token_name}
        onChange={handleChange('token_name')}
      />
      <Input
        placeholder="Token Symbol"
        scale="lg"
        className="mt-3"
        value={token_symbol}
        onChange={handleChange('token_symbol')}
      />
      <Input
        placeholder="Token Decimal"
        className="mt-3"
        scale="lg"
        value={token_decimal}
        onChange={handleChange('token_decimal')}
      />
    </CardBody>
  )
}
