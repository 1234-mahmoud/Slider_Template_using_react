import { useState, useEffect } from "react";
import React from "react";
import "./Slider.css";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import pic1 from "./assets/pic1.webp";
import pic2 from "./assets/pic2.webp";
import pic3 from "./assets/pic3.webp";
import pic4 from "./assets/pic4.webp";
import pic5 from "./assets/pic5.webp";

export default function Slider() {
  const pics = [pic1, pic2, pic3, pic4, pic5];
  const itemsPerPage = 5;
  const gap = 30;

  const [dataSlider, setDataSlider] = useState(pics);
  const [count, setCount] = useState(0);

  const shiftNext = () => {
    if (count < dataSlider.length - itemsPerPage) {
      setCount(count + 1);
    } else {
      setDataSlider((prev) => [...prev, ...pics]);
      setCount(count + 1);
    }
  };

  const shiftPrev = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev < dataSlider.length - itemsPerPage) {
          return prev + 1;
        } else {
          setDataSlider((prevData) => [...prevData, ...pics]);
          return prev + 1;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [dataSlider]);

  const sliderStyle = css`
    transform: translateX(calc(-${count} * ((100% - ${(itemsPerPage - 1) * gap}px) / ${itemsPerPage} + ${gap}px)));
    transition: transform 1s ease-in-out;
  `;

  return (
    <div className="parent">
      <div className="swiper-btns">
        <button onClick={shiftPrev}>
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <button onClick={shiftNext}>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>

      <div className="slider-wrapper">
        <div className="slider-parent" css={sliderStyle}>
          {dataSlider.map((img, idx) => (
            <div className="card" key={idx}>
              <h1>
                Slide num #<strong>{idx + 1}</strong>
              </h1>
              <div className="card-img">
                <img src={img} alt="" />
              </div>
            </div>
          ))}
        </div>
      {/* Pagination with original pics length */}
      <div className="pagination">
          {Array.from({ length: pics.length }).map((_, i) => (
            <span
              key={i}
              className={
                i === count % pics.length ? "active" : "" // Active bullet based on original pics length
              }
              onClick={() => setCount(i)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
