import { Link } from "react-router-dom";
import useWatchlist from "../../hooks/use-watchlist";
import Movie from "../components/Movie";
import useAuth from "../../hooks/use-auth";

function Watchlist() {
  const { watchlist } = useWatchlist();
  const { currentUser } = useAuth();

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
      {!currentUser ? (
        <div className="mt-[5em] px-[2em] text-3xl text-white flex flex-col items-center">
          <div>
            <Link
              to="/account"
              className="text-[#ffa060] hover:font-bold hover:underline mr-2"
            >
              Log in
            </Link>
            to save your watchlist...
          </div>
          <div className="mt-3  text-[1.5rem]">
            <Link to="/register">
              Or
              <span className="text-[#ffa060] hover:font-bold hover:underline ml-2">
                sign up here!
              </span>
            </Link>
          </div>
        </div>
      ) : watchlist.length > 0 ? (
        <div className="max-w-[1200px] m-auto text-white text-center flex flex-wrap justify-center gap-5 p-10">
          {watchlistEl}
        </div>
      ) : (
        <h1 className="pt-[5em] px-[2em] m-auto text-3xl text-center text-white">
          Nothing here yet! Why don&#39;t you add some movies...
        </h1>
      )}
    </>
  );
}

export default Watchlist;
