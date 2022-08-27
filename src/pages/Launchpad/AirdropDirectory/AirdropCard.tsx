/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Badge, ProgressBar } from 'react-bootstrap'
import { Button } from '@evofinance9/uikit'

import moment from 'moment'

import { useDateTimeContract } from 'hooks/useContract'
import getUnixTimestamp from 'utils/getUnixTimestamp'
import { getAllAirdrop } from './apicalls'

interface AirdropCardProps {
  data: {
    chain_id: string
    _id: string
    owner_address: string
    token_address: string
    token_name: string
    title: string
    addresses_to: string
    amounts_to: string
    start_time: string
    logo_link: string
    website_link: string
    description: string
  }
}

export default function AirdropCard({ data }: AirdropCardProps) {
  // destructure
  const { logo_link, title, token_name, description, addresses_to, amounts_to, _id } = data

  let arr = 0
  for (let i = 0; i < amounts_to.length; i++) {
    arr += parseFloat(amounts_to[i])
  }

  return (
    <div className="col-md-4 justify-content-center my-3">
      <Card style={{ width: '20rem', margin: '0 auto' }} className="airdrop__card" text="light">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div className="airdrop__logo">
              <img src={logo_link} alt={title} className="rounded" />
            </div>
          </div>

          <div className="my-3">
            <Card.Title className="mb-2">{title}</Card.Title>
            <Card.Subtitle className=" text-muted">{description}</Card.Subtitle>
          </div>

          <div className="d-flex justify-content-between">
            <Card.Text className="mb-2">Token</Card.Text>
            <Card.Text className="mb-2"> {token_name} </Card.Text>
          </div>

          <div className="d-flex justify-content-between">
            <Card.Text className="mb-2">Total Tokens:</Card.Text>
            <Card.Text className="mb-2">{arr}</Card.Text>
          </div>

          <div className="d-flex justify-content-between">
            <Card.Text className="mb-2">Participants:</Card.Text>
            <Card.Text className="mb-2">{addresses_to.length}</Card.Text>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <div>
              <Link to={`/airdrop/${_id}`}>
                <Button scale="md" variant="secondary">
                  View Airdrop
                </Button>
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}
