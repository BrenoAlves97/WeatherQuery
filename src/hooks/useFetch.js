import { useState } from "react";
import { toast } from "react-toastify";

import { api } from "../services/api";

const apiKey = import.meta.env.VITE_API_KEY;

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [cityData, setCityData] = useState({});

  const handleFetch = async (city) => {
    setLoading(true);
    try {
      const res = await api.get(`?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`);
      const { data } = res;
      setCityData(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Houve algum erro...");
    }
  };

  return { loading, handleFetch, cityData };
};
