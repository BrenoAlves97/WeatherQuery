import { useState, useEffect } from "react";
import { BiUser } from "react-icons/bi";

// firebase
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/firebaseConnection";

import "./header.scss";

const usersRef = collection(db, "users");

export const Header = () => {
  const [userNameDetail, setUserNameDetail] = useState();
  const [loading, setLoading] = useState(false);

  // get datas from db of user
  useEffect(() => {
    const fetchDataUser = async () => {
      setLoading(true);
      try {
        await getDocs(usersRef).then((snapshot) => {
          const dataLS = localStorage.getItem("@userInfo");
          const detail = JSON.parse(dataLS);
          const email = detail.email;
          let list = [];

          if (email) {
            snapshot.forEach((doc) => {
              list.push({
                email: doc.data().email,
                user: doc.data().user,
              });
            });
          }

          const findIndex = list.findIndex((item) => item.email === detail.email);
          const name = list[findIndex].user;
          const refactor = name.split(" ");
          setUserNameDetail(refactor[0]);
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataUser();
  }, []);

  return (
    <header>
      <BiUser size={26} color="#fff" />
      {loading ? <div className="spinner"></div> : <h2>Olá, {userNameDetail}</h2>}
    </header>
  );
};
