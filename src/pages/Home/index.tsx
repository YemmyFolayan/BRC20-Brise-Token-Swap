import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import SwiperCore, { Pagination, Autoplay } from 'swiper/core'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../../sass/_main.scss'
import '../../sass/_responsive.scss'

import WatchlistTables from '../../components/WatchlistTables'
import { BannerImg } from '../../assets/images'

import Header from './Header'

SwiperCore.use([Pagination, Autoplay])

// remove this function after getting ads
function generateData() {
  const arr: any[] = []
  for (let i = 11; i < 15; i++) {
    arr.push({
      id: i,
      url: `https://picsum.photos/id/${i}/912/85`,
    })
  }
  return arr
}

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
                    delay: 2000,
                  }}
                  className="mySwiper"
                >
                  <a href="https://bitgert.com/" target="_blank" rel="noreferrer">
                    <SwiperSlide className="p-2">
                      <img src={BannerImg} alt="" />
                    </SwiperSlide>
                  </a>
                  {generateData().map((item) => (
                    <a href="https://bitgert.com/" target="_blank" rel="noreferrer" key={item.id}>
                      <SwiperSlide className="p-2">
                        <img src={item.url} alt="" />
                      </SwiperSlide>
                    </a>
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
      </div>
    </>
  )
}
