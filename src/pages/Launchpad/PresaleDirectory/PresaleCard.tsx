/* eslint-disable */
import React from 'react'
import { Card, Badge, Button as BSButton, ProgressBar } from 'react-bootstrap'
import { Button } from '@evofinance9/uikit'

export default function PresaleCard () {
  return (
    <div className="col-md-4 justify-content-center my-3">
            <Card style={{ width: '20rem', margin: "0 auto"}} className="presale__card"  text="light">
              <Card.Body>
                <div className="d-flex justify-content-between">
                  <div className="presale__logo">
                    <img
                      src="https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/USDTBRISE2.png"
                      alt="Presale Logo"
                      className="rounded"
                    />
                  </div>

                  <div className="presale__kyc__info px-3">
                    <Badge bg="primary" className="mx-1 my-1">
                      Audit
                    </Badge>
                    <Badge bg="danger" className="mx-1 my-1">
                      Doxxed
                    </Badge>
                    <Badge bg="success" className="mx-1 my-1">
                      KYC
                    </Badge>
                    <Badge bg="secondary" className="mx-1 my-1">
                      Utility
                    </Badge>
                  </div>
                </div>

                <div className="my-3">
                  <Card.Title className="mb-2">USDT</Card.Title>
                  <Card.Subtitle className=" text-muted">Tether USD</Card.Subtitle>
                </div>

                <div className="my-3">
                  <Card.Text className="mb-2">Progress (45.00%)</Card.Text>
                  <ProgressBar variant="success" now={40} className="presale__progress" />
                </div>

                <div className="d-flex justify-content-between">
                  <Card.Text className="mb-2">Liquidity %:</Card.Text>
                  <Card.Text className="mb-2">51%</Card.Text>
                </div>

                <div className="d-flex justify-content-between">
                  <Card.Text className="mb-2">Lockup Time:</Card.Text>
                  <Card.Text className="mb-2">1825 days</Card.Text>
                </div>

                <div className="d-flex justify-content-between mt-3">
                  <div className="d-flex flex-column">
                    <Card.Text className="mb-2 presale__text">Sale Starts In:</Card.Text>
                    <Card.Text className="mb-2">02:14:19:00</Card.Text>
                  </div>
                  <div>
                    <Button scale="md" variant="secondary">
                      View Pool
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
  )
}