/* eslint-disable */
import React from 'react'
import { DateTimePicker } from '@material-ui/pickers'
import { Input, CardBody } from '@evofinance9/uikit'
import {  TextField, withStyles } from '@material-ui/core'

interface FormComponentProps {
  handleChange: (params1: any, params2: any) => any
  data: { start_time: Date; end_time: Date; tier1_time: Date; tier2_time: Date; lock_time: Date }
}

const CssTextField = withStyles({
  root: {
    '&': {
      border: 'red',
      borderRadius: '16px',
    },
    '& label.Mui-focused': {
      color: '#aaa',
    },

    '& .MuiInputBase-input': {
      color: '#F4EEFF',
      backgroundColor: '#18191A',
      borderRadius: '16px',
      boxShadow: 'inset 0px 2px 2px -1px rgb(74 74 104 / 10%)',
      display: 'block',
      fontSize: '16px',
      height: '48px',
      outline: '0',
      padding: '0 16px',
    },
    '& .MuiInputBase-input:focus': {
      boxShadow: '0px 0px 0px 1px #7645D9,0px 0px 0px 4pxrgba(118,69,217,0.6)',
    },
  },
})(TextField)

export default function Timing({ handleChange, data }: FormComponentProps) {
  const { start_time, end_time, tier1_time, tier2_time, lock_time } = data

  return (
    <CardBody>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="inputTokenAddress" className="form-label mb-2">
            Tier 1 Start Time
          </label>{' '}
          <br />
          <DateTimePicker
            size="small"
            color="primary"
            inputVariant="outlined"
            value={tier1_time}
            fullWidth
            onChange={(date) => {
              handleChange('tier1_time', date)
            }}
            TextFieldComponent={(params) => {
              return <CssTextField {...params} />
            }}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="inputTokenAddress" className="form-label mb-2">
            Tier 2 Start Time
          </label>{' '}
          <br />
          <DateTimePicker
            size="small"
            color="primary"
            fullWidth
            inputVariant="outlined"
            value={tier2_time}
            onChange={(date) => {
              handleChange('tier2_time', date)
            }}
            TextFieldComponent={(params) => {
              return <CssTextField {...params} />
            }}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="inputTokenAddress" className="form-label mb-2">
            Public Start Time
          </label>{' '}
          <br />
          <DateTimePicker
            size="small"
            color="primary"
            inputVariant="outlined"
            value={start_time}
            fullWidth
            onChange={(date) => {
              handleChange('start_time', date)
            }}
            TextFieldComponent={(params) => {
              return <CssTextField {...params} />
            }}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="inputTokenAddress" className="form-label mb-2">
            Presale End Time
          </label>{' '}
          <br />
          <DateTimePicker
            size="small"
            color="primary"
            fullWidth
            inputVariant="outlined"
            value={end_time}
            onChange={(date) => {
              handleChange('end_time', date)
            }}
            TextFieldComponent={(params) => {
              return <CssTextField {...params} />
            }}
          />
        </div>
        <div className="col-md-12 mb-3">
          <label htmlFor="inputTokenAddress" className="form-label mb-2">
            Liquidity Lock Time
          </label>{' '}
          <br />
          <DateTimePicker
            size="small"
            color="primary"
            inputVariant="outlined"
            fullWidth
            value={lock_time}
            onChange={(date) => {
              handleChange('lock_time', date)
            }}
            TextFieldComponent={(params) => {
              return <CssTextField {...params} />
            }}
          />
        </div>
      </div>
    </CardBody>
  )
}
