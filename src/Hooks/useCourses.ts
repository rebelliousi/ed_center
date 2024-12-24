import {useQuery} from "@tanstack/react-query"
import {api} from "../api"
import { CourseData } from "../types/Course";


const getCategoryData=async (): Promise<CourseData[]> => {
    const response = await api.get("/categories/"); // Backend'e istek gönderiliyor
    return response.data;
  }

export const useCategory = ()=> { 
    return useQuery<CourseData[]>({
    queryKey: ["categories"],
    queryFn: getCategoryData,
  })
}