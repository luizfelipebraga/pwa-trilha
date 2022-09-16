import React, { Component } from "react";
import SlickSlider from "react-slick";
import sliderClasses from "@magento/pagebuilder/lib/ContentTypes/Slider/slider.module.css";
import truckBanner from './truck-banner.png';
import style from './style.scss';
import Banner1 from "./banner1";

export default class AppendDots extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      swipeToSlide: true,
      slidesToShow: 1,
      slidesToScroll: 1,

      responsive: [
        {
          breakpoint: 2900,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            dotsClass: `slick-dots`,
            appendDots: dots => (
              <div
                style={{
                  borderRadius: "10px",
                  padding: "10px",
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem'
                }}
              >
                <ul className={style.listDots}>
                  {dots}
                </ul>
              </div>
            ),
            customPaging: i => (
              <div style={{ padding: '2rem' }}>
                {i === 0 && <span>garantia no <br /> mundo inteiro</span>}
                {i === 1 && <span>qualidade <br /> superior</span>}
                {i === 2 && <span>entrega <br /> global</span>}
                {i === 3 && <span>programas de <br /> manutencao</span>}
              </div>
            ),
          }
        }, {
          breakpoint: 1280,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            dotsClass: `slick-dots`,
            appendDots: dots => (
              <div
                style={{
                  borderRadius: "10px",
                  padding: "10px",
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem'
                }}
              >
                <ul className={style.miniDots}>
                  {dots}
                </ul>
              </div>
            ),
          }
        },
        {
          breakpoint: 724,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ],
    };
    return (
      <div className={sliderClasses.root}>
        <SlickSlider {...settings}>
          <div>
            <Banner1 title="garantia no" subtitle="mundo inteiro" />
          </div>
          <div>
            <Banner1 title="qualidade" subtitle="superior" />
          </div>
          <div>
            <Banner1 title="entrega" subtitle="global" />
          </div>
          <div>
            <Banner1 title="programas de" subtitle="manutencao" />
          </div>
        </SlickSlider>
      </div>
    );
  }
}