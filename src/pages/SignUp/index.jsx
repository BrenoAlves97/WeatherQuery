import { useState } from "react";
import { Link } from "react-router-dom";

import { useCreateAccount } from "../../hooks/useCreateAccount";

// components
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";

import "./signup.scss";
import { toast } from "react-toastify";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleCreate, loading } = useCreateAccount();

  const registerNewUser = async (e) => {
    e.preventDefault();

    if (name.length === 0 || password.length === 0 || email.length === 0) {
      toast.warn("Favor, preencha todos os campos!");
      return;
    }

    let newUser = {
      name,
      email,
      password,
    };

    const res = await handleCreate(newUser);
    console.log(res);

    clearInputs();
  };

  const clearInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="signup-container">
      <form onSubmit={registerNewUser}>
        <h3>Criar conta</h3>

        <Label title="Nome:">
          <Input type="text" placeholder="Digite seu nome..." value={name} onchange={setName} />
        </Label>

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
          {!loading ? "Criar conta" : <div className="spinner"></div>}
        </button>

        <p className="infos">
          Já possui conta? <Link to="/signin">Acessar</Link>
        </p>
      </form>
    </div>
  );
};
