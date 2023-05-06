import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// context
import { UserProvider } from "./contexts/UserContext";

// react-router
import { RoutesApp } from "./routes/routes";

export const App = () => {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <ToastContainer autoClose={2000} position="top-right" />
          <RoutesApp />
        </BrowserRouter>
      </UserProvider>
    </>
  );
};
