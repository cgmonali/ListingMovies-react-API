import React from 'react';
import { useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';


function App() {
  const [movies,setMovies]=useState([]);
  const [isLoading,setIsLoading]=useState(false)
 
async function fetchMoviesHandler(){
  setIsLoading(true);
const response=await fetch('https://swapi.dev/api/films/');
const data= await response.json();
const transformedMovies = data.results.map((movieData) => {
  return  {//the flower bracket should be next to return on the same line not in the next line
    id: movieData.episode_id,
    title: movieData.title,
    openingText: movieData.opening_crawl,
    releaseDate: movieData.release_date,
  };
 

});
setMovies(transformedMovies); 
setIsLoading(false);
}
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler} >Fetch Movies</button>
      </section>
      <section>
       {!isLoading && <MoviesList movies={movies} />} 
       {isLoading && <i className="fa fa-spinner fa-spin fa-3x"></i> } 
      </section>
    </React.Fragment>
  );
}

export default App;
