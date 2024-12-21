import React, { useState } from "react";
import logo from "../assets/img/gosmaça ak yazgy.png";
import { Link } from "react-router-dom";
import {
  AiOutlineLink,
  AiFillMail,
  AiFillPhone,
  AiFillInstagram,
  AiFillMessage,
} from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import PopupForm from "./PopupForm";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const { t } = useTranslation();

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <footer
      id="contact"
      className="bg-[#5D87FF] text-white py-12 mt-20 font-jakarta w-full h-auto mx-auto"
    >
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5 justify-items-center mx-auto">
        <div className="flex sm:flex-col md:flex-col lg:flex-row flex-row sm:items-center md:items-center items-start w-full mb-6 sm:mb-0">
          <div className="flex sm:flex-col flex-row  sm:items-center items-start justify-start w-full sm:w-auto">
            <img
              src={logo}
              alt="Logo"
              className="w-2/3 sm:w-2/3 h-auto p-2 md:p-0"
            />

            <div className="border-l-2 border-white h-20 mx-4 lg:hidden block md:hidden sm:hidden "></div>

            <p className="sm:mt-4 mt-0  text-white font-jakarta text-center flex items-center  sm:text-left text-[12px]">
              Your trusted partner in delivering quality services.
            </p>
          </div>
        </div>

        <div className="space-y-3 text-center md:text-left w-full lg:pl-24 hidden md:hidden lg:block  ">
          <h3 className="text-white text-[18px] font-semibold mb-4">
            {t("footer.links")}
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 justify-center md:justify-start">
              <AiOutlineLink className="text-xl " />
              <Link
                to="/courses"
                className="hover:text-gray-300 block font-jakarta"
              >
                {t("footer.courses")}
              </Link>
            </li>
            <li className="flex items-center gap-3 justify-center md:justify-start">
              <AiOutlineLink className="text-xl" />
              <Link
                to="/activity"
                className="hover:text-gray-300 block font-jakarta"
              >
                {t("footer.activity")}
              </Link>
            </li>
            <li className="flex items-center gap-3 justify-center md:justify-start">
              <AiOutlineLink className="text-xl" />
              <Link
                to="/teachers"
                className="hover:text-gray-300 block font-jakarta"
              >
                {t("footer.teachers")}
              </Link>
            </li>
            <li className="flex items-center gap-3 justify-center md:justify-start">
              <AiOutlineLink className="text-xl" />
              <Link
                to="/media"
                className="hover:text-gray-300 block font-jakarta"
              >
                {t("footer.media")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3 text-center md:text-left w-full ">
          <h3 className="text-white text-[18px] font-semibold mb-4 text-left sm:text-center md:text-left">
            {t("footer.contact")}
          </h3>
          <p className="text-white text-[16px]  flex items-center gap-3 justify-start sm:justify-start md:justify-start">
            <AiFillMail className="text-xl " />
            <a
              href="https://www.gmail.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 ml-1"
            >
              gosmacaweuznuksizbilim@gmail.com
            </a>
          </p>
          <p className="text-white text-[16px] flex items-center gap-3 justify-start sm:justify-start md:justify-start">
            <AiFillPhone className="text-xl" />
            <a
              href="https://www...com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 ml-1"
            >
              +9935656565655
            </a>
          </p>
          <p className="text-white text-[16px] flex items-center gap-3 justify-start sm:justify-start md:justify-start">
            <AiFillInstagram className="text-xl" />
            <a
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 ml-1"
            >
              gosmacaweuznuksizbilim
            </a>
          </p>
          <p className="text-white text-[16px] flex items-center gap-3 justify-start sm:justify-start md:justify-start">
            <FaTiktok className="text-xl " />
            <a
              href="https://www.tiktok.com/gosmacaweeuznuksizbilim@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 ml-1"
            >
              gosmacaweeuznuksizbilim
            </a>
          </p>

          <p>
            <button
              onClick={openPopup}
              className="text-left sm:text-center text-white text-[16px] flex items-center gap-3 justify-start hover:text-gray-300 mt-4"
            >
              <AiFillMessage className="text-xl" />
              <span>{t("footer.contactus")}</span>
            </button>
          </p>
        </div>
      </div>

      {isPopupOpen && <PopupForm closePopup={closePopup} />}
    </footer>
  );
};

export default Footer;
