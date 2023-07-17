import { Link } from "react-router-dom";

function Movie({ movie }) {
  return (
    <Link
      className="mb-5 rounded-xl flex flex-col items-center bg-[#313131] p-5 max-w-[200px]"
      to={movie.imdbID}
    >
      <img src={movie.Poster} />
      <div>
        <h1 className="mt-2">{movie.Title}</h1>
        <h2>({movie.Year})</h2>
      </div>
    </Link>
  );
}

export default Movie;
