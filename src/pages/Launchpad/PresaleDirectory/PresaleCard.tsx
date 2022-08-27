/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Badge } from 'react-bootstrap'
import { Button } from '@evofinance9/uikit'

import moment from 'moment'
import { SocialIcon } from 'react-social-icons'

import { useDateTimeContract } from 'hooks/useContract'
import getUnixTimestamp from 'utils/getUnixTimestamp'
import { getAllPresale } from './apicalls'

import { FaLock, FaClock, FaArrowRight, FaArrowAltCircleRight, FaArrowCircleRight } from 'react-icons/fa'
import { MdLockClock } from 'react-icons/md'

import './style.css'
import { StyledCard, StyledCardBody } from './styleds'


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
    token_symbol,
    start_time,
    liquidity,
    end_time,
    lock_time,
    sale_id,
    router_rate,
    website_link,
    github_link,
    twitter_link,
    reddit_link,
    telegram_link,
  } = data

  return (
    <StyledCard>
      <StyledCardBody>
        <div className="d-flex justify-content-between align-items-center">
          <div className="presale__logo">
            <img src={logo_link} alt={token_name} className="rounded" />
          </div>

          <div className="p-2">
            <div className="d-flex justify-content-between align-items-center">
              <Card.Title className="mb-2 token__symbol">{token_symbol}</Card.Title>

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

            <Card.Title className="mb-2 token__name">{token_name}</Card.Title>
            <div className="social__icons__container ">
              <SocialIcon url={twitter_link} network="twitter" fgColor="#fff" style={{ height: 25, width: 25 }} />
              <SocialIcon url={reddit_link} network="reddit" fgColor="#fff" style={{ height: 25, width: 25 }} />
              <SocialIcon url={github_link} network="github" fgColor="#fff" style={{ height: 25, width: 25 }} />
              <SocialIcon url={telegram_link} network="telegram" fgColor="#fff" style={{ height: 25, width: 25 }} />
              <SocialIcon url={website_link} network="dribbble" fgColor="#fff" style={{ height: 25, width: 25 }} />
            </div>
          </div>
        </div>

        {/* check this */}
        {/* <div className="my-3">
            <Card.Text className="mb-2">Progress (45.00%)</Card.Text>
            <ProgressBar variant="success" now={40} className="presale__progress" />
          </div> */}

        <div>
          <div className="d-flex justify-content-between">
            <Card.Text className="mb-2 d-flex align-items-center custom-gap-2">
              <FaLock fontSize="1rem" /> <span className="custom-font ml-1">Liquidity Lock :</span>
            </Card.Text>
            <Card.Text className="mb-2 custom-font">{router_rate || 0}% </Card.Text>
          </div>

          <div className="d-flex justify-content-between">
            <Card.Text className="mb-2 d-flex align-items-center custom-gap-2">
              <MdLockClock fontSize="1.3rem" /> <span className="custom-font">Lock Time:</span>
            </Card.Text>
            <Card.Text className="mb-2 custom-font">{moment(lock_time).format('YYYY-MM-DD H:mm')}</Card.Text>
          </div>

          <div className="d-flex justify-content-between">
            <Card.Text className="mb-2 d-flex align-items-center custom-gap-2">
              <FaClock fontSize="1rem" /> <span className="custom-font ml-1">Sale Starts On:</span>
            </Card.Text>
            <Card.Text className="mb-2 custom-font">{moment(start_time).format('YYYY-MM-DD H:mm')}</Card.Text>
          </div>
        </div>

        <div className=" mt-3">
          <Link to={`/presale/${sale_id}`}>
            <Button scale="md" variant="secondary" width="100%">
              View Pool <FaArrowRight className="ml-2" fontSize="0.8rem" />
            </Button>
          </Link>
        </div>

        {/* <div className="d-flex justify-content-between mt-3">
            <div className="d-flex flex-column">
              <Card.Text className="mb-2 presale__text custom-font">Sale Starts On:</Card.Text>
              <Card.Text className="mb-2 custom-font">{moment(start_time).format('MMM Do YYYY')}</Card.Text>
            </div>
            <div>
              <Link to={`/presale/${sale_id}`}>
                <Button scale="md" variant="secondary">
                  View Pool <FaArrowCircleRight className='ml-2' /> 
                </Button>
              </Link>
            </div>
          </div> */}
      </StyledCardBody>
    </StyledCard>
  )
}
