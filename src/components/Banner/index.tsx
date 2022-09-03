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
      label: 'Swift Chain Banner',
      hrefURL: `https://swiftchain.netlify.app/`,
      imageURL: `https://drive.google.com/uc?export=view&id=1puiIU7zWZ2_xRPSjRicgyavmr0O8Atcp`,
    },
    {
      id: 1,
      label: 'Block Chain Banner',
      hrefURL: `https://swiftchain.netlify.app/`,
      imageURL: `https://drive.google.com/uc?export=view&id=1puiIU7zWZ2_xRPSjRicgyavmr0O8Atcp`,
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
