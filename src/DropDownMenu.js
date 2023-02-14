import React from "react";

const DropDownMenu = ({ moviesResponse, fetchSigleMovie }) => {
  const dropdown = document.querySelector(".dropdown");
  const dropdown2 = document.querySelector(".close");
  const tutorial = document.querySelector(".tutorial");

  return (
    <div className='dropdown-menu' id='dropdown-menu' role='menu'>
      <div className='dropdown-content'>
        {moviesResponse === undefined
          ? null
          : moviesResponse.map((movie) =>
              movie.Poster === "N/A" ? null : (
                <a
                  href='#1'
                  className='dropdown-item'
                  onClick={() => {
                    fetchSigleMovie(movie.imdbID, movie.Title);
                    dropdown.classList.remove("is-active");
                    dropdown2.classList.remove("is-active");
                    tutorial.classList.add("is-hidden");
                  }}
                >
                  <img
                    src={movie.Poster === "N/A" ? null : movie.Poster}
                    alt='movie poster'
                  />
                  {movie.Title} {movie.Year}
                </a>
              )
            )}
      </div>
    </div>
  );
};

export default DropDownMenu;
