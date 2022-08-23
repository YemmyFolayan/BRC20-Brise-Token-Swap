import React from 'react'
import styled from 'styled-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Autoplay } from 'swiper/core'

import { SWAP_API } from 'backend'

import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'

SwiperCore.use([Pagination, Autoplay])

const Image = styled.img`
  overflow: hidden;
  width: 100%;
  height: 150px;
`

const Banner = () => {
  const banners: any[] = [
    {
      id: 0,
      label: 'Centcex Banner',
      hrefURL: `https://centcex.finance/`,
      imageURL: `${SWAP_API}/images/banner-0.jpg`,
    },
    {
      id: 1,
      label: 'Evo Banner',
      hrefURL: `https://tttttt.me/evofinances`,
      imageURL: `${SWAP_API}/images/banner-1.jpg`,
    },
  ]

  return (
    <Swiper
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 1,
        },
      }}
      autoplay={{
        delay: 15000,
      }}
      className="mySwiper"
    >
      {banners.map((item) => (
        <SwiperSlide className="p-2" key={item.id}>
          <a href={item.hrefURL} target="_blank" rel="noreferrer">
            <Image src={item.imageURL} alt={item.label} />
          </a>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Banner
