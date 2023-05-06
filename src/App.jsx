import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// react-router
import { RoutesApp } from "./routes/routes";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer autoClose={2000} position="top-right" />
        <RoutesApp />
      </BrowserRouter>
    </>
  );
};
