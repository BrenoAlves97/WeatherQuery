// components
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

import "./home.scss";

export const Home = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="content">
        <Header />
      </div>
    </div>
  );
};
