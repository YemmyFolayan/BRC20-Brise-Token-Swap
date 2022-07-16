/* eslint-disable */
import React from 'react'

interface FormComponentProps {
  handleChange: (params: any) => any
  data: { router_rate: string; listing_rate: string }
}

export default function SwapInfo({ handleChange, data }: FormComponentProps) {
  const { router_rate, listing_rate } = data

  return (
    <>
      <div className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="inputRouterRate" className="form-label">
            Enter the percentage of raised funds that should be allocat ed to Liquidity on SphynxSwap (Min 0%, Max 100%,
            We recommend &gt; 70%)
          </label>
          <div className="row">
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputRouterRate"
                value={router_rate}
                onChange={handleChange('router_rate')}
              />{' '}
            </div>
            <div className="col-sm-2 d-flex align-items-center justify-content-start">%</div>
          </div>
        </div>

        <div className="col-md-12 mb-3">
          <label htmlFor="inputListingRate" className="form-label">
            Enter the SphynxSwap listing price: (If I buy 1 BRISE worth on Swap how many tokens do I get? Usually this
            amount is lower than presale rate to allow for a higher listing price on Swap)
          </label>
          <div className="row">
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="inputListingRate"
                value={listing_rate}
                onChange={handleChange('listing_rate')}
              />{' '}
            </div>
            <div className="col-sm-4 d-flex align-items-center justify-content-start">(Per BRISE)</div>
          </div>
        </div>
      </div>
    </>
  )
}
