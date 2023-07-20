import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Movie from "../components/Movie";
import { getMovies } from "../../api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState({});

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
      // } catch (err) {
      //   setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (movies?.length > 0) {
      sessionStorage.setItem("movies", JSON.stringify(movies));
    }
  }, [movies]);

  useEffect(() => {
    const savedMovies = JSON.parse(sessionStorage.getItem("movies"));
    setMovies(savedMovies);
  }, []);

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
    return (
      <>
        <SearchBar handleSubmit={handleSubmit} />
        <h1 className="pt-[100px] text-center text-white">Loading...</h1>;
      </>
    );
  }

  return (
    <>
      <div>
        <SearchBar handleSubmit={handleSubmit} />
        <div className="m-auto flex max-w-[1200px] flex-wrap items-start justify-center gap-5 pt-[5em] px-[2em] text-center text-white">
          {movieEl}
        </div>
      </div>
    </>
  );
}

export default Home;
