import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { slideData } from "../types/ActIvity";
import { useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight, HiX } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { useTranslation } from "react-i18next";

const Activity: React.FC = () => {
  const outerSliderRef = useRef<Slider | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");

  const { t } = useTranslation();

  const { data: socialactivity } = useQuery<slideData[]>({
    queryKey: ["socialactivity"],
    queryFn: async (): Promise<slideData[]> => {
      const response = await api.get("/socialactivities/");
      return response.data;
    },
  });

  const openModal = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const outerSliderSettings = {
    infinite: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const innerSliderSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div
      id="activity"
      className="container mx-auto text-center mt-16  lg:font-jakarta"
    >
      {/* Başlık */}
      <div className="pl-3 lg:pl-0 md:pl-0 text-left">
        <h2 className="font-semibold text-2xl sm:text-3xl text-[#5A6A85] font-jakarta">
          {t("titles.activity")}
        </h2>
      </div>

      <div className="relative ">
        <Slider
          {...outerSliderSettings}
          ref={outerSliderRef}
          className="relative overflow-hidden"
        >
          {socialactivity?.map((slide) => (
            <div key={slide.id} className="mr-1 ml-1  pr-2   py-5 ">
              <Slider
                {...innerSliderSettings}
                className="rounded-t-lg overflow-hidden "
              >
                {slide?.images?.map((img) => (
                  <img
                    key={img.id}
                    src={img.image}
                    alt="Slider image"
                    className="w-full h-[250px] object-cover rounded-t-lg"
                  />
                ))}
              </Slider>

              <div className="text-center py-4 px-3 shadow-lg rounded-b-lg transition-all duration-300 ease-in-out hover:bg-[#D9D9D91A]">
                <h2
                  onClick={() => openModal(slide.description)}
                  className="font-medium text-lg text-[#2A3447] cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
                >
                  {slide.name}
                </h2>
              </div>
            </div>
          ))}
        </Slider>

        <button
          onClick={() => outerSliderRef.current?.slickPrev()}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 text-black p-2 rounded-full bg-white shadow-lg hover:bg-gray-200 transition-all duration-300 sm:ml-2"
          aria-label="Previous Slide"
        >
          <HiChevronLeft className="text-2xl" />
        </button>

        <button
          onClick={() => outerSliderRef.current?.slickNext()}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 text-black p-2 rounded-full bg-white shadow-lg hover:bg-gray-200 transition-all duration-300 sm:mr-2"
          aria-label="Next Slide"
        >
          <HiChevronRight className="text-2xl" />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999] backdrop-blur-sm">
          <div className="bg-white p-5 md:p-10 rounded-lg w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] mx-3 relative">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p>{modalContent}</p>

            <button
              onClick={closeModal}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
              aria-label="Close Modal"
            >
              <HiX className="text-2xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;
