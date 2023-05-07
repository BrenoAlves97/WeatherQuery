import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebaseConnection";

import "./private.scss";

export const Private = ({ children }) => {
  const { user, setUser, signed, setSigned } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dataLS = localStorage.getItem("@userInfo");
    if (dataLS) {
      setSigned(true);
    } else {
      <Navigate to="/signin" />;
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    const checkIsLogged = async () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          let data = {
            email: user.email,
            uid: user.uid,
          };

          localStorage.setItem("@userInfo", JSON.stringify(data));
          setLoading(false);
        } else {
          setLoading(false);
          setUser({});
        }
      });
    };

    checkIsLogged();
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

  return children;
};
