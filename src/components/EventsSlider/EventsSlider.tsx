import React, { FC, useRef, useState, useEffect } from "react";
import { styled } from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import { Button } from "../ui/Button/Button";

import { IHistoricalEvent } from "../../services/data.types";
import { Typography } from "../ui/Typography/Typography";

export interface IEventsSliderProps {
  events: IHistoricalEvent[];
}

const Wrapper = styled.div`
  align-self: flex-start;
  padding: 0 4.2vw;
  margin-top: 5.2vh;
  width: 100%;
  position: relative;

  .swiper-pagination {
    display: none;
  }
`;

const EventSlide = styled(SwiperSlide)`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const YearLabel = styled(Typography)`
  font-family: ${(props) => props.theme.fontFamily.secondary};
  color: ${(props) => props.theme.palette.primary};
`;

const Description = styled(Typography)`
  line-height: 150%;
`;

const ControlButton = styled(Button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => (props.control === "prev" ? "40px" : "auto")};
  right: ${(props) => (props.control === "next" ? "40px" : "auto")};
`;

export const EventsSlider: FC<IEventsSliderProps> = ({ events }) => {
  let prevButtonRef = useRef();
  let nextButtonRef = useRef();
  const swiperRef = useRef<SwiperRef | null>(null);

  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  useEffect(() => {
    swiperRef.current?.swiper.setProgress(0);
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
        spaceBetween={80}
        slidesPerView={3}
        onSlideChange={() => updateState()}
        modules={[Navigation, Pagination]}
        pagination={{ clickable: true }}
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
          onClick={handleOnPrevClick}
          ref={prevButtonRef}
          size="small"
          control="prev"
          variant="filled"
        />
      )}
      {!isLastSlide && (
        <ControlButton
          onClick={handleOnNextClick}
          ref={nextButtonRef}
          size="small"
          control="next"
          variant="filled"
        />
      )}
    </Wrapper>
  );
};
