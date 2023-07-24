export async function getMovies(title) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=50a0c6e&s=${title}&type=movie`
  );

  const data = await response.json();
  return data;
}

export async function getMoreMovies(title, page) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=50a0c6e&s=${title}&type=movie&page=${page}`
  );

  const data = await response.json();
  return data;
}

export async function getMovie(id) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=50a0c6e&i=${id}&plot=full`
  );

  const data = await response.json();

  return data;
}
