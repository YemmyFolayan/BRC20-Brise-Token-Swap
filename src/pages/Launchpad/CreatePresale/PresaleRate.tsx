/* eslint-disable */
import React from 'react'
import { CardBody, Input } from '@evofinance9/uikit'

interface FormComponentProps {
  handleChange: (params: any) => any
  data: {
    soft_cap: string
    hard_cap: string
    tier1: string
    tier2: string
    tier3: string
    min_buy: string
    max_buy: string
  }
}

export default function PresaleRate({ handleChange, data }: FormComponentProps) {
  const { soft_cap, hard_cap, tier1, tier2, tier3, min_buy, max_buy } = data

  return (
    <CardBody>
      <div className="row">
        <div className="col-md-6 mb-3">
          <Input
            placeholder="Soft Cap *(BRISE)"
            className="mt-3"
            scale="lg"
            value={soft_cap}
            onChange={handleChange('soft_cap')}
          />
        </div>

        <div className="col-md-6 mb-3">
          <Input
            placeholder="Hard Cap *(BRISE)"
            className="mt-3"
            scale="lg"
            value={hard_cap}
            onChange={handleChange('hard_cap')}
          />
        </div>

        <div className="col-md-6 mb-3">
          <Input
            placeholder="Tier 1 *(Per BRISE)"
            className="mt-3"
            scale="lg"
            value={tier1}
            onChange={handleChange('tier1')}
          />
        </div>

        <div className="col-md-6 mb-3">
          <Input
            placeholder="Tier 2 *(Per BRISE)"
            className="mt-3"
            scale="lg"
            value={tier2}
            onChange={handleChange('tier2')}
          />
        </div>

        <div className="col-md-12 mb-3">
          <Input
            placeholder="Public *(Per BRISE)"
            className="mt-3"
            scale="lg"
            value={tier3}
            onChange={handleChange('tier3')}
          />
        </div>

        <div className="col-md-6 mb-3">
          <Input
            placeholder="Min Buy *(Per BRISE)"
            className="mt-3"
            scale="lg"
            value={min_buy}
            onChange={handleChange('min_buy')}
          />
        </div>

        <div className="col-md-6 mb-3">
          <Input
            placeholder="Max Buy *(Per BRISE)"
            className="mt-3"
            scale="lg"
            value={max_buy}
            onChange={handleChange('max_buy')}
          />
        </div>
      </div>
    </CardBody>
  )
}
