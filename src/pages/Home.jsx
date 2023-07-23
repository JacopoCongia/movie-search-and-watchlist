import { useEffect } from "react";
import Movie from "../components/Movie";
import useSearch from "../../hooks/use-search";

function Home() {
  const { movies, setMovies, loading, error } = useSearch();

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
        searching
      >
        {movie.Title}
      </Movie>
    );
  });

  if (loading) {
    return (
      <>
        <h1 className="pt-[100px] text-center text-white">Loading...</h1>;
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1 className="pt-[100px] text-center text-white">{error}</h1>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="m-auto flex max-w-[1200px] flex-wrap justify-center gap-5 pt-[5em] px-[2em] text-center text-white">
          {movieEl}
        </div>
      </div>
    </>
  );
}

export default Home;
