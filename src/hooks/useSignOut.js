import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConnection";

import { UserContext } from "../contexts/UserContext";

export const useSignOut = () => {
  const { setSigned, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await signOut(auth)
      .then(() => {
        localStorage.removeItem("@userInfo");
        setSigned(false);
        setUser(null);
        setLoading(false);
        navigate("/signin");
        toast.success("Até logo! :)");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return { handleSignOut, loading };
};
