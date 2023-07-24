import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import useSearch from "../../hooks/use-search";
import { getMoreMovies } from "../../api";
import { useSearchParams } from "react-router-dom";

function Home() {
  const { movies, setMovies, loading, setLoading, error, setError } =
    useSearch();
  const [page, setPage] = useState(2);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentSearch = searchParams.get("search");

  async function handleClick() {
    setPage((prevPage) => prevPage + 1);
    setLoading(true);
    setError(null);
    try {
      const nextPage = await getMoreMovies(currentSearch, page);

      console.log(nextPage, page);
      if (nextPage.Response !== "False") {
        setMovies([...movies, ...nextPage.Search]);
      } else {
        throw new Error("No more movies with this title");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   if (movies?.length > 0) {
  //     sessionStorage.setItem("movies", JSON.stringify(movies));
  //   }
  // }, [movies]);

  // useEffect(() => {
  //   const savedMovies = JSON.parse(sessionStorage.getItem("movies"));
  //   setMovies(savedMovies);
  // }, [setMovies]);

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

  if (!movies.length) {
    return (
      <>
        <h1 className="pt-[5em] px-[3em] m-auto text-3xl text-center text-white">
          Start searching for your favorite movies!
        </h1>
        ;
      </>
    );
  }

  if (loading) {
    if (movies.length) {
      return (
        <>
          <div className="flex flex-col">
            <div className="m-auto flex max-w-[1200px] flex-wrap justify-center gap-5 pt-[5em] px-[2em] text-center text-white">
              {movieEl}
            </div>
          </div>
          {movies.length && (
            <button
              onClick={handleClick}
              className="text-white py-8 mt-5 hover:bg-neutral-600 bg-neutral-700 w-[100%]"
            >
              {loading ? (
                <div className="lds-dual-ring"></div>
              ) : (
                "Load More Movies"
              )}
            </button>
          )}
        </>
      );
    }
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
      {movies.length && (
        <button
          onClick={handleClick}
          className="text-white py-8 mt-5 hover:bg-neutral-600 bg-neutral-700 w-[100%]"
        >
          {loading ? <div className="lds-dual-ring"></div> : "Load More Movies"}
        </button>
      )}
    </>
  );
}

export default Home;
