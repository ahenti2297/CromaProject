import React, { useEffect, useRef, useState } from "react";
import style from "./Carousel.module.css";
// import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

const Carousel = ({ data = [] }) => {
  const [slide, setSlide] = useState(0);
  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };
  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(
      () =>
        setSlide((currentSlide) =>
          currentSlide === data.length - 1 ? 0 : currentSlide + 1
        ),
      5000
    );
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className={style.carousel}>
      <ChevronLeftIcon className={style.arrow_left} onClick={prevSlide} />
      {data.map((item, idx) => {
        return (
          <img
            src={item.src}
            alt={item.alt}
            key={idx}
            className={slide === idx ? style.slides : style.slide_hidden}
            onClick={() => navigate(item.href)}
          />
        );
      })}
      <ChevronRightIcon className={style.arrow_right} onClick={nextSlide} />
      <span className={style.indicators}>
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? style.indicator : style.indicator_inactive
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </span>
    </div>
  );
};

export default Carousel;
