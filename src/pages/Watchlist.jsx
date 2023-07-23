import useWatchlist from "../../hooks/use-watchlist";
import Movie from "../components/Movie";

function Watchlist() {
  const { watchlist } = useWatchlist();

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
        <div className="text-white text-center flex flex-wrap justify-center gap-5 p-10">
          {watchlistEl}
        </div>
      ) : (
        <h1 className="text-white text-center p-10">
          Nothing here yet! Why don&#39;t you add some movies...
        </h1>
      )}
    </>
  );
}

export default Watchlist;
