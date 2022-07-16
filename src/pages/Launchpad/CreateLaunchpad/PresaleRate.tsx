/* eslint-disable */
import React from 'react'

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
    <>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="inputSoftCap" className="form-label">
            Soft Cap *(BRISE)
          </label>
          <input
            type="text"
            className="form-control"
            id="inputSoftCap"
            value={soft_cap}
            onChange={handleChange('soft_cap')}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="inputHardCap" className="form-label">
            Hard Cap *(BRISE)
          </label>
          <input
            type="text"
            className="form-control"
            id="inputHardCap"
            value={hard_cap}
            onChange={handleChange('hard_cap')}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="inputFirstTier" className="form-label">
            Tier 1 *(Per BRISE)
          </label>
          <input
            type="text"
            className="form-control"
            id="inputFirstTier"
            value={tier1}
            onChange={handleChange('tier1')}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="inputSecondTier" className="form-label">
            Tier 2 *(Per BRISE)
          </label>
          <input
            type="text"
            className="form-control"
            id="inputSecondTier"
            value={tier2}
            onChange={handleChange('tier2')}
          />
        </div>

        <div className="col-md-12 mb-3">
          <label htmlFor="inputPublicTier" className="form-label">
            Public *(Per BRISE)
          </label>
          <input
            type="text"
            className="form-control"
            id="inputPublicTier"
            value={tier3}
            onChange={handleChange('tier3')}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="inputMinBuy" className="form-label">
            Min Buy *(Per BRISE)
          </label>
          <input
            type="text"
            className="form-control"
            id="inputMinBuy"
            value={min_buy}
            onChange={handleChange('min_buy')}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="inputMaxBuy" className="form-label">
            Max Buy *(Per BRISE)
          </label>
          <input
            type="text"
            className="form-control"
            id="inputMaxBuy"
            value={max_buy}
            onChange={handleChange('max_buy')}
          />
        </div>
      </div>
    </>
  )
}
