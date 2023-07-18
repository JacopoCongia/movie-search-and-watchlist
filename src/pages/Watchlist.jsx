import { useEffect } from "react";
import useWatchlist from "../../hooks/use-watchlist";

function Watchlist() {
  const { watchlist, setWatchlist } = useWatchlist();

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist"));
    setWatchlist(savedWatchlist);
  }, [setWatchlist]);

  const watchlistEl = watchlist.map((movie) => {
    return (
      <div
        className="w-[150px] flex flex-col items-center"
        key={movie.imdbID}
      >
        <img
          className="w-[100%]"
          src={movie.Poster}
        />
        <h1 className="text-white text-center mt-[0.5em] text-[0.875rem]">
          {movie.Title}
        </h1>
      </div>
    );
  });

  return (
    <div className="flex justify-center p-10 gap-5 flex-wrap">
      {watchlistEl}
    </div>
  );
}

export default Watchlist;
