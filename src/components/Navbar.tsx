import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
import { api } from "../api";
import { useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { HashLink } from "react-router-hash-link";
import logo from "../assets/img/gosmaca66.png";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

import ruFlag from "../assets/img/rusf.png";
import enFlag from "../assets/img/inlis.png";
import tmFlag from "../assets/img/Turkmen.png";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const isHomepage = location.pathname === "/";

  useEffect(() => {
    const language = localStorage.getItem("language") || "tk";
    setSelectedLanguage(language);
    api.defaults.headers.common["Accept-Language"] = language;
  }, []);

  const handleLanguageChange = (selectedOption: any) => {
    const language = selectedOption.value;
    setSelectedLanguage(language);
    i18n.changeLanguage(language).then(() => {
      localStorage.setItem("language", language);
      api.defaults.headers.common["Accept-Language"] = language;
      queryClient.invalidateQueries();
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const languageOptions = [
    { value: "ru", label: "RU", image: ruFlag },
    { value: "en", label: "EN", image: enFlag },
    { value: "tk", label: "TM", image: tmFlag },
  ];

  return (
    <nav className="bg-white text-black w-full h-[70px] mx-auto mb-[20px]">
      <div className="container flex justify-between items-center py-4 px-6 mx-auto font-jakarta">
        {/* Logo */}
        <HashLink to="/" className="text-2xl font-bold">
          <img src={logo} alt="Logo" className="w-[300px] mr-4" />
        </HashLink>

        <button
          className="block lg:hidden text-3xl ml-12"
          onClick={toggleSidebar}
        >
          <GiHamburgerMenu />
        </button>

        <div className="hidden lg:flex items-center space-x-6">
          {isHomepage ? (
            <>
              <HashLink
                smooth
                to="#courses"
                className="text-[#2A3447] font-normal text-[20px] hover:text-[#5D87FF]"
                onClick={closeSidebar}
              >
                {t("navbar.courses")}
              </HashLink>
              <HashLink
                smooth
                to="#activity"
                className="text-[#2A3447] font-normal text-[20px] hover:text-[#5D87FF]"
                onClick={closeSidebar}
              >
                {t("navbar.activity")}
              </HashLink>
              <HashLink
                smooth
                to="#teachers"
                className="text-[#2A3447] font-normal text-[20px] hover:text-[#5D87FF]"
                onClick={closeSidebar}
              >
                {t("navbar.teachers")}
              </HashLink>
              <HashLink
                smooth
                to="#media"
                className="text-[#2A3447] font-normal text-[20px] hover:text-[#5D87FF]"
                onClick={closeSidebar}
              >
                {t("navbar.media")}
              </HashLink>
              <HashLink
                smooth
                to="#contact"
                className="text-[#2A3447] font-normal text-[20px] hover:text-[#5D87FF]"
                onClick={closeSidebar}
              >
                {t("navbar.contact")}
              </HashLink>
            </>
          ) : (
            <>
              <a
                href="/courses"
                className="text-[#2A3447] font-normal text-[20px] hover:text-[#5D87FF]"
                onClick={closeSidebar}
              >
                {t("navbar.courses")}
              </a>
              <a
                href="/activity"
                className="text-[#2A3447] font-normal text-[20px] hover:text-[#5D87FF]"
                onClick={closeSidebar}
              >
                {t("navbar.activity")}
              </a>
              <a
                href="/teachers"
                className="text-[#2A3447] font-normal text-[20px] hover:text-[#5D87FF]"
                onClick={closeSidebar}
              >
                {t("navbar.teachers")}
              </a>
              <a
                href="/media"
                className="text-[#2A3447] font-normal text-[20px] hover:text-[#5D87FF]"
                onClick={closeSidebar}
              >
                {t("navbar.media")}
              </a>
              <a
                href="/contact"
                className="text-[#2A3447] font-normal text-[20px] hover:text-[#5D87FF]"
                onClick={closeSidebar}
              >
                {t("navbar.contact")}
              </a>
            </>
          )}

          <div className="ml-4">
            <Select
              options={languageOptions}
              value={languageOptions.find(
                (option) => option.value === selectedLanguage
              )}
              onChange={handleLanguageChange}
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
              }}
              formatOptionLabel={(e: any) => (
                <div className="flex items-center">
                  <img src={e.image} alt={e.label} className="w-8 h-6 mr-2" />
                </div>
              )}
              className="font-semibold text-[#2A3447] text-[17px] py-1 w-16"
              styles={{
                dropdownIndicator: (provided) => ({
                  ...provided,
                  display: "none",
                }),
                indicatorSeparator: (provided) => ({
                  ...provided,
                  display: "none",
                }),
                control: (base) => ({
                  ...base,
                  border: "none",
                  boxShadow: "none",
                }),
              }}
            />
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeSidebar}
          />
          <div className="lg:hidden fixed top-0 right-0 w-[250px] h-full bg-white z-50">
            <div className="flex flex-col items-start p-6 text-black">
              <div className="flex justify-between items-center w-full mb-6">
                <img src={logo} alt="Logo" className="w-[170px]" />
                <button className="text-2xl" onClick={toggleSidebar}>
                  <AiOutlineClose />
                </button>
              </div>
              {isHomepage ? (
                <>
                  <HashLink
                    smooth
                    to="#courses"
                    className="text-black text-[20px] mb-4 hover:text-[#5D87FF]"
                    onClick={closeSidebar}
                  >
                    {t("navbar.courses")}
                  </HashLink>
                  <HashLink
                    smooth
                    to="#activity"
                    className="text-black text-[20px] mb-4 hover:text-[#5D87FF]"
                    onClick={closeSidebar}
                  >
                    {t("navbar.activity")}
                  </HashLink>
                  <HashLink
                    smooth
                    to="#teachers"
                    className="text-black text-[20px] mb-4 hover:text-[#5D87FF]"
                    onClick={closeSidebar}
                  >
                    {t("navbar.teachers")}
                  </HashLink>
                  <HashLink
                    smooth
                    to="#media"
                    className="text-black text-[20px] mb-4 hover:text-[#5D87FF]"
                    onClick={closeSidebar}
                  >
                    {t("navbar.media")}
                  </HashLink>
                  <HashLink
                    smooth
                    to="#contact"
                    className="text-black text-[20px] mb-4 hover:text-[#5D87FF]"
                    onClick={closeSidebar}
                  >
                    {t("navbar.contact")}
                  </HashLink>
                </>
              ) : (
                <>
                  <a
                    href="/courses"
                    className="text-black text-[20px] mb-4 hover:text-[#5D87FF]"
                    onClick={closeSidebar}
                  >
                    {t("navbar.courses")}
                  </a>
                  <a
                    href="/activity"
                    className="text-black text-[20px] mb-4 hover:text-[#5D87FF]"
                    onClick={closeSidebar}
                  >
                    {t("navbar.activity")}
                  </a>
                  <a
                    href="/teachers"
                    className="text-black text-[20px] mb-4 hover:text-[#5D87FF]"
                    onClick={closeSidebar}
                  >
                    {t("navbar.teachers")}
                  </a>
                  <a
                    href="/media"
                    className="text-black text-[20px] mb-4 hover:text-[#5D87FF]"
                    onClick={closeSidebar}
                  >
                    {t("navbar.media")}
                  </a>
                  <a
                    href="/contact"
                    className="text-black text-[20px] mb-4 hover:text-[#5D87FF]"
                    onClick={closeSidebar}
                  >
                    {t("navbar.contact")}
                  </a>
                </>
              )}
              <Select
                options={languageOptions}
                value={languageOptions.find(
                  (option) => option.value === selectedLanguage
                )}
                onChange={handleLanguageChange}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
                formatOptionLabel={(e: any) => (
                  <div className="flex items-center">
                    <img src={e.image} alt={e.label} className="w-8 h-6 mr-2" />
                  </div>
                )}
                className="font-semibold text-[#2A3447] text-[17px] py-1 w-16"
                styles={{
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    display: "none",
                  }),
                  indicatorSeparator: (provided) => ({
                    ...provided,
                    display: "none",
                  }),
                  control: (base) => ({
                    ...base,
                    border: "none",
                    boxShadow: "none",
                  }),
                }}
              />
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
