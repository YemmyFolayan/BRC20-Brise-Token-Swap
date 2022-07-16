/* eslint-disable */
import React from 'react'
import { DateTimePicker } from '@material-ui/pickers'
import { makeStyles, TextField, withStyles } from '@material-ui/core'

interface FormComponentProps {
  handleChange: (params1: any, params2: any) => any
  data: { start_time: Date; end_time: Date; tier1_time: Date; tier2_time: Date; lock_time: Date }
}

const CssTextField = withStyles({
  root: {
    '&': {
      border: 'red',
    },
    '& label.Mui-focused': {
      color: '#aaa',
    },
    '& label': {
      color: '#fff',
      fontSize: '1rem',
    },
    '& .MuiInput-underline:after': {
      borderColor: '#ff9800',
    },
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid #fff !important',
    },
    '& .MuiInputBase-input': {
      color: '#fff',
      fontSize: '14px',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#f9d849',
      },
    },
  },
})(TextField)

export default function Timing({ handleChange, data }: FormComponentProps) {
  const { start_time, end_time, tier1_time, tier2_time, lock_time } = data

  return (
    <>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="inputTokenAddress" className="form-label">
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
          <label htmlFor="inputTokenAddress" className="form-label">
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
          <label htmlFor="inputTokenAddress" className="form-label">
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
          <label htmlFor="inputTokenAddress" className="form-label">
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
          <label htmlFor="inputTokenAddress" className="form-label">
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
    </>
  )
}
