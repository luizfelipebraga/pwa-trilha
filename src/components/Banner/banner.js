import React, { Component } from "react";
import SlickSlider from "react-slick";
import sliderClasses from "@magento/pagebuilder/lib/ContentTypes/Slider/slider.module.css";
import style from './style.scss';
import BannerContent from "./Content";

import ArrowLeft from '../../assets/arrow-left.png';
import ArrowRight from '../../assets/arrow-right.png';

import truckImage1 from '../../assets/truck-banner.png';
import truckImage2 from '../../assets/optimus-truck.png';
import truckImage3 from '../../assets/volvo.png';
import truckImage4 from '../../assets/caminhao4.png';


function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <img
      src={ArrowLeft}
      className={className}
      onClick={onClick}
    />
  );
}

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <img
      src={ArrowRight}
      className={className}
      onClick={onClick}
    />
  );
}


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
            prevArrow: <SamplePrevArrow />,
            nextArrow: <SampleNextArrow />,
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
            <BannerContent title="garantia no" subtitle="mundo inteiro" truckImage={truckImage1} />
          </div>
          <div>
            <BannerContent title="qualidade" subtitle="superior" truckImage={truckImage2} />
          </div>
          <div>
            <BannerContent title="entrega" subtitle="global" truckImage={truckImage3} />
          </div>
          <div>
            <BannerContent title="programas de" subtitle="manutencao"  truckImage={truckImage4}/>
          </div>
        </SlickSlider>
      </div>
    );
  }
}