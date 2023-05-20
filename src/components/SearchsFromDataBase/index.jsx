import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../contexts/UserContext";

import { onSnapshot, collection, query, where, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebaseConnection";

import "./search.scss";

export const SearchFromDataBase = () => {
  const { searchs, setSearchs } = useContext(UserContext);

  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const dataLS = localStorage.getItem("@userInfo");
    const data = JSON.parse(dataLS);
    setItem(data);

    const getSearchs = async () => {
      setLoading(true);

      const q = query(collection(db, "lastsearches"), orderBy("createdAt", "desc"));
      const unsub = onSnapshot(q, (snapshot) => {
        let list = [];

        snapshot.forEach((doc) => {
          list.push({
            name: doc.data().searchedCity,
            emailUserSaving: doc.data().emailUserSaving,
            createdAt: doc.data().createdAt,
          });
        });
        setSearchs(list);
      });
      setLoading(false);
    };
    getSearchs();
  }, []);

  if (loading) {
    return <h2 className="src">Procurando buscas...</h2>;
  }

  return (
    <>
      {!searchs.length > 0 && item ? (
        <h2 className="title">Nenhuma busca realizada...</h2>
      ) : (
        <ul className="container-searchs">
          <h2>Ultimas buscas</h2>
          {searchs
            .filter((city) => city.emailUserSaving === item.email)
            .map((city, index) => (
              <li key={index}>{city.name}</li>
            ))}
        </ul>
      )}
    </>
  );
};
