import { useQuery, useMutation } from "@tanstack/react-query";
import { AiOutlineLike, AiFillLike, AiOutlineClose } from "react-icons/ai";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { levels } from "../types/CourseDetails";
import { api } from "../api";
import { useTranslation } from "react-i18next";

const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const sliderRef = useRef<Slider | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const { t } = useTranslation();

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
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
    arrows: false,
  };

  const { data } = useQuery<levels>({
    queryKey: ["courseDetail", id],
    queryFn: async (): Promise<levels> => {
      const response = await api.get(`category_details/${id}`);
      return response.data;
    },
  });

  const likeMutation = useMutation({
    mutationFn: async (teacherId: number) => {
      await api.post(`teachers/${teacherId}/like/`);
    },
  });

  const removeLikeMutation = useMutation({
    mutationFn: async (teacherId: number) => {
      await api.post(`teachers/${teacherId}/remove_like/`);
    },
  });

  const openModal = (description: string) => {
    setModalContent(description);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  const handleLike = (teacherId: number, currentLikes: number) => {
    const likedTeachers = JSON.parse(
      localStorage.getItem("likedTeachers") || "[]"
    );

    // Determine the new like count based on whether the teacher is liked or not
    const newLikes = likedTeachers.includes(teacherId)
      ? currentLikes - 1
      : currentLikes + 1;

    const updatedTeacherLikes = newLikes;

    if (likedTeachers.includes(teacherId)) {
      likedTeachers.splice(likedTeachers.indexOf(teacherId), 1);
    } else {
      likedTeachers.push(teacherId);
    }
    localStorage.setItem("likedTeachers", JSON.stringify(likedTeachers));

    const updatedTeacher = data?.teachers.find(
      (teacher) => teacher.id === teacherId
    );
    if (updatedTeacher) {
      updatedTeacher.likes = updatedTeacherLikes;
    }

    if (likedTeachers.includes(teacherId)) {
      likeMutation.mutate(teacherId, {
        onSuccess: () => {},
        onError: () => {
          if (updatedTeacher) {
            updatedTeacher.likes = currentLikes;
          }
        },
      });
    } else {
      removeLikeMutation.mutate(teacherId, {
        onSuccess: () => {},
        onError: () => {
          if (updatedTeacher) {
            updatedTeacher.likes = currentLikes;
          }
        },
      });
    }
  };

  return (
    <div className="container mx-auto flex-1 pb-5 p-4">
      {data && (
        <div
          key={data.id}
          className="mb-5 flex items-center relative bg-blue-500 p-6 rounded-lg mx-3"
        >
          <div
            className="text-left font-jakarta flex items-center text-white h-[15px] text-xl md:text-2xl font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            <IoIosArrowBack className="mr-2 text-white" />
            {data.name}
          </div>
        </div>
      )}

      <div className="levels-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {data?.courses.map((level, index) => (
          <div
            key={level.name}
            className="mb-3 lg:mt-2 lg:py-10 relative max-w-sm rounded-lg overflow-hidden shadow-md p-4 bg-white font-jakarta cursor-pointer transform transition-transform duration-300 hover:scale-110 hover:z-10 mx-3"
          >
            <div className="absolute top-0 right-0 text-gray-100 px-3 text-[130px] lg:text-[170px] lg:absolute flex items-center font-semibold z-0">
              {`A${index + 1}`}
            </div>

            <div className="relative z-10">
              <h3 className="lg:mr-4 text-xl sm:text-2xl font-semibold mb-2">
                {level.name}
              </h3>
              <p
                className="text-gray-700 text-base mb-3 line-clamp-2 md:line-clamp-2 sm:line-clamp-2 w-full lg:w-full sm:w-full cursor-pointer"
                onClick={() => openModal(level.description)}
              >
                {level.description}
              </p>
              <p className="text-sm text-gray-500">{level.duration} </p>
              <p className="text-lg font-semibold text-[#5D87FF]">
                {level.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-2/3 lg:w-1/2 relative">
            <AiOutlineClose
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 cursor-pointer text-2xl hover:text-gray-800"
            />
            <h2 className="text-xl font-semibold mb-4">Course Description</h2>
            <p className="text-gray-700">{modalContent}</p>
          </div>
        </div>
      )}

      {/* Teachers */}
      <div className="container bg-white mb-[10px] mx-auto font-jakarta h-auto w-full my-10">
        <div className="container">
          <div className="pl-4 text-left mb-1">
            <h1 className="font-semibold text-2xl sm:text-3xl text-[#5A6A85] font-jakarta">
              {t("titles.teachers")}
            </h1>
          </div>

          <div className="relative">
            <Slider ref={sliderRef} {...settings}>
              {data?.teachers.map((person) => (
                <div
                  key={person.id}
                  className="p-4 flex justify-center items-center"
                >
                  <div className="bg-white shadow-lg rounded-lg p-1 text-center max-w-[300px] mx-auto mb-[15px] lg:h-[220px] h-[200px]">
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
                    <p
                      className="flex justify-center items-center pt-2"
                      onClick={() => handleLike(person.id, person.likes)}
                    >
                      {JSON.parse(
                        localStorage.getItem("likedTeachers") || "[]"
                      ).includes(person.id) ? (
                        <AiFillLike className="text-blue-500 cursor-pointer text-xl" />
                      ) : (
                        <AiOutlineLike className="text-gray-500 cursor-pointer text-xl" />
                      )}
                    </p>
                    <p className="text-gray-500 text-[14px] lg:text-[16px] sm:text-[12px] mt-2 pb-2">
                      {person.likes} Likes
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
            <button
              className="absolute top-1/2 left-0 transform -translate-y-1/2 text-black p-2 rounded-full bg-white shadow-lg hover:bg-gray-200 transition-all duration-300 sm:ml-2"
              onClick={() => sliderRef.current?.slickPrev()}
            >
              <HiChevronLeft className="text-2xl" />
            </button>
            <button
              className="absolute top-1/2 right-0 transform -translate-y-1/2 text-black p-2 rounded-full bg-white shadow-lg hover:bg-gray-200 transition-all duration-300 sm:mr-2"
              onClick={() => sliderRef.current?.slickNext()}
            >
              <HiChevronRight className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
