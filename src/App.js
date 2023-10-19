import React, { useCallback } from 'react';
import { useState , useEffect} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';


function App() {
  const [movies,setMovies]=useState([]);
  const [isLoading,setIsLoading]=useState(false)
  const [error,setError]=useState(null);
  const [retrying, setRetrying] = useState(false);



async function  fetchMoviesHandler(){
  setIsLoading(true);
  setError(null)
   try{
const response=await fetch('https://swapi.dev/api/film/');

if(!response.ok){
  throw new Error('something went wrong.....retrying')
}
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
}catch (error) {
setError(error.message) ;
setIsLoading(false);
setRetrying(true);



}};

useEffect(() => {
  if (retrying) {
    const retryTimer = setTimeout(() => {
      fetchMoviesHandler();
    }, 5000);

    return () => {
      clearTimeout(retryTimer);
      setRetrying(false);
    };
  }
}, [retrying, fetchMoviesHandler]);
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler} >Fetch Movies</button>
      </section>
      <section>
       {!isLoading && <MoviesList movies={movies} />} 
       {!error&& isLoading  && <i className="fa fa-spinner fa-spin fa-3x"></i> } 
      {!isLoading&& error &&
      
      <div>
<p>{error}</p>

        <button onClick={() => setRetrying(false)}>Stop Retrying</button>

      </div>
      
      }
      
      </section>
    </React.Fragment>
  );
}

export default App;
