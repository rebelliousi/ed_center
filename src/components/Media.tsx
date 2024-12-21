import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import Slider from "react-slick";
import { api } from "../api";
import { videoData } from "../types/Media";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";

const Media: React.FC = () => {
  const { data: videos } = useQuery<videoData[]>({
    queryKey: ["videos"],
    queryFn: async () => {
      const response = await api.get("/videos/");
      return response.data;
    },
  });

  const { t } = useTranslation();

  const [selectedVideo, setSelectedVideo] = useState<videoData | null>(null);

  const sliderRef = useRef<Slider | null>(null); // Ref for the slider

  const handleVideoClick = (video: videoData) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div
      id="media"
      className="container  mx-auto font-jakarta w-full h-auto mt-16 lg:px-0 md:px-0"
    >
      <h2 className="pl-3 lg:pl-0 md:pl-0 font-semibold text-2xl sm:text-3xl text-[#5A6A85] font-jakarta  text-left">
        {t("titles.media")}
      </h2>

      <div className="relative ">
        <Slider
          {...sliderSettings}
          ref={sliderRef}
          className="w-full  flex items-center justify-content"
        >
          {videos?.map((item, index) => (
            <div
              key={index}
              className="mr-2 ml-2 pr-4 pb-10  rounded-t-lg  pt-2 flex items-center justify-center "
            >
              <div
                className="relative w-full h-[250px] sm:h-[200px] md:h-[250px] lg:h-[300px] rounded-t-lg"
                onClick={() => handleVideoClick(item)}
              >
                <img
                  className="w-full h-full object-cover rounded-t-lg "
                  src={item.image}
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-white animate-pulseCustom cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.752 11.168l-5.197-3.034A1 1 0 008 9v6a1 1 0 001.555.832l5.197-3.034a1 1 0 000-1.664z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-center py-4 px-3 shadow-lg rounded-b-lg transition-all duration-300 ease-in-out hover:bg-[#D9D9D91A]">
                {item.title}
              </h3>
            </div>
          ))}
        </Slider>

        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 text-black p-2 rounded-full bg-white shadow-lg hover:bg-gray-200 transition-all duration-300 sm:ml-2"
          aria-label="Previous Slide"
        >
          <HiChevronLeft className="text-2xl" />
        </button>

        {/* Custom Next Button */}
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 text-black p-2 rounded-full bg-white shadow-lg hover:bg-gray-200 transition-all duration-300 sm:mr-2"
          aria-label="Next Slide"
        >
          <HiChevronRight className="text-2xl" />
        </button>
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-gray-500 text-white rounded-full shadow-lg transition-all duration-300 hover:bg-gray-600 hover:shadow-xl z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="relative w-full pb-[56.25%]">
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                controls
              >
                <source src={selectedVideo.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;
