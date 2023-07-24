import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { WatchlistContextProvider } from "../context/watchlistContext";
import { SearchContextProvider } from "../context/searchContext.jsx";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchContextProvider>
        <WatchlistContextProvider>
          <App />
        </WatchlistContextProvider>
      </SearchContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
