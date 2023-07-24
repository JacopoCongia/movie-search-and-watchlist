import { Link, useLocation } from "react-router-dom";
import { MdBookmarkAdd, MdBookmarkRemove } from "react-icons/md";
import useWatchlist from "../../hooks/use-watchlist";

function Movie({ movie, searching }) {
  const { watchlist, handleAdd, handleRemove } = useWatchlist();
  const location = useLocation();

  // Check if the movie is already in the watchlist
  const inWatchlist = watchlist?.some((el) => {
    return el.imdbID === movie.imdbID;
  });

  return (
    <Link
      className={`relative mb-2 flex max-w-[80%] flex-col justify-between items-center rounded bg-[#424242] pb-[1em] drop-shadow-md hover:bg-[#575757] min-[500px]:max-w-[200px] ${
        inWatchlist && searching ? "bg-green-900 hover:bg-green-800" : ""
      }`}
      to={`/${movie.imdbID}`}
      state={{ from: location.pathname }}
    >
      {inWatchlist ? (
        <MdBookmarkRemove
          onClick={(e) => handleRemove(e, movie)}
          className="absolute right-[3%] top-[2%] text-[2rem] hover:text-red-500"
        ></MdBookmarkRemove>
      ) : (
        <MdBookmarkAdd
          onClick={(e) => handleAdd(e, movie)}
          className="absolute right-[3%] top-[2%] text-[2rem] drop-shadow hover:text-green-500"
        ></MdBookmarkAdd>
      )}
      {movie.Poster === "N/A" ? (
        <div className="flex h-[235px] w-[200px] items-center justify-center bg-[#616161]">
          No poster available
        </div>
      ) : (
        <img
          className="object-cover w-[100%] min-[500px]:h-[300px] rounded-t"
          src={movie.Poster}
        />
      )}
      <div className="flex flex-col mt-[.3em] items-center">
        <h1 className="mt-[0.5em] px-[1em] text-[1.3rem] min-[500px]:text-[0.95rem]">
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
