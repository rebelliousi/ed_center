import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { videoData } from "../types/Media";

const getMediaData = async () => {
  const response = await api.get("/videos/");
  return response.data;
};

export const useMedia = () => {
  return useQuery<videoData[]>({
    queryKey: ["videos"],
    queryFn: getMediaData,
  });
};
