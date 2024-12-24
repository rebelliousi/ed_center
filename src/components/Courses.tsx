import { Link } from "react-router-dom";
import { CourseData } from "../types/Course";

import { useTranslation } from "react-i18next";
import {useCategory} from "../Hooks/useCourses"

const Courses: React.FC = () => {
  const { data: categories } = useCategory()
  const { t } = useTranslation();

  return (
    <div
      id="courses"
      className="container text-center mt-16 bg-white mx-auto w-full h-auto "
    >
      <div className="pl-4 lg:pl-0 md:pl-1 text-left mb-3 ">
        <h2 className=" font-semibold text-2xl sm:text-3xl text-[#5A6A85] font-jakarta">
          {t("titles.courses")}
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-2 ">
        {categories?.map((course: CourseData) => (
          <div
            key={course.id}
            className="w-full lg:h-[270px] md:h-[270px] h-[200px] p-2 md:p-5  pb-5 border flex flex-col items-center rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-white text-center"
          >
            <Link
              to={`/category_details/${course.id}`}
              className="w-full h-full flex flex-col items-center"
            >
              <div className="flex justify-center w-full mb-3 object-contain">
                <img
                  src={course.image}
                  alt={course.name}
                  className="lg:w-[200px] lg:h-[170px]  md:w-[180px] md:h-[150px]  w-[150px] h-[120px] p-1 object-contain rounded-lg"
                />
              </div>

              <div className="lg:w-[300px] md:w-[280px] h-[100px] mt-3 w-full">
                <h2 className="lg:text-[20px] text-[12px] md:text-[20px] text-[#2A3447] font-semibold font-jakarta sm:text-[12px]">
                  {course.name}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
