export async function getMovies(title) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=50a0c6e&s=${title}`
  );

  const data = await response.json();

  return data;
}

export async function getMovie(id) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=50a0c6e&i=${id}`
  );

  const data = await response.json();

  return data;
}
