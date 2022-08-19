import React, { useEffect, useState } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import { CardBody } from '@evofinance9/uikit'
import { useActiveWeb3React } from 'hooks'
import CardNav from 'components/CardNav'
import Container from 'components/Container'
import PageHeader from 'components/PageHeader'
import RewardList from 'components/RewardList'
import { useRewardContract } from 'hooks/useContract'
import { bnDivideByDecimal, getRewardContract, calculateGasMargin } from 'utils'
import AppBody from '../AppBody'
import { Wrapper } from '../Pool/styleds'

export default function Reward() {
  const [balances, setBalances] = useState<number[]>()
  const { account, chainId, library } = useActiveWeb3React()
  const rewardContract = useRewardContract()

  useEffect(() => {
    const fetcher = async () => {
      const res = await rewardContract?.callStatic.getIDLength()
      setBalances([])
      for (let i = 0; i < res.toNumber(); i++) {
        const res2 = await rewardContract?.callStatic.tokenXAmount(account, i)
        const balance = parseFloat(bnDivideByDecimal(res2[0]).toNumber().toFixed(3))
        setBalances((prev) => (prev ? [...prev, balance] : [balance]))
      }
    }
    fetcher()
  }, [rewardContract, account])

  const claimReward = async (idx: number) => {
    if (!chainId || !library || !account) return
    const router = getRewardContract(chainId, library, account)

    const estimate = router.estimateGas.claim
    const method: (...args: any) => Promise<TransactionResponse> = router.claim
    const args: Array<string | string[] | number> = [idx]
    const value: BigNumber | null = null

    await estimate(...args)
      .then((estimatedGasLimit) =>
        method(...args, {
          ...(value ? { value } : {}),
          gasLimit: calculateGasMargin(estimatedGasLimit),
        })
      )
      .catch((e) => {
        // we only care if the error is something _other_ than the user rejected the tx
        if (e?.code !== 4001) {
          console.error(e)
          alert(e.message)
        }
      })

    // console.log(idx)
    // console.log('loading:: true')
    // const res = await rewardContract?.claim(idx)
    // console.log('loading:: false')
  }

  return (
    <Container>
      <CardNav activeIndex={2} />
      <AppBody>
        <Wrapper>
          <PageHeader title="Reward" description="Swap token to receive reward" />
          <CardBody>
            {balances?.map((tokenAmount, idx) =>
              tokenAmount !== 0 ? (
                <RewardList key={tokenAmount} idx={idx} tokenAmount={tokenAmount} claimReward={claimReward} />
              ) : (
                ''
              )
            )}
          </CardBody>
        </Wrapper>
      </AppBody>
    </Container>
  )
}
