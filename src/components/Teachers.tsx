import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { teachersData } from "../types/Teachers";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { useTranslation } from "react-i18next";

const Teachers: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    appendDots: (dots: any) => (
      <div className="custom-dots flex justify-center mt-[30px] pt-2 lg:pt-5">
        <ul className="space-x-[-1px] ">{dots}</ul>
      </div>
    ),
  };

  const { t } = useTranslation();

  const { data: teacher } = useQuery<teachersData[]>({
    queryKey: ["teacher"],
    queryFn: async (): Promise<teachersData[]> => {
      const response = await api.get("/teachers/");
      return response.data;
    },
  });

  return (
    <div
      id="teachers"
      className="container bg-white mt-16 mb-10 mx-auto font-jakarta h-auto w-full"
    >
      <div className="container">
        <div className="pl-3 md:pl-0 lg:pl-0 text-left mb-1">
          <h1 className=" font-semibold text-2xl sm:text-3xl text-[#5A6A85] font-jakarta">
            {t("titles.teachers")}
          </h1>
        </div>
        <Slider {...settings}>
          {teacher?.map((person) => (
            <div
              key={person.id}
              className="p-4 flex justify-center items-center"
            >
              <div className="bg-white shadow-lg rounded-lg p-1 text-center max-w-[300px] mx-auto mb-[15px] lg:h-[220px] h-[200px] ">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-24 h-24 mx-auto rounded-full mb-1"
                />
                <div className="flex justify-center items-center space-x-1 pt-2">
                  <h2 className="text-[14px] lg:text-[20px] text-[#2A3447] font-bold">
                    {person.name}
                  </h2>
                  <h2 className="font-bold text-[14px] lg:text-[20px] text-[#2A3447]">
                    {person.surname}
                  </h2>
                </div>
                <p className="text-gray-500 text-[14px] lg:text-[16px] sm:text-[12px] pt-2">
                  Sapagy: {person.subject}
                </p>
                <p className="text-gray-500 text-[14px] lg:text-[16px] sm:text-[12px] mt-2 pb-2">
                  Iş tejribesi: {person.experience} ýyl
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Teachers;
