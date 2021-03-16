import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorites from "./components/AddFavorites";
import RemoveFavorites from "./components/RemoveFavorites";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavoritesList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async (searchValue) => {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${searchValue}&apikey=api`
    );
    const responseJson = await response.json();
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem("movie-app-favorites")
    );
    setFavoritesList(movieFavorites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("movie-app-favorites", JSON.stringify(items));
  };

  const addFavoritesMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavoritesList(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavoritesList(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>

      <ul className="row">
        {movies.map((movie, index) => (
          <MovieList
            key={index}
            movie={movie}
            handleFavoritesClick={addFavoritesMovie}
            favoriteComponent={AddFavorites}
          />
        ))}
      </ul>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favorites" />
      </div>
      <ul className="row">
        {favorites
          ? favorites.map((favorite, index) => (
              <MovieList
                key={index}
                movie={favorite}
                handleFavoritesClick={removeFavoriteMovie}
                favoriteComponent={RemoveFavorites}
              />
            ))
          : null}
      </ul>
    </div>
  );
}

export default App;

//ff71ec14
