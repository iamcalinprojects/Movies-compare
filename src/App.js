import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DropDownMenu from "./DropDownMenu";
import MovieDetails from "./MovieDetails";

const App = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieTitle2, setMovieTitle2] = useState("");
  const [moviesResponse, setMoviesResponse] = useState([]);
  const [moviesResponse2, setMoviesResponse2] = useState([]);
  const [singleMoviesResponse, setSingleMoviesResponse] = useState({});
  const [singleMoviesResponse2, setSingleMoviesResponse2] = useState({});

  useEffect(() => {
    if (
      singleMoviesResponse.Awards !== undefined &&
      singleMoviesResponse2.Awards !== undefined &&
      movieTitle.length !== 0 &&
      movieTitle2.length !== 0
    ) {
      compareMovies(singleMoviesResponse, singleMoviesResponse2);
    }

    const timer = setTimeout(() => {
      fetchData();
      fetchData2();
    }, 500);

    return () => clearTimeout(timer);
  }, [movieTitle, movieTitle2, singleMoviesResponse, singleMoviesResponse2]);

  function compareMovies(movie1, movie2) {
    //Temporarely using this way to compare statistics
    const mov1 = parseInt(
      movie1.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
    );
    const mov1Exception = isNaN(mov1) ? 0 : mov1;

    const mov2 = parseInt(
      movie2.BoxOffice.replace(/\$/g, "").replace(/,/g, "")
    );
    const mov2Exception = isNaN(mov2) ? 0 : mov2;

    if (mov1Exception > mov2Exception) {
      // dropdown.forEach((left) => left.classList.remove("is-primary"));
      // dropdown.classList.remove("is-primary");
      document.querySelector("#right .box").classList.remove("is-primary");
      document.querySelector("#right .box").classList.add("is-warning");
      document.querySelector("#left .box").classList.remove("is-warning");
      document.querySelector("#left .box").classList.add("is-primary");
    } else if (mov2Exception > mov1Exception) {
      document.querySelector("#right .box").classList.add("is-primary");
      document.querySelector("#right .box").classList.remove("is-warning");
      document.querySelector("#left .box").classList.add("is-warning");
      document.querySelector("#left .box").classList.remove("is-primary");
    }
    const metaScore = parseInt(movie1.Metascore);
    const metaException = isNaN(metaScore) ? 0 : metaScore;

    const metaScore2 = parseInt(movie2.Metascore);
    const metaException2 = isNaN(metaScore2) ? 0 : metaScore2;

    if (metaException > metaException2) {
      document
        .querySelector("#right .metascore")
        .classList.remove("is-primary");
      document.querySelector("#right .metascore").classList.add("is-warning");
      document.querySelector("#left .metascore").classList.remove("is-warning");
      document.querySelector("#left .metascore").classList.add("is-primary");
    } else if (metaException < metaException2) {
      document.querySelector("#right .metascore").classList.add("is-primary");
      document
        .querySelector("#right .metascore")
        .classList.remove("is-warning");
      document.querySelector("#left .metascore").classList.add("is-warning");
      document.querySelector("#left .metascore").classList.remove("is-primary");
    }

    const imdbRating = parseFloat(movie1.imdbRating);
    const imdbRating2 = parseFloat(movie2.imdbRating);
    if (imdbRating > imdbRating2) {
      document.querySelector("#right .rating").classList.remove("is-primary");
      document.querySelector("#right .rating").classList.add("is-warning");
      document.querySelector("#left .rating").classList.remove("is-warning");
      document.querySelector("#left .rating").classList.add("is-primary");
    } else if (imdbRating < imdbRating2) {
      document.querySelector("#right .rating").classList.add("is-primary");
      document.querySelector("#right .rating").classList.remove("is-warning");
      document.querySelector("#left .rating").classList.add("is-warning");
      document.querySelector("#left .rating").classList.remove("is-primary");
    }
    const votes = parseInt(movie1.imdbVotes.replace(/,/g, ""));
    const votesException = isNaN(votes) ? 0 : votes;
    const votes2 = parseInt(movie2.imdbVotes.replace(/,/g, ""));
    const votesException2 = isNaN(votes2) ? 0 : votes2;

    if (votesException > votesException2) {
      document.querySelector("#right .votes").classList.remove("is-primary");
      document.querySelector("#right .votes").classList.add("is-warning");
      document.querySelector("#left .votes").classList.remove("is-warning");
      document.querySelector("#left .votes").classList.add("is-primary");
    } else if (votesException < votesException2) {
      document.querySelector("#right .votes").classList.add("is-primary");
      document.querySelector("#right .votes").classList.remove("is-warning");
      document.querySelector("#left .votes").classList.add("is-warning");
      document.querySelector("#left .votes").classList.remove("is-primary");
    }
    // using forEach to get the total number of awards
    // let count = 0;
    // const awards = movie1.Awards.split(" ").forEach((word) => {
    //   const value = parseInt(word);
    //   if (isNaN(value)) {
    //     return;
    //   } else {
    //     count = count + value;
    //   }
    // });
    // console.log("awards", count);

    // Same wih reduce
    const awards = movie1.Awards.split(" ").reduce((prev, word) => {
      const value = parseInt(word);
      if (isNaN(value)) {
        return prev;
      } else {
        return prev + value;
      }
    }, 0);
    const awards2 = movie2.Awards.split(" ").reduce((prev, word) => {
      const value = parseInt(word);
      if (isNaN(value)) {
        return prev;
      } else {
        return prev + value;
      }
    }, 0);

    if (awards > awards2) {
      document.querySelector("#right .awards").classList.remove("is-primary");
      document.querySelector("#right .awards").classList.add("is-warning");
      document.querySelector("#left .awards").classList.remove("is-warning");
      document.querySelector("#left .awards").classList.add("is-primary");
    } else if (awards < awards2) {
      document.querySelector("#right .awards").classList.add("is-primary");
      document.querySelector("#right .awards").classList.remove("is-warning");
      document.querySelector("#left .awards").classList.add("is-warning");
      document.querySelector("#left .awards").classList.remove("is-primary");
    }

    // else {
    //   console.log("box3", mov2, mov1);
    // }
  }
  const fetchData = async () => {
    await axios
      .get("https://www.omdbapi.com/", {
        params: {
          apikey: "f4ad17a7",
          s: movieTitle,
        },
      })
      // .get("https://api.tvmaze.com/search/shows?", {
      //   params: { q: movieTitle },
      // })
      .then((res) => {
        setMoviesResponse(res.data.Search);
      });
  };
  const fetchData2 = async () => {
    await axios
      .get("https://www.omdbapi.com/", {
        params: {
          apikey: "f4ad17a7",
          s: movieTitle2,
        },
      })
      .then((res) => {
        setMoviesResponse2(res.data.Search);
      });
  };
  async function fetchSigleMovie(id, title) {
    setMovieTitle(title);
    await axios
      .get("https://www.omdbapi.com/", {
        params: {
          apikey: "f4ad17a7",
          i: `${id}`,
        },
      })
      .then((res) => {
        setSingleMoviesResponse(res.data);
        // compareMovies(singleMoviesResponse, singleMoviesResponse2);
      });
  }
  async function fetchSigleMovie2(id, title) {
    setMovieTitle2(title);
    await axios
      .get("https://www.omdbapi.com/", {
        params: {
          apikey: "f4ad17a7",
          i: `${id}`,
        },
      })
      .then((res) => {
        setSingleMoviesResponse2(res.data);
      });
  }
  const dropdown = document.querySelector(".dropdown");
  const dropdown2 = document.querySelector(".close");

  // close autocomplete menu
  document.addEventListener("click", (event) =>
    !dropdown.contains(event.target)
      ? dropdown.classList.remove("is-active")
      : null
  );
  document.addEventListener("click", (event) =>
    !dropdown2.contains(event.target)
      ? dropdown2.classList.remove("is-active")
      : null
  );

  return (
    <div className='container'>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>
            <span class='icon is-medium has-text-success'>
              <i class='fas fa-square'></i>
            </span>
            <span>Color is better</span>
          </span>
          <span>
            <span class='icon is-medium has-text-warning'>
              <i class='fas fa-square'></i>
            </span>
            <span>Color is worse</span>
          </span>
        </div>
      </div>
      <div
        className='columns'
        style={{
          margin: "0px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div id='left' className='column '>
            <div class='dropdown ' style={{ marginBottom: "2rem" }}>
              <div class='dropdown-trigger'>
                <label>
                  <b>Search for a movie</b>
                </label>

                <input
                  className='input'
                  value={movieTitle}
                  onChange={(e) => {
                    setMovieTitle(e.target.value);
                    dropdown.classList.add("is-active");
                  }}
                  type='text'
                />
              </div>
              <DropDownMenu
                moviesResponse={moviesResponse}
                fetchSigleMovie={fetchSigleMovie}
              ></DropDownMenu>
            </div>
            <div>
              {movieTitle === "" ? null : (
                <MovieDetails
                  singleMoviesResponse={singleMoviesResponse}
                ></MovieDetails>
              )}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div id='right' className='column '>
            <div class='dropdown close' style={{ marginBottom: "2rem" }}>
              <div class='dropdown-trigger'>
                <label>
                  <b>Search for a movie</b>
                </label>

                <input
                  className='input'
                  value={movieTitle2}
                  onChange={(e) => {
                    setMovieTitle2(e.target.value);
                    dropdown2.classList.add("is-active");
                  }}
                  type='text'
                />
              </div>
              <DropDownMenu
                moviesResponse={moviesResponse2}
                fetchSigleMovie={fetchSigleMovie2}
              ></DropDownMenu>
            </div>
            <div>
              {movieTitle2 === "" ? null : (
                <MovieDetails
                  singleMoviesResponse={singleMoviesResponse2}
                ></MovieDetails>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className='columns'> */}

      <div
        className='column is-half notification is-primary tutorial mobile'
        style={{ width: "auto" }}
      >
        <h1 className='title'> Search for a movie on both sides</h1>
        <p className='subtitle'>We will tell you which is best</p>
      </div>
    </div>
    // </div>
  );
};

export default App;
