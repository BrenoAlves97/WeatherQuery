import { Link } from "react-router-dom";

// file notfound
import notfound from "../../assets/notfound.svg";

//styles
import "./notfound.scss";

export const Notfound = () => {
  return (
    <div className="notfound-container">
      <div className="content">
        <div className="box-img">
          <img src={notfound} alt="Imagem de uma nave espacial" />
        </div>
        <p>
          Retornar a página
          <Link to="/">Inicial</Link>
        </p>
      </div>
    </div>
  );
};
