import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { NewsDetails } from "../types/News";

const getNewsData = async () => {
  const response = await api.get("/news/");
  return response.data;
};

export const useNews = () => {
  return useQuery<NewsDetails[]>({
    queryKey: ["news"],
    queryFn: getNewsData,
  });
};
