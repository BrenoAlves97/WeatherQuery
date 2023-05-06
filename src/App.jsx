import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// context
import { UserProvider } from "./contexts/UserContext";

// react-router
import { RoutesApp } from "./routes/routes";

export const App = () => {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <ToastContainer autoClose={2000} position="top-right" style={{ fontSize: "1.6rem" }} />
          <RoutesApp />
        </BrowserRouter>
      </UserProvider>
    </>
  );
};
