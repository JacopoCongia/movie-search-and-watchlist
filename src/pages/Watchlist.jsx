import useWatchlist from "../../hooks/use-watchlist";
import Movie from "../components/Movie";
import { useEffect } from "react";

function Watchlist() {
  const { watchlist, getSavedWatchlist } = useWatchlist();

  useEffect(() => {
    getSavedWatchlist();
  }, []);

  const watchlistEl = watchlist.map((movie) => {
    return (
      <Movie
        key={movie.imdbID}
        movie={movie}
      />
    );
  });

  return (
    <>
      {watchlist.length > 0 ? (
        <>
          <div className="max-w-[1200px] m-auto text-white text-center flex flex-wrap justify-center gap-5 p-10">
            {watchlistEl}
          </div>
        </>
      ) : (
        <h1 className="pt-[5em] m-auto text-3xl text-center text-white">
          Nothing here yet! Why don&#39;t you add some movies...
        </h1>
      )}
    </>
  );
}

export default Watchlist;
