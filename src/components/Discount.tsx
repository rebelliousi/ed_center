import { DiscountData } from "../types/Discount";
import { useTranslation } from "react-i18next";
import { useDiscount } from "../Hooks/useDiscount";

const Discount: React.FC = () => {
  const { data } = useDiscount()

  const { t } = useTranslation();

  const groupedData = data?.reduce(
    (acc: Record<string, DiscountData[]>, item) => {
      const key = `${item.percentage}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {}
  );

  const getBorderGradient = (index: number) => {
    const gradients = [
      "linear-gradient(to right, #d1e0ff 50%, #a8f2fb 50%)",
      "linear-gradient(to right, #e6d1ff 50%, #fccdef 50%)",
      "linear-gradient(to right, #d1fff4 50%, #ecffd3 50%)",
      "linear-gradient(to right, #d1e7ff 50%, #fddaff 50%)",
      "linear-gradient(to right, #defeff 50%, #fff6dc 50%)",
    ];
    return gradients[index % gradients.length];
  };

  // Yumuşak gradyan renkler için fonksiyon
  const getGradient = (index: number) => {
    const gradients = [
      "bg-gradient-to-r from-[#d1e0ff] to-[#a8f2fb]",
      "bg-gradient-to-r from-[#e6d1ff] to-[#fccdef]",
      "bg-gradient-to-r from-[#d1fff4] to-[#ecffd3]",
      "bg-gradient-to-r from-[#d1e7ff] to-[#fddaff]",
      "bg-gradient-to-r from-[#defeff] to-[#fff6dc]",
    ];
    return gradients[index % gradients.length];
  };

  const getTextColor = (index: number) => {
    const colors = [
      "text-[#9dbffa]",
      "text-[#ffa6f0]",
      "text-[#66d476]",
      "text-[#cbb1f6]",
      "text-[#95d77a]",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="container mx-auto mt-16">
      <div className=" pl-4 md:pl-0 lg:pl-0 text-left font-bold  mb-3">
        <h2 className=" font-semibold text-2xl sm:text-3xl text-[#5A6A85] font-jakarta">
          {t("titles.discount")}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 rounded-lg lg:grid-cols-5 xl:grid-cols-5 gap-2 sm:m-4 md:m-1 lg:m-1 xl:m-1">
        {groupedData &&
          Object.entries(groupedData).map(([percentage, items], index) => (
            <div
              key={percentage}
              className={`bg-white border shadow-lg p-3 text-left my-1  mr-3 transform transition-transform duration-300 hover:scale-105 
                max-h-[500px] overflow-visible`}
              style={{
                border: "1px solid",
                borderImage: getBorderGradient(index),
                borderImageSlice: 1,
              }}
            >
              <div
                className={`w-full lg:h-24 md:h-18 h-16 flex rounded-lg items-center justify-start lg:justify-center mx-auto mb-2 ${getGradient(
                  index
                )}`}
              >
                <span
                  className={`lg:text-4xl md:3xl text-2xl font-bold font-jakarta pl-3 lg:pl-0 md:pl-3 text-left lg:text-center ${getTextColor(
                    index
                  )}`}
                >
                  {percentage}
                </span>
              </div>

              <div className="container p-2 mx-1 font-jakarta text-sm text-gray-600 w-full">
                {items.map((discount, index) => (
                  <p key={index} className="text-left w-full pb-3">
                    {discount.description}
                  </p>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Discount;
