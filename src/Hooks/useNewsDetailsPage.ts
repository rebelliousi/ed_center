import { useQuery } from "@tanstack/react-query";
import {api} from "../api"
import { NewsDetails } from "../types/News";

const getNewsDetailsId= async (id:number | undefined) => {
    const response = await api.get(`/news/${id}`);
    return response.data;
  }

export const useNewsDetailsPage=(id: number | undefined)=>{
 return useQuery<NewsDetails>({
    queryKey: ["newsDetails", id],
    queryFn:()=> getNewsDetailsId(id),
  });
  
} 