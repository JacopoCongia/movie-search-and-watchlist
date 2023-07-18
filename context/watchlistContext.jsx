import { createContext, useState } from "react";

const WatchlistContext = createContext();

function WatchlistContextProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);

  return (
    <WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export { WatchlistContextProvider };
export default WatchlistContext;
