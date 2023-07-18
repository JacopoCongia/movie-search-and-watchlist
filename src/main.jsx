import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { WatchlistContextProvider } from "../context/watchlistContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WatchlistContextProvider>
      <App />
    </WatchlistContextProvider>
  </React.StrictMode>
);
