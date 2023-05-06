import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// firebase
import { auth } from "../firebase/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

import { UserContext } from "../contexts/UserContext";

export const useAuthentication = () => {
  const { setUser, setSigned } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((data) => {
        let userData = {
          uid: data.user.uid,
          email: data.user.email,
        };

        setUser(userData);
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { handleLogin, loading };
};
