/* eslint-disable */
import React from 'react'
import { Card, Badge, Button as BSButton, ProgressBar, Table } from 'react-bootstrap'
import { Button } from '@evofinance9/uikit'

import moment from 'moment'

import { Link } from 'react-router-dom'

interface TokenLocksProps {
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

export default function TokenLocks({ data }: TokenLocksProps) {
  const { release_date, tge_date, release_cycle, tge_percent, release_percent, owner_address, amount, _id } = data

  return (
    <tbody>
      <tr>
        <td> {owner_address} </td>
        <td> {amount} </td>
        <td> {release_cycle} </td>
        <td> {release_percent}</td>
        <td> {tge_percent} </td>
        <td>
          {' '}
          {release_date !== null
            ? moment(release_date).format('dddd, MMMM Do YYYY, h:mm a')
            : moment(tge_date).format('dddd, MMMM Do YYYY, h:mm a')}{' '}
        </td>
        <td>
          <Link to={`/lock/${_id}`}>View</Link>
        </td>
      </tr>
    </tbody>
  )
}
