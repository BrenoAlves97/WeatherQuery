import { useSignOut } from "../../hooks/useSignOut";

import "./sidebar.scss";

export const Sidebar = () => {
  const { handleSignOut, loading } = useSignOut();

  return (
    <div className="sidebar-container">
      <div className="sidebar-content">
        <h2>
          q<span>Weather</span>
        </h2>

        <button onClick={handleSignOut}>
          {loading ? <div className="spinner"></div> : "Sair"}
        </button>
      </div>
    </div>
  );
};
