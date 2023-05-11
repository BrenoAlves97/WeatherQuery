import { useState } from "react";
import { toast } from "react-toastify";

import { api } from "../services/api";

const apiKey = import.meta.env.VITE_API_KEY;

export const useFetch = () => {
  const [cityData, setCityData] = useState(null);

  const handleFetch = async (city) => {
    try {
      const res = await api.get(`?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`);
      const { data } = res;
      console.log(data);
      setCityData(data);
    } catch (error) {
      toast.error("Por gentileza, digite uma cidade existente...");
    }
  };

  return { handleFetch, cityData };
};
