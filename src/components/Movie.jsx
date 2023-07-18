import { Link } from "react-router-dom";
import { MdBookmarkAdd, MdBookmarkRemove } from "react-icons/md";
import useWatchlist from "../../hooks/use-watchlist";

function Movie({ movie }) {
  const { watchlist } = useWatchlist();

  // Check if the movie is already in the watchlist
  const inWatchlist = watchlist.some((el) => {
    return el.imdbID === movie.imdbID;
  });

  return (
    <Link
      className="relative mb-5 rounded-xl flex flex-col items-center bg-[#424242] p-[1.2em] max-w-[80%] min-[500px]:max-w-[200px]"
      to={movie.imdbID}
    >
      {inWatchlist ? (
        <MdBookmarkRemove className="absolute text-[1.7rem] right-[11%] top-[6%]"></MdBookmarkRemove>
      ) : (
        <MdBookmarkAdd className="absolute text-[1.7rem] right-[11%] top-[6%]"></MdBookmarkAdd>
      )}
      <img src={movie.Poster} />
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
