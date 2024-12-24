import { DiscountData } from './../types/Discount';
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";



const getDiscountData=async (): Promise<DiscountData[]> => {
    const response = await api.get<DiscountData[]>("/discountitems/");
    return response.data;
  }
export const useDiscount = ()=>{
   return  useQuery<DiscountData[]>({
        queryKey: ["discount"],
        queryFn: getDiscountData,
      });
} 