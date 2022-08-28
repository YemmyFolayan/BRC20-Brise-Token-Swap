/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Badge, ProgressBar } from 'react-bootstrap'
import { Button } from '@evofinance9/uikit'

import moment from 'moment'
import { SocialIcon } from 'react-social-icons'

import { useDateTimeContract } from 'hooks/useContract'
import getUnixTimestamp from 'utils/getUnixTimestamp'
import { getAllAirdrop } from './apicalls'
import { StyledCard, StyledCardBody } from './styleds'

import './style.css'

import { FaLock, FaClock, FaArrowRight } from 'react-icons/fa'
import { MdLockClock } from 'react-icons/md'

interface AirdropCardProps {
  data: {
    chain_id: string
    _id: string
    owner_address: string
    token_address: string
    token_name: string
    token_symbol: string
    token_decimal: string
    title: string
    addresses_to: string[]
    amounts_to: string[]
    start_time: string
    logo_url: string
    website_url: string
    github_url: string
    twitter_url: string
    reddit_url: string
    telegram_url: string
    discord_url: string
    description: string
  }
}

export default function AirdropCard({ data }: AirdropCardProps) {
  // destructure
  const {
    logo_url,
    website_url,
    github_url,
    twitter_url,
    reddit_url,
    telegram_url,
    discord_url,
    title,
    token_symbol,
    token_name,
    description,
    addresses_to,
    amounts_to,
    _id,
  } = data

  return (
    <StyledCard>
      <StyledCardBody>
        <div className="d-flex justify-content-center align-items-center">
          <div className="presale__logo p-2">
            <img src={logo_url} alt={token_name} className="rounded" />
          </div>

          {/* <div className="p-2">
            <div className="d-flex justify-content-between align-items-center">
              

              <p>
                {moment(end_time).format('X') < moment().format('X') ? (
                  <Badge pill bg="danger" className="custom-font">
                    Ended
                  </Badge>
                ) : (
                  <Badge pill bg="success" className="custom-font">
                    Live
                  </Badge>
                )}
              </p>
            </div>

            <div className="social__icons__container ">
              <SocialIcon url={twitter_url} network="twitter" fgColor="#fff" style={{ height: 25, width: 25 }} />
              <SocialIcon url={reddit_url} network="reddit" fgColor="#fff" style={{ height: 25, width: 25 }} />
              <SocialIcon url={github_url} network="github" fgColor="#fff" style={{ height: 25, width: 25 }} />
              <SocialIcon url={telegram_url} network="telegram" fgColor="#fff" style={{ height: 25, width: 25 }} />
              <SocialIcon url={website_url} network="dribbble" fgColor="#fff" style={{ height: 25, width: 25 }} />
            </div>
          </div> */}
        </div>
        <Card.Title className="p-3 token__symbol">{title}</Card.Title>

        <div className="d-flex justify-content-between">
          <Card.Text className="mb-2 custom-font">Token</Card.Text>
          <Card.Text className="mb-2 custom-font"> {token_symbol} </Card.Text>
        </div>

        <div className="d-flex justify-content-between">
          <Card.Text className="mb-2 custom-font">Total Tokens</Card.Text>
          <Card.Text className="mb-2 custom-font">
            {amounts_to.reduce((a, b) => parseFloat(a.toString()) + parseFloat(b), 0).toFixed(2)}
          </Card.Text>
        </div>

        <div className="d-flex justify-content-between">
          <Card.Text className="mb-2 custom-font">Participants</Card.Text>
          <Card.Text className="mb-2 custom-font">{addresses_to.length}</Card.Text>
        </div>

        <div className='mt-3'>
          <Link to={`/airdrop/${_id}`}>
            <Button scale="md" variant="secondary" width="100%">
              View Pool <FaArrowRight className="ml-2" fontSize="0.8rem" />
            </Button>
          </Link>
        </div>
      </StyledCardBody>
    </StyledCard>
  )
}
