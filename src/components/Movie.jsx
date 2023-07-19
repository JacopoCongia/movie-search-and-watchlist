import { Link } from "react-router-dom";
import { useEffect } from "react";
import { MdBookmarkAdd, MdBookmarkRemove } from "react-icons/md";
import useWatchlist from "../../hooks/use-watchlist";

function Movie({ movie }) {
  const { watchlist, handleAdd, handleRemove } = useWatchlist();

  // Check if the movie is already in the watchlist
  const inWatchlist = watchlist?.some((el) => {
    return el.imdbID === movie.imdbID;
  });

  useEffect(() => {
    if (watchlist.length > 0) {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
  }, [watchlist]);

  return (
    <Link
      className={`relative mb-5 flex max-w-[80%] flex-col items-center rounded-xl bg-[#424242] p-[1.2em] drop-shadow-md hover:bg-[#575757] min-[500px]:max-w-[200px] ${
        inWatchlist ? "bg-green-900 hover:bg-green-800" : ""
      }`}
      to={movie.imdbID}
    >
      {inWatchlist ? (
        <MdBookmarkRemove
          onClick={(e) => handleRemove(e, movie)}
          className="absolute right-[11%] top-[6%] text-[1.7rem] hover:text-red-500"
        ></MdBookmarkRemove>
      ) : (
        <MdBookmarkAdd
          onClick={(e) => handleAdd(e, movie)}
          className="absolute right-[11%] top-[6%] text-[1.7rem] drop-shadow hover:text-green-500"
        ></MdBookmarkAdd>
      )}
      {movie.Poster === "N/A" ? (
        <div className="flex h-[235px] w-[100%] items-center justify-center bg-[#616161]">
          No poster available
        </div>
      ) : (
        <img src={movie.Poster} />
      )}
      <div>
        <h1 className="mt-[0.5em] text-[1.3rem] min-[500px]:text-[0.95rem]">
          {movie.Title}
        </h1>
        <h2 className="text-[1rem] min-[500px]:text-[0.8rem]">
          ({movie.Year})
        </h2>
      </div>
    </Link>
  );
}

export default Movie;
