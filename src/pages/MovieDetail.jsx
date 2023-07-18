import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovie } from "../../api";
import useWatchlist from "../../hooks/use-watchlist";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState({});
  const { watchlist, setWatchlist } = useWatchlist();

  // Check if the movie is already in the watchlist
  const inWatchlist = watchlist.some((el) => {
    return el.imdbID === movie.imdbID;
  });

  function handleClick() {
    if (!inWatchlist) {
      setWatchlist((prevWatchlist) => {
        return [...prevWatchlist, movie];
      });
    }
  }

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
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  if (loading) {
    return <h1 className="text-white">Loading...</h1>;
  }

  return (
    <>
      <Link
        className="text-white p-5"
        to=".."
      >
        ← Back to search
      </Link>
      <div className="text-white flex flex-col gap-[1.5em] items-center justify-center p-[3em]">
        <img
          className="border rounded max-w-[200px]]"
          src={movie.Poster}
          alt="The movie poster"
        />
        <div className="flex flex-col">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-[2rem] font-bold">{movie.Title}</h1>
            <p className="text-[1.5rem] mb-5">({movie.Year})</p>
            <button
              onClick={handleClick}
              className={`${
                inWatchlist ? "bg-green-700" : ""
              } border rounded-[2em] px-[1.5em] py-[0.2em] text-[0.875rem] hover:bg-green-700`}
            >
              {inWatchlist ? "In watchlist" : "Add to watchlist"}
            </button>
            <button className=""></button>
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

// {
//   "Title": "Blade Runner",
//   "Year": "1982",
//   "Rated": "R",
//   "Released": "25 Jun 1982",
//   "Runtime": "117 min",
//   "Genre": "Action, Drama, Sci-Fi",
//   "Director": "Ridley Scott",
//   "Writer": "Hampton Fancher, David Webb Peoples, Philip K. Dick",
//   "Actors": "Harrison Ford, Rutger Hauer, Sean Young",
//   "Plot": "A blade runner must pursue and terminate four replicants who stole a ship in space and have returned to Earth to find their creator.",
//   "Language": "English, German, Cantonese, Japanese, Hungarian, Arabic, Korean",
//   "Country": "United States",
//   "Awards": "Nominated for 2 Oscars. 13 wins & 19 nominations total",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BNzQzMzJhZTEtOWM4NS00MTdhLTg0YjgtMjM4MDRkZjUwZDBlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   "Ratings": [
//       {
//           "Source": "Internet Movie Database",
//           "Value": "8.1/10"
//       },
//       {
//           "Source": "Rotten Tomatoes",
//           "Value": "89%"
//       },
//       {
//           "Source": "Metacritic",
//           "Value": "84/100"
//       }
//   ],
//   "Metascore": "84",
//   "imdbRating": "8.1",
//   "imdbVotes": "791,411",
//   "imdbID": "tt0083658",
//   "Type": "movie",
//   "DVD": "30 Oct 2001",
//   "BoxOffice": "$32,914,489",
//   "Production": "N/A",
//   "Website": "N/A",
//   "Response": "True"
// }
