import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { BiSearch } from "react-icons/bi";

// components
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";

import "./home.scss";
import { toast } from "react-toastify";

export const Home = () => {
  const { cityData, handleFetch, loading } = useFetch();
  const [cityName, setCityName] = useState("");
  const [cityDetails, setCityDetails] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cityName.length === 0) {
      toast.warn("Por favor, insira o nome de uma cidade...");
      return;
    }

    const res = await handleFetch(cityName);
    console.log(res);
    setCityDetails(res);

    setCityName("");
  };

  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <Header />

        <main className="content-form">
          <form onSubmit={handleSubmit}>
            <Label title="Busque por uma cidade...">
              <div className="input-control">
                <Input
                  placeholder="Ex: Vila Velha"
                  value={cityName}
                  onchange={setCityName}
                  type="text"
                />
                <button>
                  <BiSearch size={20} color="#141414" />
                </button>
              </div>
            </Label>
          </form>
        </main>
      </div>
    </div>
  );
};
