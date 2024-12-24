import { useQuery } from "@tanstack/react-query";
import {teachersData} from "../types/Teachers"
import {api} from "../api"
const getTeachersData=async (): Promise<teachersData[]> => {
    const response = await api.get("/teachers/");
    return response.data;
  }
export const useTeachers =()=>{
    return useQuery<teachersData[]>({
        queryKey: ["teacher"],
        queryFn: getTeachersData,
      });
} 