import { useState } from "react";
import { Link } from "react-router-dom";

// components
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";

import "./signup.scss";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="signup-container">
      <form onSubmit={() => {}}>
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
          {/* {!loading ? "Criar conta" : <div className="spinner"></div>} */}
          Criar conta...
        </button>

        <p className="infos">
          Já possui conta? <Link to="/signin">Acessar</Link>
        </p>
      </form>
    </div>
  );
};
