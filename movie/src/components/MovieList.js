import React from "react";

function MovieList(props) {
  const FavoriteComponent = props.favoriteComponent;
  return (
    <>
      <li className="image-container d-flex justify-content-start m-3">
        <img src={props.movie.Poster} alt="movie-poster" />
        <div
          onClick={() => props.handleFavoritesClick(props.movie)}
          className="overlay d-flex align-items-center justify-content-center"
        >
          <FavoriteComponent />
        </div>
      </li>
    </>
  );
}

export default MovieList;
