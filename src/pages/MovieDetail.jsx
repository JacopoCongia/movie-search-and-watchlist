import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getMovie } from "../../api";
import useWatchlist from "../../hooks/use-watchlist";
import useAuth from "../../hooks/use-auth";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const { watchlist, handleAdd, handleRemove } = useWatchlist();
  const { currentUser } = useAuth();

  const location = useLocation();

  // Check if the movie is already in the watchlist
  const inWatchlist = watchlist.some((el) => {
    return el.imdbID === movie.imdbID;
  });

  useEffect(() => {
    async function retrieveMovie(id) {
      try {
        setLoading(true);
        const data = await getMovie(id);
        setMovie(data);
      } finally {
        setLoading(false);
      }
    }
    retrieveMovie(id);
  }, [id]);

  if (loading) {
    return (
      <h1 className="pt-[5em] m-auto text-3xl text-center text-white">
        Loading movie details...
      </h1>
    );
  }

  return (
    <div className="flex flex-col items-start mb-[2em] text-center ">
      <Link
        className="px-[1em] py-[.5em] m-[1em] text-white rounded-[2em] border hover:bg-neutral-700"
        to={location.state.from}
      >
        ← Back to {location.state.from === "/" ? "Home" : "Watchlist"}
      </Link>
      <div className="flex flex-col m-auto items-center gap-[1.5em] px-[3em] mt-[1em] text-white max-w-[1000px] min-[1085px]:flex-row min-[1085px]:items-start">
        <img
          className="max-w-[200px]] rounded border"
          src={movie.Poster}
          alt="The movie poster"
        />
        <div>
          <div className="mb-[2em] flex flex-col items-center justify-center min-[1085px]:justify-start min-[1085px]:flex-row min-[1085px]:gap-3 min-[1085px]:items-baseline">
            <h1 className="text-[1.2rem] min-[675px]:text-[2rem] font-bold min-[675px]:text-left">
              {movie.Title}
            </h1>
            <p className="text-[1rem] mt-[-0.3em] min-[675px]:text-[1.5rem] mb-[1em] min-[1085px]:m-0">
              ({movie.Year})
            </p>
            {!inWatchlist ? (
              <button
                disabled={!currentUser}
                onClick={(e) => handleAdd(e, movie)}
                className={`${
                  !currentUser
                    ? "bg-neutral-700 opacity-50 cursor-not-allowed hover:bg-neutral-700"
                    : ""
                } ${
                  inWatchlist ? "bg-green-700" : ""
                } rounded-[2em] min-[1085px]:ml-auto border px-[1.5em] whitespace-nowrap py-[0.2em] text-[0.875rem] hover:bg-green-700`}
              >
                Add to watchlist
              </button>
            ) : (
              <button
                disabled={!currentUser}
                onClick={(e) => handleRemove(e, movie)}
                className={`bg-green-700 min-[1085px]:ml-auto rounded-[2em] border px-[1.5em] py-[0.2em] text-[0.875rem] group hover:after:content-['Remove'] hover:bg-red-700`}
              >
                <span className="group-hover:hidden whitespace-nowrap">
                  In Watchlist
                </span>
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2 min-[1085px]:text-left">
            <p>
              <span className="font-bold">Directed by: </span>
              {movie.Director}
            </p>
            <p>
              <span className="font-bold">Written by: </span>
              {movie.Writer}
            </p>
            <p>
              <span className="font-bold">Starring: </span>
              {movie.Actors}
            </p>
            <p>
              <span className="font-bold">Genre: </span>
              {movie.Genre}
            </p>
            <p>
              <span className="font-bold">Plot: </span>
              {movie.Plot}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
