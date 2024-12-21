import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { NewsDetails } from "../types/News";
import { AiOutlineCalendar } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const News: React.FC = () => {
  const { data } = useQuery<NewsDetails[]>({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await api.get("/news/");
      return response.data;
    },
  });

  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleCardClick = (id: number) => {
    navigate(`/newsdetail/${id}`);
  };

  return (
    <div
      id="news"
      className="container text-center  bg-white mx-auto w-full h-auto mt-16"
    >
      <div className="text-center mt-6 flex items-center justify-between">
        <h2 className="pl-3  md:pr-1 md:pl-0 lg:pl-0 font-semibold text-2xl sm:text-3xl text-[#5A6A85] font-jakarta text-left">
          {t("titles.news")}
        </h2>
        <button
          onClick={() => navigate("/newspage")}
          className=" text-blue-600  text-[16px] font-normal py-2 px-4 rounded"
        >
          {t("allnews.all")}
        </button>
      </div>

      {/* İlk 4 Kart */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 ml-3 mr-3 lg:ml-0 lg:mr-0 md:mr-0 md:ml-0">
        {data?.slice(0, 4).map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer "
            onClick={() => handleCardClick(item.id)}
          >
            {/* Görsel */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h1 className="font-bold text-lg text-gray-800 text-left">
                {item.title}
              </h1>
              <p className="text-gray-600 text-sm line-clamp-4 text-left">
                {item.description}
              </p>
              <div className="flex items-center mt-2 text-gray-500 text-left">
                <span className="material-icons">
                  <AiOutlineCalendar />
                </span>
                <p className="ml-2">{item.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
