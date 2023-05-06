import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConnection";

import "./private.scss";

export const Private = ({ chidlren }) => {
  const { signed, setSigned } = useContext(UserContext);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const isLogged = async () => {
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          let userDetails = {
            email: user.email,
            uid: user.uid,
          };

          localStorage.setItem("@userInfos", JSON.stringify(userDetails));

          setloading(false);
          setSigned(true);
        } else {
          setloading(false);
        }
      });
    };

    isLogged();
  }, []);

  if (loading) {
    return (
      <div className="private-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!signed) {
    return <Navigate to="/signin" />;
  }

  return chidlren;
};
