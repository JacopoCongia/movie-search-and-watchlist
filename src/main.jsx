import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { WatchlistContextProvider } from "../context/watchlistContext";
import { SearchContextProvider } from "../context/searchContext.jsx";
import { AuthContextProvider } from "../context/authContext.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <WatchlistContextProvider>
          <App />
        </WatchlistContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
