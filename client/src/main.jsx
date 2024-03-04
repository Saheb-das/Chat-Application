// external imports
import React from "react";
import ReactDOM from "react-dom/client";
import { StoreProvider } from "easy-peasy";

// internal imports
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StoreProvider store={store}>
    <App />
  </StoreProvider>
);
