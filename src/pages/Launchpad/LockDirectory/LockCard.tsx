/* eslint-disable */
import React from 'react'
import { Card, Badge, Button as BSButton, ProgressBar, Table } from 'react-bootstrap'
import { Button } from '@evofinance9/uikit'

import moment from 'moment'

import { Link } from 'react-router-dom'

interface LockCardProps {
  data: {
    chain_id: String
    _id: String
    owner_address: String
    token_address: String
    token_name: String
    token_symbol: String
    token_decimal: Number
    isLPToken: Boolean
    title: String
    amount: Number
    is_another: Boolean
    is_vesting: Boolean
    tge_percent: String
    release_cycle: String
    release_percent: String
    release_date: Date
    tge_date: Date
    description: String
    createdAt: Date
  }
}

export default function LockCard({ data }: LockCardProps) {
  const {
    release_date,
    tge_date,
    description,
    title,
    token_address,
    token_name,
    token_symbol,
    amount,
    _id,
    createdAt,
  } = data

  return (
    <tbody>
      <tr>
        <td>
          {token_name} <br /> {token_symbol}
        </td>
        <td>{amount}</td>
        <td>{amount}</td>
        <td>
          <Link to={`/locks/${token_address}`}>View</Link>
        </td>
      </tr>
    </tbody>
  )
}
