import React from "react";

import { Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

const SwiperComponent = ({
    elements,
    slidesPerView = 1,
    spaceBetween = 50,
    isPagination = true,
}) => {
    if (isPagination) {
        return (
            <Swiper
                modules={[Pagination, A11y]}
                spaceBetween={spaceBetween}
                slidesPerView={slidesPerView}
                pagination={{ clickable: true }}>
                {elements.map((element, idx) => {
                    return <SwiperSlide key={idx}>{element}</SwiperSlide>;
                })}
            </Swiper>
        );
    }
    return (
        <Swiper
            modules={[A11y]}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}>
            {elements.map((element, idx) => {
                return <SwiperSlide key={idx}>{element}</SwiperSlide>;
            })}
        </Swiper>
    );
};

export default SwiperComponent;
