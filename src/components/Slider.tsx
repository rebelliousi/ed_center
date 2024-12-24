import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { SliderBanner } from "../types/Slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSlider  } from "../Hooks/useSlider";

const AutoSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const { data: banner } = useSlider()

  const settings = {
    infinite: true,
    speed: 700,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (next: number) => setCurrentSlide(next),
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-0 mb-10">
      <div className="relative pb-[10px] pt-[10px] ">
        <div className="relative h-[250px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-lg mx-0 sm:mx-0 w-full">
          <Slider {...settings} ref={sliderRef}>
            {banner?.map((image: SliderBanner) => (
              <div
                key={image.id}
                className="w-full h-full mx-auto flex justify-center items-center"
              >
                <picture>
                  <img
                    src={image.banner}
                    alt={`Banner ${image.id}`}
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>
            ))}
          </Slider>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pb-2">
            <ul className="flex justify-center space-x-2">
              {banner?.map((_, index: any) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      if (sliderRef.current) {
                        sliderRef.current.slickGoTo(index);
                      }
                    }}
                    className={`w-3 h-3 rounded-full ${
                      currentSlide === index ? "bg-[#5D87FF]" : "bg-gray-300"
                    }`}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 sm:px-6 hidden sm:block">
            <button
              className="absolute m-2 top-1/2 left-0 transform -translate-y-1/2 text-black p-2 sm:p-4 rounded-full bg-white shadow-lg hover:bg-gray-200 transition-all duration-300"
              onClick={handlePrev}
            >
              <HiChevronLeft className="text-[24px]" />
            </button>
          </div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 sm:px-6 hidden sm:block">
            <button
              className="absolute m-2 top-1/2 right-0 transform -translate-y-1/2 text-black p-2 sm:p-4 rounded-full bg-white shadow-lg hover:bg-gray-200 transition-all duration-300"
              onClick={handleNext}
            >
              <HiChevronRight className="text-[24px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoSlider;
