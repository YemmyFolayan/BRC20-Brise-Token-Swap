/* eslint-disable */
import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import styled from 'styled-components'
import { ethers, BigNumber as BN } from 'ethers'
import { TransactionResponse } from '@ethersproject/providers'
import { BigNumber } from '@ethersproject/bignumber'
import { Button, CardHeader, CardBody, Input } from '@evofinance9/uikit'

import { useActiveWeb3React } from 'hooks'
import { getTokenCreatorContract, bnMultiplyByDecimal } from 'utils'

import Container from 'components/Container'
import TransactionConfirmationModal from 'components/TransactionConfirmationModal'

import { AppBodyExtended } from 'pages/AppBody'

const List = styled.div`
  margin: 0;
  padding: 1rem;
`

const ListItem = styled.p`
  padding: 0.5rem;
`

const CreateToken = () => {
  const { account, chainId, library } = useActiveWeb3React()

  const [txHash, setTxHash] = useState<string>('')
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [currentFee, setCurrentFee] = useState('0')
  const [tokenAddress, setTokenAddress] = useState<string>('')

  const [formData, setFormData] = useState({
    token_name: '',
    token_symbol: '',
    token_decimal: '',
    total_supply: '',
  })

  const { token_name, token_symbol, token_decimal, total_supply } = formData

  const handleChange = (name) => (event) => {
    const value = event.target.value
    setFormData({ ...formData, [name]: value })
  }

  const handleDismissConfirmation = () => {
    setShowConfirm(false)
    setTxHash('')
  }

  const createToken = async () => {
    if (!chainId || !library || !account) return
    const tokenCreator = getTokenCreatorContract(chainId, library, account)

    const payload = [
      token_name,
      token_symbol,
      token_decimal,
      ethers.utils.parseUnits(total_supply, parseInt(token_decimal)).toString()
    ]

    const method: (...args: any) => Promise<TransactionResponse> = tokenCreator!.createToken
    const args: Array<string | number | boolean> = payload
    const value: BigNumber = ethers.utils.parseEther(`${currentFee}`)

    setAttemptingTxn(true)
    await method(...args, {
      value: value,
    })
      .then(async (response) => {
        setAttemptingTxn(false)
        setTxHash(response.hash)
        const txReceipt: any = await response.wait()
        setTokenAddress(txReceipt?.events[2]?.args?.token)
        setSuccess(true)
      })
      .catch((e) => {
        setAttemptingTxn(false)
        // we only care if the error is something _other_ than the user rejected the tx
        if (e?.code !== 4001) {
          console.error(e)
          setSuccess(false)
          alert(e.message)
        }
      })
  }

  useEffect(() => {
    if (!chainId || !library || !account) return
    const fetch = async () => {
      const tokenCreator = getTokenCreatorContract(chainId, library, account)
      const fee = await tokenCreator?.callStatic.fee()
      setCurrentFee(ethers.utils.formatEther(fee.toString()))
    }
    fetch()
  }, [chainId, library, account])

  return (
    <>
      <Container>
        {txHash && (
          <TransactionConfirmationModal
            isOpen={true}
            onDismiss={handleDismissConfirmation}
            attemptingTxn={false}
            hash={txHash}
            content={() => (
              <>
                <p>Token Address 0xEb274651Af1Bffb1539d700DAF0BC5035062Fd8B</p>
              </>
            )}
            pendingText={''}
          />
        )}
        <AppBodyExtended>
          <CardHeader>Create BRC20 Token</CardHeader>
          <CardBody>
            {success ? (
              <div className="row">
                <div className="col-md-6 mb-3">
                  <List>
                    <ListItem>Token: {tokenAddress}</ListItem>
                    <ListItem>Name: {token_name}</ListItem>
                    <ListItem>Symbol: {token_symbol}</ListItem>
                    <ListItem>Decimal: {token_decimal} </ListItem>
                    <ListItem>Total Supply: {total_supply} </ListItem>
                  </List>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-12 mb-3">
                  <Input
                    placeholder="Name"
                    className="mt-3"
                    scale="lg"
                    value={token_name}
                    onChange={handleChange('token_name')}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <Input
                    placeholder="Symbol"
                    className="mt-3"
                    scale="lg"
                    value={token_symbol}
                    onChange={handleChange('token_symbol')}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <Input
                    placeholder="Decimals"
                    className="mt-3"
                    scale="lg"
                    value={token_decimal}
                    onChange={handleChange('token_decimal')}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <Input
                    placeholder="Total supply"
                    className="mt-3"
                    scale="lg"
                    value={total_supply}
                    onChange={handleChange('total_supply')}
                  />
                </div>

                <div className="col-md-12 p-2 mb-3 d-flex justify-content-center">
                  <Button onClick={createToken}>Create Token</Button>
                </div>
              </div>
            )}
          </CardBody>
        </AppBodyExtended>
      </Container>
      <div className="mt-5" />
    </>
  )
}

export default CreateToken
