import {api} from "../api"
import { useQuery } from "@tanstack/react-query";
import {SliderBanner } from "../types/Slider"


const getSliderData=async (): Promise<SliderBanner[]> => {
    const response = await api.get("banner/");
    return response.data;
  }


export const useSlider =()=>{
    return  useQuery<SliderBanner[]>({
        queryKey: ["banner"],
        queryFn:getSliderData,
      });
}