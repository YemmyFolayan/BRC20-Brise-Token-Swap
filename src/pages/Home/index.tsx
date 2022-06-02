import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../../sass/_main.scss'
import '../../sass/_responsive.scss'

import WatchlistTables from '../../components/WatchlistTables'
import { BannerImg } from '../../assets/images'

import Header from './Header'

export default function Home() {
  return (
    <>
      <Header />
      <div className="home">
        <Container>
          <Row>
            <Col lg={12} md={12}>
              <div className="home_box">
                <a href="https://bitgert.com/" target="_blank" rel="noreferrer">
                  <img src={BannerImg} alt="" />
                </a>
              </div>
              <div className="home_button_box">
                <div className="d-flex justify-content-center align-items-center">
                  <button className="btn" type="button">
                    <span className="d-flex align-items-center">
                      <span role="img" aria-label="active" className="emoji">
                        ⭐️
                      </span>
                    </span>
                    <p>Watchlist</p>
                  </button>
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
