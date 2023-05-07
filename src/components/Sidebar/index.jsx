import { useSignOut } from "../../hooks/useSignOut";

import "./sidebar.scss";

export const Sidebar = () => {
  const { handleSignOut, loading } = useSignOut();

  return (
    <div className="sidebar-container">
      <div className="sidebar-content">
        <h2>
          Clima <span>tempo</span>
        </h2>

        <button onClick={handleSignOut}>{loading ? "Saindo..." : "Sair"}</button>
      </div>
    </div>
  );
};
