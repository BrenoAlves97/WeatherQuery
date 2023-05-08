import { useState } from "react";
import { toast } from "react-toastify";

import { api } from "../services/api";

const apiKey = import.meta.env.VITE_API_KEY;

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const handleFetch = async (city) => {
    setLoading(true);
    try {
      const res = await api.get(`?q=${city}&appid=${apiKey}&lang=pt_br`);
      setData(res);
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Houve algum erro...");
    }
  };

  return { loading, handleFetch, data };
};
