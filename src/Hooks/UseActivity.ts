import { useQuery } from "@tanstack/react-query";
import { slideData } from "../types/ActIvity";
import { api } from "../api";

const getActivityData = async (): Promise<slideData[]> => {
  const response = await api.get("/socialactivities/");
  return response.data;
};

export const useActivity = () => {
  return useQuery<slideData[]>({
    queryKey: ["socialactivity"],
    queryFn: getActivityData,
  });
};
