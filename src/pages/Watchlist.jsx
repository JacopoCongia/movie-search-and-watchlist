import useWatchlist from "../../hooks/use-watchlist";

function Watchlist() {
  const { watchlist } = useWatchlist();

  const watchlistEl = watchlist.map((movie) => {
    return (
      <div
        className="flex w-[150px] flex-col items-center"
        key={movie.imdbID}
      >
        <img
          className="w-[100%]"
          src={movie.Poster}
        />
        <h1 className="mt-[0.5em] text-center text-[0.875rem] text-white">
          {movie.Title}
        </h1>
      </div>
    );
  });

  return (
    <div className="flex flex-wrap justify-center gap-5 p-10">
      {watchlistEl}
    </div>
  );
}

export default Watchlist;
