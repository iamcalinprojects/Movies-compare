import React from "react";
import axios from "axios";

const DropDownMenu = ({ moviesResponse, fetchSigleMovie }) => {
  const dropdown = document.querySelector(".dropdown");
  const dropdown2 = document.querySelector(".close");
  const tutorial = document.querySelector(".tutorial");

  return (
    <div class='dropdown-menu' id='dropdown-menu' role='menu'>
      <div class='dropdown-content'>
        {moviesResponse === undefined
          ? null
          : moviesResponse.map((movie) =>
              movie.Poster === "N/A" ? null : (
                <a
                  className='dropdown-item'
                  onClick={() => {
                    fetchSigleMovie(movie.imdbID, movie.Title);
                    dropdown.classList.remove("is-active");
                    dropdown2.classList.remove("is-active");
                    tutorial.classList.add("is-hidden");
                  }}
                >
                  <img src={movie.Poster === "N/A" ? null : movie.Poster} />
                  {movie.Title} {movie.Year}
                </a>
              )
            )}
      </div>
    </div>
  );
};

export default DropDownMenu;
