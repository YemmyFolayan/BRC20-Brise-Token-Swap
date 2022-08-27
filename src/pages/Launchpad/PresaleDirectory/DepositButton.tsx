import React from 'react'
import { BigintIsh } from '@evofinance9/sdk'

import { useToken } from 'hooks/Tokens'

import ApproveDeposit from './ApproveDeposit'

interface DepositButtonComponentProps {
  tokenAddress: string
  depositAmount: BigintIsh
  depositeToken: () => Promise<void>
}

const DepositButton = ({ tokenAddress, depositAmount, depositeToken }: DepositButtonComponentProps) => {
  const token = useToken(tokenAddress)

  return <div>{token && <ApproveDeposit token={token} depositAmount={depositAmount}  depositeToken={depositeToken} />}</div>
}

export default DepositButton
