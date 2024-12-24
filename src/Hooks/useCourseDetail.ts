import {api} from "../api"
import {useQuery} from "@tanstack/react-query"
import { levels } from "../types/CourseDetails"

const getCourseDetailId=async (id:number |undefined): Promise<levels> => {
        const response = await api.get(`category_details/${id}`);
        return response.data;
      
}
export const useCourseDetail =(id:number |undefined)=>{
    return useQuery<levels>({
    queryKey: ["courseDetail", id],
    queryFn:()=> getCourseDetailId(id),
  });
}