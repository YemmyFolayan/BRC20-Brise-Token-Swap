import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import SwiperCore, { Pagination, Autoplay } from 'swiper/core'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../../sass/_main.scss'
import '../../sass/_responsive.scss'

import { SWAP_API } from 'backend'

import Footer from '../../components/Footer'
import WatchlistTables from '../../components/WatchlistTables'
import { BannerImg } from '../../assets/images'

import Header from './Header'

SwiperCore.use([Pagination, Autoplay])

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

export default function Home() {
  return (
    <>
      <Header />
      <div className="home">
        <Container>
          <Row>
            <Col lg={12} md={12}>
              <div className="home_box">
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
                        <img src={item.imageURL} alt={item.label} />
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="home_button_box">
                <div className="d-flex justify-content-center align-items-center">
                  <button className="btn active" type="button">
                    <p>All Crypto</p>
                  </button>
                  <button className="btn" type="button">
                    <p>Blockchain</p>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <WatchlistTables />
        <Footer />
      </div>
    </>
  )
}
