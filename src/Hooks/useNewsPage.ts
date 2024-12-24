import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { NewsDetails } from "../types/News";

const getNewsPageData=async () => {
    const response = await api.get("/news/");
    return response.data;
  }

export const useNewsPage =()=>{
return useQuery<NewsDetails[]>({
    queryKey: ["news"],
    queryFn: getNewsPageData,
  });
} 