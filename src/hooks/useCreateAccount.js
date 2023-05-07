import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConnection";

export const useCreateAccount = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (newUser) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then(async () => {
        await addDoc(collection(db, "users"), {
          user: newUser.name,
          createdAt: new Date(),
          email: newUser.email,
          password: newUser.password,
          id: Math.random(),
        });
      })
      .then(() => {
        toast.success("Usuário cadastrado!");
        navigate("/signin");
      })
      .catch((error) => {
        toast.error("Houve algum erro...");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { handleCreate, loading };
};
