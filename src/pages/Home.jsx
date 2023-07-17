import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Movie from "../components/Movie";
import { getMovies } from "../../api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  function handleSubmit(e, text) {
    e.preventDefault();
    if (text) {
      const title = text.replaceAll(" ", "+");
      retrieveMovie(title);
    }
  }

  async function retrieveMovie(title) {
    try {
      setLoading(true);
      const data = await getMovies(title);
      setMovies(data.Search);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  const movieEl = movies?.map((movie) => {
    return (
      <Movie
        key={movie.imdbID}
        movie={movie}
      >
        {movie.Title}
      </Movie>
    );
  });

  if (loading) {
    return <h1 className="text-white text-center pt-[100px]">Loading...</h1>;
  }

  return (
    <>
      <div>
        <SearchBar handleSubmit={handleSubmit} />
        <div className="gap-5 flex flex-wrap text-white pt-[5em] items-start justify-center text-center">
          {movieEl}
        </div>
      </div>
    </>
  );
}

export default Home;
