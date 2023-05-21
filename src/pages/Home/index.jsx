import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// firebase
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConnection';

import { api } from '../../services/api';

// icons
import { BiSearch } from 'react-icons/bi';
import { GoLocation } from 'react-icons/go';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { WiWindy, WiHumidity } from 'react-icons/wi';

// components
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Label } from '../../components/Label';
import { Input } from '../../components/Input';
import { SearchFromDataBase } from '../../components/SearchsFromDataBase';

const apiKey = import.meta.env.VITE_API_KEY;

import './home.scss';

export const Home = () => {
  // const { cityData, handleFetch } = useFetch();
  const [cityData, setCityData] = useState(null);

  const [cityName, setCityName] = useState('');
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dataLs = localStorage.getItem('@userInfo');
    setItem(JSON.parse(dataLs));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cityName.length === 0) {
      toast.error('Por favor, insira o nome de uma cidade...');
      setLoading(false);
      return;
    }

    setLoading(true);
    const getData = async () => {
      await api
        .get(`?q=${cityName}&appid=${apiKey}&units=metric&lang=pt_br`)
        .then(async (res) => {
          const { data } = res;

          setCityData(data);
          setLoading(false);

          await addDoc(collection(db, 'lastsearches'), {
            emailUserSaving: item.email,
            searchedCity: cityName,
            createdAt: new Date(),
          })
            .then(() => console.log('Busca registrada'))
            .catch((error) => console.log(error));
        })
        .catch((error) => {
          toast.error('Favor, insira uma cidade existente...');
          console.log(error);
          setLoading(false);
          setCityName('');
          return;
        });
    };
    getData();

    setCityName('');
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
                  <GoLocation size={23} color="#fff" />
                  {cityData.name}
                  <img
                    src={`https://flagsapi.com/${cityData.sys.country}/flat/64.png`}
                    alt={cityData.name}
                    width={30}
                  ></img>
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
                <p className="speed-and-humidity">
                  <span>
                    <WiWindy size={25} color="#fff" />
                    {cityData.wind.speed} km/h
                  </span>
                  <span>
                    {cityData.main.humidity}
                    <WiHumidity size={25} color="#fff" />
                  </span>
                </p>
              </div>
            </div>
          )}
        </main>

        <div className="searchs">
          <SearchFromDataBase user={item} />
        </div>
      </div>
    </div>
  );
};
