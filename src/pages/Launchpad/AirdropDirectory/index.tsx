/* eslint-disable */
import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import { Oval } from 'react-loader-spinner'

import Container from 'components/Container'

import './style.css'
import AirdropCard from './AirdropCard'
import getAllAirdrop from './apicalls'

import { StyledCardContainer, LoaderWrapper } from './styleds'

export default function AirdropDirectory() {
  const [airdrops, setAirdrops] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchAirdropList = () => {
      setLoading(true)
      getAllAirdrop()
        .then((response) => {
          setLoading(false)
          setAirdrops(response)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
          swal('Oops', 'Something went wrong!', 'error')
        })
    }

    fetchAirdropList()
  }, [])

  return (
    <>
      <Container>
        {loading && (
          <LoaderWrapper>
            <Oval
              height={80}
              width={80}
              color="#000FFF"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#f4d85b"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </LoaderWrapper>
        )}
        <StyledCardContainer>
          {airdrops.map((airdrop) => (
            <AirdropCard data={airdrop} key={airdrop._id} />
          ))}
        </StyledCardContainer>
      </Container>
      <div className="mt-5" />
    </>
  )
}
