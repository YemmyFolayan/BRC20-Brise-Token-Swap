/* eslint-disable */
import React from 'react'

interface FormComponentProps {
  handleChange: (params: any) => any
  data: { token_address: string; token_name: string; token_symbol: string; token_decimal: string }
}

export default function TokenInfo({ handleChange, data }: FormComponentProps) {
  const { token_address, token_name, token_symbol, token_decimal } = data

  return (
    <>
      <div className="mb-3">
        <label htmlFor="inputTokenAddress" className="form-label">
          Token address
        </label>
        <input
          type="text"
          className="form-control"
          id="inputTokenAddress"
          value={token_address}
          onChange={handleChange('token_address')}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputTokenName" className="form-label">
          Token Name
        </label>
        <input
          type="text"
          className="form-control"
          id="inputTokenName"
          value={token_name}
          onChange={handleChange('token_name')}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputTokenSymbol" className="form-label">
          Token Symbol
        </label>
        <input
          type="text"
          className="form-control"
          id="inputTokenSymbol"
          value={token_symbol}
          onChange={handleChange('token_symbol')}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputTokenDecimals" className="form-label">
          Token Decimal
        </label>
        <input
          type="text"
          className="form-control"
          id="inputTokenDecimals"
          value={token_decimal}
          onChange={handleChange('token_decimal')}
        />
      </div>
    </>
  )
}
