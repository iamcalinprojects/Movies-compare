import React from "react";

const MovieDetails = ({ singleMoviesResponse }) => {
  return (
    <>
      <article className='media'>
        <figure className='media-left'>
          <p className='image'>
            <img src={singleMoviesResponse.Poster} alt='' />
          </p>
        </figure>
        <div className='media-content'>
          <div className='content'>
            <h1>{singleMoviesResponse.Title}</h1>
            <h4>{singleMoviesResponse.Genre}</h4>
            <p>{singleMoviesResponse.Plot}</p>
          </div>
        </div>
      </article>
      <article className='notification is-primary awards'>
        <p className='title'>{singleMoviesResponse.Awards}</p>
        <p className='subtitle'>Awards</p>
      </article>
      <article className='notification is-primary box'>
        <p className='title'>{singleMoviesResponse.BoxOffice}</p>
        <p className='subtitle'>Box Office</p>
      </article>
      <article className='notification is-primary metascore'>
        <p className='title'>{singleMoviesResponse.Metascore}</p>
        <p className='subtitle'>Metascore</p>
      </article>
      <article className='notification is-primary rating'>
        <p className='title'>{singleMoviesResponse.imdbRating}</p>
        <p className='subtitle'>IMDB Rating</p>
      </article>
      <article className='notification is-primary votes'>
        <p className='title'>{singleMoviesResponse.imdbVotes}</p>
        <p className='subtitle'>IMDB Votes</p>
      </article>
    </>
  );
};

export default MovieDetails;
