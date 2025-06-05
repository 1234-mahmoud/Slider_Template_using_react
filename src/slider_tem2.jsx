import { useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import PropTypes from "prop-types";
import "./Slider.css";

export default function Slider({
  layout = "flex",
  gap = 20,
  breakpoints = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
  transition = { duration: "1s", easing: "ease-in-out" },
  data = [],
  autoPlay = true,
  autoPlayInterval = 3000,
  loop = true,
}) {
  const [itemsPerPage, setItemsPerPage] = useState(breakpoints.xl);
  const [sliderData, setSliderData] = useState(data);
  const [count, setCount] = useState(0);

  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width < 576) setItemsPerPage(breakpoints.xs || 1);
    else if (width < 768) setItemsPerPage(breakpoints.sm || 2);
    else if (width < 992) setItemsPerPage(breakpoints.md || 3);
    else if (width < 1200) setItemsPerPage(breakpoints.lg || 4);
    else setItemsPerPage(breakpoints.xl || 5);
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, [breakpoints]);

  const shiftNext = () => {
    if (count < sliderData.length - itemsPerPage) {
      setCount((prev) => prev + 1);
    } else if (loop) {
      setSliderData((prev) => [...prev, ...data]);
      setCount((prev) => prev + 1);
    }
  };

  const shiftPrev = () => {
    if (count > 0) setCount((prev) => prev - 1);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const interval = setInterval(() => {
      shiftNext();
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [count, sliderData, autoPlay, autoPlayInterval]);

  const cardWidth = `calc((100% - ${(itemsPerPage - 1) * gap}px) / ${itemsPerPage})`;

  const sliderStyle = css`
    display: ${layout};
    gap: ${gap}px;
    transform: translateX(calc(-${count} * (${cardWidth} + ${gap}px)));
    transition: transform ${transition.duration} ${transition.easing};
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
          {sliderData.map((item, idx) => (
            <div className="card" key={idx} style={{ flex: `0 0 ${cardWidth}` }}>
              <h1>
                Slide #<strong>{idx + 1}</strong>
              </h1>
              <div className="card-img">
                <img
                  src={typeof item === "string" ? item : item.url}
                  alt={`Slide ${idx}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          {Array.from({ length: data.length }).map((_, i) => (
            <span
              key={i}
              className={i === count % data.length ? "active" : ""}
              onClick={() => setCount(i)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

Slider.propTypes = {
  layout: PropTypes.oneOf(["flex", "grid"]),
  gap: PropTypes.number,
  breakpoints: PropTypes.object,
  transition: PropTypes.object,
  data: PropTypes.array.isRequired,
  autoPlay: PropTypes.bool,
  autoPlayInterval: PropTypes.number,
  loop: PropTypes.bool,
};
