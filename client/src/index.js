import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { UserAuthContextProvider } from "./context/AuthContext";
import theme from "./theme";
import { ThemeProvider } from '@mui/material/styles';
import { store } from "./store/index";
import { Provider } from "react-redux";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <UserAuthContextProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </UserAuthContextProvider>
    </Provider>
  </React.StrictMode>
);
