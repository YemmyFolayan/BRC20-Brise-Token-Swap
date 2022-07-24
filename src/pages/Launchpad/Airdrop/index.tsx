/* eslint-disable */
import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import { Button, CardBody, Input } from '@evofinance9/uikit'

import { useActiveWeb3React } from 'hooks'

import Container from 'components/Container'
import TransactionConfirmationModal from 'components/TransactionConfirmationModal'

import { AppBodyExtended } from 'pages/AppBody'

export default function Airdrop() {
  const { account, chainId, library } = useActiveWeb3React()

  const [txHash, setTxHash] = useState<string>('')
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)

  const [formData, setFormData] = useState({
    chain_id: '32520',
    owner_address: '',
    token_address: '',
    token_name: '',
    token_symbol: '',
    token_decimal: '',
    logo_url: '',
    website_url: '',
    twitter_url: '',
    instagram_url: '',
    telegram_url: '',
    discord_url: '',
    reddit_url: '',
    github_url: '',
    title: '',
    description: '',
  })

  // destructure
  const {
    token_address,
    token_name,
    token_decimal,
    token_symbol,
    logo_url,
    website_url,
    title,
    twitter_url,
    instagram_url,
    telegram_url,
    discord_url,
    reddit_url,
    github_url,
    description,
  } = formData

  const handleDismissConfirmation = () => {
    setShowConfirm(false)
    setTxHash('')
  }

  const handleChange = (name) => (event) => {
    const value = event.target.value
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // handle api call here
  }

  return (
    <>
      <Container>
        <AppBodyExtended>
          {txHash && (
            <TransactionConfirmationModal
              isOpen={true}
              onDismiss={handleDismissConfirmation}
              attemptingTxn={false}
              hash={txHash}
              content={() => <></>}
              pendingText={''}
            />
          )}

          <div className=" text-white mb-5  ">
            <CardBody>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <Input
                    placeholder="Token Address"
                    className="mt-3"
                    scale="lg"
                    value={token_address}
                    onChange={handleChange('token_address')}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <Input
                    placeholder="Token Name"
                    scale="lg"
                    className="mt-3"
                    value={token_name}
                    onChange={handleChange('token_name')}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <Input
                    placeholder="Token Symbol"
                    scale="lg"
                    className="mt-3"
                    value={token_symbol}
                    onChange={handleChange('token_symbol')}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <Input
                    placeholder="Token Decimal"
                    className="mt-3"
                    scale="lg"
                    value={token_decimal}
                    onChange={handleChange('token_decimal')}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <Input
                    placeholder="Airdrop Title"
                    className="mt-3"
                    scale="lg"
                    value={title}
                    onChange={handleChange('title')}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <Input
                    placeholder="Logo URL"
                    scale="lg"
                    className="mt-3"
                    value={logo_url}
                    onChange={handleChange('logo_url')}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <Input
                    placeholder="Website"
                    className="mt-3"
                    scale="lg"
                    value={website_url}
                    onChange={handleChange('website_url')}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <Input
                    placeholder="Twiiter URL"
                    className="mt-3"
                    scale="lg"
                    value={twitter_url}
                    onChange={handleChange('twitter_url')}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <Input
                    placeholder="Instagram URL"
                    className="mt-3"
                    scale="lg"
                    value={instagram_url}
                    onChange={handleChange('instagram_url')}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <Input
                    placeholder="Telegram URL"
                    className="mt-3"
                    scale="lg"
                    value={telegram_url}
                    onChange={handleChange('telegram_url')}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <Input
                    placeholder="Discord URL"
                    className="mt-3"
                    scale="lg"
                    value={discord_url}
                    onChange={handleChange('discord_url')}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <Input
                    placeholder="Reddit URL"
                    className="mt-3"
                    scale="lg"
                    value={reddit_url}
                    onChange={handleChange('reddit_url')}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <Input
                    placeholder="Github URL"
                    className="mt-3"
                    scale="lg"
                    value={github_url}
                    onChange={handleChange('github_url')}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <Input
                    placeholder="Description"
                    className="mt-3"
                    scale="lg"
                    value={description}
                    onChange={handleChange('description')}
                  />
                </div>
              </div>
            </CardBody>

            <div className="d-flex justify-content-center gap-3 mt-3">
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </AppBodyExtended>
      </Container>
      <div className="mt-5"> </div>
    </>
  )
}
