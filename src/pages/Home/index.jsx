import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

// icons
import { BiSearch } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { BsPlus } from "react-icons/bs";
import { TbTemperatureCelsius } from "react-icons/tb";

// components
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";

import "./home.scss";
import { toast } from "react-toastify";

export const Home = () => {
  const { cityData, handleFetch } = useFetch();
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (cityName.length === 0) {
      toast.warn("Por favor, insira o nome de uma cidade...");
      setLoading(false);
      return;
    }

    try {
      const res = await handleFetch(cityName);
      console.log(cityData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setCityName("");
    }
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

          {loading && <div className="spinner"></div>}

          {cityData && !loading && (
            <div className="city-content">
              <div className="about-city">
                <p className="location">
                  <GoLocation size={26} color="#fff" />
                  {cityData.name}
                </p>
                <p className="other-infos">
                  <span>
                    <img
                      width={35}
                      src={`https://openweathermap.org/img/wn/${cityData.weather[0].icon}.png`}
                      alt={cityData.weather[0].description}
                    />
                    {cityData.weather[0].description}
                  </span>
                  <span>
                    {cityData.main.temp.toFixed(1)}
                    <TbTemperatureCelsius size={23} color="#fff" />
                  </span>
                </p>
              </div>
              <div className="box-btn">
                <button>
                  <BsPlus size={28} color="#fff" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
