import React from 'react';

import Movie from './Movie';
// import classes from './MoviesList.module.css';

const MovieList = (props) => {

  

  return (
    <ul >
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          onDeleteMovie={props.delete}
        />
      ))}


    </ul>
  );
};

export default MovieList;
