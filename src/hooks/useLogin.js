import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// firebase
import { auth } from '../firebase/firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { UserContext } from '../contexts/UserContext';

export const useAuthentication = () => {
  const { setUser, setSigned } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(true);

  const handleLogin = async (data) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((data) => {
        let userData = {
          uid: data.user.uid,
          email: data.user.email,
        };

        setUser(userData);
        setSigned(true);
        setLoading(false);
        navigate('/');
        toast.success('Bem vindo! :)');
      })
      .catch((error) => {
        console.log(error);
        setSigned(false);
        if (error.code === 'auth/invalid-email') {
          toast.error('E-mail inválido! Tente novamente...');
          setLoading(false);
        } else if (error.code === 'auth/wrong-password') {
          toast.error('Senha não confere, tente novamente!');
          setLoading(false);
        } else if (error.code === 'auth/user-not-found') {
          toast.error('Usuário não encontrado...');
          setLoading(false);
        }
      });
  };

  return { handleLogin, loading, error };
};
