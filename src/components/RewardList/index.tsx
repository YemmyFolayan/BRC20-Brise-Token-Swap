import React from 'react'
import styled from 'styled-components'
import { Text, Button } from '@evofinance9/uikit'
import { darken } from 'polished'

import { RowBetween, RowFixed } from '../Row'
import Card from '../Card'
import { AutoColumn } from '../Column'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

export const HoverCard = styled(Card)`
  border: 1px solid ${({ theme }) => theme.colors.invertedContrast};
  :hover {
    border: 1px solid ${({ theme }) => darken(0.06, theme.colors.invertedContrast)};
  }
`

const RewardList = ({ idx, tokenAmount, claimReward }: { idx: number; tokenAmount: number; claimReward: (idx: number) => void }) => {
  return (
    <HoverCard>
      <AutoColumn gap="12px">
        <FixedHeightRow style={{ cursor: 'pointer' }}>
          <RowFixed>
            <Text>{tokenAmount} BTS</Text>
          </RowFixed>
          <RowFixed>
            <Button
              id="claim-reward-button"
              onClick={() => {
                claimReward(idx)
              }}
            >
              Claim
            </Button>
          </RowFixed>
        </FixedHeightRow>
      </AutoColumn>
    </HoverCard>
  )
}

export default RewardList
