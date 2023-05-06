import { Routes, Route } from "react-router-dom";

// pages
import { Home } from "../pages/Home";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Private } from "../pages/Private";

export const RoutesApp = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Private>
            <Home />
          </Private>
        }
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};
