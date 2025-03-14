import { useParams } from "react-router-dom";
import { useNewsDetailsPage } from "../Hooks/useNewsDetailsPage";

const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 

 
  const idNumber = id ? Number(id) : undefined;

  const { data } = useNewsDetailsPage(idNumber); 
  return (
    <div id="newsdetail" className="container mx-auto p-4 font-jakarta">
      {data && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="font-semibold text-3xl text-left text-black mb-4">
            {data.title}
          </h2>

          <div className="w-full h-[200px] md:[300px] lg:h-[400px] mb-2 md:mb-4 lg:mb-4">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-contain"
            />
          </div>
          {/* Açıklama */}
          <p className="text-justify leading-relaxed text-gray-700 mb-4 w-auto">
            {data.description}
          </p>
          {/* Tarih */}
          <p className="text-gray-500 text-xs text-right">{data.date}</p>
        </div>
      )}
    </div>
  );
};

export default NewsDetailPage;
