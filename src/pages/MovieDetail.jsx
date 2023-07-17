import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovie } from "../../api";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    async function retrieveMovie(id) {
      try {
        setLoading(true);
        const data = await getMovie(id);
        setMovie(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    retrieveMovie(id);
  }, [id]);

  console.log(movie);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return <h1 className="text-white">{movie.Title}</h1>;
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
