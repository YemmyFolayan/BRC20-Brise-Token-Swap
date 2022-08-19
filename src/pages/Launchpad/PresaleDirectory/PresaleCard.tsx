/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Badge, ProgressBar } from 'react-bootstrap'
import { Button } from '@evofinance9/uikit'

import moment from 'moment'

import { useDateTimeContract } from 'hooks/useContract'
import getUnixTimestamp from 'utils/getUnixTimestamp'
import { getAllPresale } from './apicalls'

interface PresaleCardProps {
  data: {
    chain_id: string
    sale_id: string
    owner_address: string
    token_address: string
    token_name: string
    token_symbol: string
    token_decimal: number
    tier1: number
    tier2: number
    tier3: number
    soft_cap: number
    hard_cap: number
    min_buy: number
    max_buy: number
    router_rate: number
    default_router_rate: number
    listing_rate: number
    logo_link: string
    website_link: string
    github_link: string
    twitter_link: string
    reddit_link: string
    telegram_link: string
    project_dec: string
    upstring_dec: string
    token_level: number
    start_time: string
    end_time: string
    tier1_time: string
    tier2_time: string
    lock_time: string
    liquidity: number
    contribution: number
    liquidity_lock: boolean
    certik_audit: boolean
    doxxed_team: boolean
    utility: boolean
    kyc: boolean
    other_token: string
    other_symbol: string
    is_other: boolean
    is_brise: boolean
    is_close: boolean
  }
}

export default function PresaleCard({ data }: PresaleCardProps) {
  // destructure
  const {
    logo_link,
    token_name,
    certik_audit,
    doxxed_team,
    kyc,
    utility,
    project_dec,
    start_time,
    liquidity,
    lock_time,
    sale_id,
  } = data

  return (
    <div className="col-md-4 justify-content-center my-3">
      <Card style={{ width: '20rem', margin: '0 auto' }} className="presale__card" text="light">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div className="presale__logo">
              <img src={logo_link} alt={token_name} className="rounded" />
            </div>

            <div className="presale__kyc__info px-3">
              {certik_audit && (
                <Badge bg="primary" className="mx-1 my-1">
                  Audit
                </Badge>
              )}
              {doxxed_team && (
                <Badge bg="danger" className="mx-1 my-1">
                  Doxxed
                </Badge>
              )}

              {kyc && (
                <Badge bg="success" className="mx-1 my-1">
                  KYC
                </Badge>
              )}

              {utility && (
                <Badge bg="secondary" className="mx-1 my-1">
                  Utility
                </Badge>
              )}
            </div>
          </div>

          <div className="my-3">
            <Card.Title className="mb-2">{token_name}</Card.Title>
            <Card.Subtitle className=" text-muted">{project_dec}</Card.Subtitle>
          </div>

          {/* check this */}
          <div className="my-3">
            <Card.Text className="mb-2">Progress (45.00%)</Card.Text>
            <ProgressBar variant="success" now={40} className="presale__progress" />
          </div>

          <div className="d-flex justify-content-between">
            <Card.Text className="mb-2">Liquidity %:</Card.Text>
            <Card.Text className="mb-2">{liquidity !== null ? liquidity : 0} % </Card.Text>
          </div>

          <div className="d-flex justify-content-between">
            <Card.Text className="mb-2">Lock Time:</Card.Text>
            <Card.Text className="mb-2">{moment(lock_time).format('MMM Do YYYY, h:mm:ss a')}</Card.Text>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <div className="d-flex flex-column">
              <Card.Text className="mb-2 presale__text">Sale Starts On:</Card.Text>
              <Card.Text className="mb-2">{moment(start_time).format('MMM Do YYYY')}</Card.Text>
            </div>
            <div>
              <Link to={`/presale/${sale_id}`}>
                <Button scale="md" variant="secondary">
                  View Pool
                </Button>
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}
