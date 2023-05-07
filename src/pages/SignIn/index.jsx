import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuthentication } from "../../hooks/useLogin";
import { UserContext } from "../../contexts/UserContext";

// components
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";

import "./signin.scss";

export const SignIn = () => {
  const { handleLogin, loading } = useAuthentication();
  const { signed } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email.length === 0 || password.length === 0) {
      toast.warn("Favor preencher todos os campos...");
      clearInputs();
      return;
    }

    const data = {
      email,
      password,
    };

    const res = await handleLogin(data);
    console.log(res);
  };

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  if (signed) return <Navigate to="/" />;

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit}>
        <h3>Acessar conta</h3>

        <Label title="E-mail:">
          <Input
            type="email"
            placeholder="Digite seu e-mail..."
            value={email}
            onchange={setEmail}
          />
        </Label>

        <Label title="Senha:">
          <Input
            type="password"
            placeholder="Digite sua senha..."
            value={password}
            onchange={setPassword}
          />
        </Label>

        <button className="btn-login">
          {!loading ? "Acessar" : <div className="spinner"></div>}
        </button>

        <p className="infos">
          Não possui conta? <Link to="/signup">Criar conta</Link>
        </p>
      </form>
    </div>
  );
};
