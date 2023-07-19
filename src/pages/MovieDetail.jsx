import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovie } from "../../api";
import useWatchlist from "../../hooks/use-watchlist";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState({});
  const { watchlist, setWatchlist, handleAdd, handleRemove } = useWatchlist();

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
        // } catch (err) {
        //   setError(err);
      } finally {
        setLoading(false);
      }
    }
    retrieveMovie(id);
  }, [id]);

  useEffect(() => {
    if (watchlist.length > 0) {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }
  }, [watchlist]);

  if (loading) {
    return <h1 className="pt-[100px] text-center text-white">Loading...</h1>;
  }

  return (
    <>
      <Link
        className="p-5 text-white"
        to=".."
      >
        ← Back to search
      </Link>
      <div className="flex flex-col items-center justify-center gap-[1.5em] p-[3em] text-white">
        <img
          className="max-w-[200px]] rounded border"
          src={movie.Poster}
          alt="The movie poster"
        />
        <div className="flex flex-col">
          <div className="mb-[2em] flex flex-col items-center justify-center">
            <h1 className="text-[2rem] font-bold">{movie.Title}</h1>
            <p className="mb-5 text-[1.5rem]">({movie.Year})</p>
            {!inWatchlist ? (
              <button
                onClick={(e) => handleAdd(e, movie)}
                className={`${
                  inWatchlist ? "bg-green-700" : ""
                } rounded-[2em] border px-[1.5em] py-[0.2em] text-[0.875rem] hover:bg-green-700`}
              >
                Add to watchlist
              </button>
            ) : (
              <button
                onClick={(e) => handleRemove(e, movie)}
                className="bg-green-700 rounded-[2em] border px-[1.5em] py-[0.2em] text-[0.875rem] group hover:after:content-['Remove'] hover:bg-red-700"
              >
                <span className="group-hover:hidden">In Watchlist</span>
              </button>
            )}
          </div>
          <p>Directed by: {movie.Director}</p>
          <p>Written by: {movie.Writer}</p>
          <p>Plot: {movie.Plot}</p>
        </div>
      </div>
    </>
  );
}

export default MovieDetail;
