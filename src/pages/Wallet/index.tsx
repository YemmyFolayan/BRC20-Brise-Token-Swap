import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { CardHeader, Text, CardBody } from '@evofinance9/uikit'
import { Currency, CurrencyAmount, ETHER, Token } from '@evofinance9/sdk'

import CurrencyLogo from 'components/CurrencyLogo'
import Container from 'components/Container'
import Column from 'components/Column'
import { RowFixed } from 'components/Row'
import Loader from 'components/Loader'

import { useActiveWeb3React } from 'hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useAllTokens } from 'hooks/Tokens'

import { MenuItem } from './styleds'
import AppBody from '../AppBody'

const StyledBalanceText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  max-width: 5rem;
  text-overflow: ellipsis;
`

function currencyKey(currency: Currency): string {
  return currency instanceof Token ? currency.address : currency === ETHER ? 'ETHER' : ''
}

function Balance({ balance }: { balance: CurrencyAmount }) {
  return <StyledBalanceText title={balance.toExact()}>{balance.toSignificant(4)}</StyledBalanceText>
}

function CurrencyRow({ currency }: { currency: Currency }) {
  const { account } = useActiveWeb3React()
  const key = currencyKey(currency)
  const balance = useCurrencyBalance(account ?? undefined, currency)

  return (
    <MenuItem className={`token-item-${key}`}>
      <CurrencyLogo currency={currency} size="24px" />
      <Column>
        <Text title={currency.name}>{currency.symbol}</Text>
      </Column>
      {/* <TokenTags currency={currency} /> */}
      <RowFixed style={{ justifySelf: 'flex-end' }}>
        {balance ? <Balance balance={balance} /> : account ? <Loader /> : null}
      </RowFixed>
    </MenuItem>
  )
}

const Wallet = () => {
  const [currencies, setCurrencies] = useState<Token[]>([])
  const allTokens: { [address: string]: Token } = useAllTokens()

  useEffect(() => {
    const data = Object.values(allTokens)
    setCurrencies(data)
  }, [allTokens])

  return (
    <Container>
      <AppBody>
        <CardHeader>Wallet</CardHeader>
        <CardBody>
          {currencies.map((currency) => (
            <CurrencyRow currency={currency} />
          ))}
        </CardBody>
      </AppBody>
    </Container>
  )
}

export default Wallet
