import "swiper/css";
import "swiper/css/pagination";
import React, { FC, useRef, useState, useEffect } from "react";
import { styled } from "styled-components";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import gsap from "gsap";

import { IHistoricalEvent } from "../../services/data.types";
import { isMobile, isTablet } from "../../helpers/isMobile.helper";
import { Button } from "../ui/Button/Button";
import { Typography } from "../ui/Typography/Typography";

export interface IEventsSliderProps {
  events: IHistoricalEvent[];
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  align-self: flex-start;
  margin-top: 5.2vh;
  margin-bottom: 20px;
  padding: 0 4.2vw;
  .swiper-pagination {
    display: none;
    .swiper-pagination-bullet-active {
      background-color: ${({ theme }) => theme.palette.main};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    margin-top: 0;
    padding: 20px 0 0;
    border-top: 1px solid ${({ theme }) => theme.palette.border};
    .swiper-pagination {
      position: fixed;
      bottom: calc(17px + env(safe-area-inset-bottom, 0));
      display: block;
    }
    .swiper {
      overflow: visible;
    }
    .swiper-slide:not(.swiper-slide-active) {
      opacity: 0.4;
    }
  }
`;

const EventSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const YearLabel = styled(Typography)`
  font-family: ${({ theme }) => theme.fontFamily.secondary};
  color: ${({ theme }) => theme.palette.primary};
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    ${({ theme }) => theme.typography.body2};
  }
`;

const Description = styled(Typography)`
  line-height: 150%;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    ${({ theme }) => theme.typography.body3};
    line-height: 150%;
  }
`;

const ControlButton = styled(Button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  ${({ control }) =>
    control === "prev" ? `left: 2%; right: auto` : `right: 2%; left: auto`};
  @media (max-width: ${({ theme }) => theme.breakpoints.xl}px) {
    ${({ control }) =>
      control === "prev" ? `left: 5px; right: auto` : `right: 5px; left: auto`};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: none;
  }
`;

export const EventsSlider: FC<IEventsSliderProps> = ({ events }) => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const prevButtonRef = useRef();
  const nextButtonRef = useRef();

  const slidesGap = isMobile() ? 30 : 80;
  const slidesNumber = isMobile() ? 1.7 : isTablet() ? 2 : 3;

  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  useEffect(() => {
    swiperRef.current?.swiper.setProgress(0);

    gsap.fromTo(
      swiperRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
      }
    );
  }, [events]);

  const handleOnNextClick = () => {
    swiperRef.current?.swiper.slideNext();
  };

  const handleOnPrevClick = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const updateState = () => {
    setIsLastSlide(!!swiperRef.current?.swiper.isEnd);
    setIsFirstSlide(!!swiperRef.current?.swiper.isBeginning);
  };

  return (
    <Wrapper>
      <Swiper
        ref={swiperRef}
        spaceBetween={slidesGap}
        slidesPerView={slidesNumber}
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
        onSlideChange={updateState}
      >
        {events.map((currentEvent) => (
          <EventSlide key={currentEvent.year}>
            <YearLabel variant="h3" component="h3" transform="uppercase">
              {currentEvent.year}
            </YearLabel>
            <Description variant="body1">
              {currentEvent.description}
            </Description>
          </EventSlide>
        ))}
      </Swiper>
      {!isFirstSlide && (
        <ControlButton
          ref={prevButtonRef}
          size="small"
          control="prev"
          variant="filled"
          onClick={handleOnPrevClick}
        />
      )}
      {!isLastSlide && (
        <ControlButton
          ref={nextButtonRef}
          size="small"
          control="next"
          variant="filled"
          onClick={handleOnNextClick}
        />
      )}
    </Wrapper>
  );
};
