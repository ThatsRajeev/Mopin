import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { UserAuthContextProvider } from "./context/AuthContext";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <App />
    </UserAuthContextProvider>
  </React.StrictMode>
);
