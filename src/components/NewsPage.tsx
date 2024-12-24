import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCalendar } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useNewsPage } from "../Hooks/useNewsPage";

const NewsPage: React.FC = () => {
  const { data } = useNewsPage();
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const navigate = useNavigate();

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = data?.slice(firstIndex, lastIndex);

  const handleCardClick = (id: number) => {
    navigate(`/newsdetail/${id}`);
  };

  // Toplam sayfa sayısını hesapla
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

  return (
    <div
      id="newspage"
      className="container mx-auto py-5 text-center mb-7 sm: font-jakarta"
    >
      <h2 className="font-semibold text-3xl text-[#5A6A85] text-left mb-5 mx-2">
        {t("titles.news")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentItems?.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer ml-2 mr-2"
            onClick={() => handleCardClick(item.id)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h1 className="font-bold text-lg text-black">{item.title}</h1>
              <div className="text-gray-500 text-xs mt-2 flex items-center justify-center space-x-2">
                <span>
                  <AiOutlineCalendar />
                </span>
                <p>{item.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-16">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Prev
        </button>
        <span className="px-4 py-2 bg-gray-100 rounded text-gray-700">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsPage;
