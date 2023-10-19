import React, { useCallback } from 'react';
import { useState , useEffect} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import AddMovie from './components/AddMovie';
function App() {
  const [movies,setMovies]=useState([]);
  const [isLoading,setIsLoading]=useState(false)
  const [error,setError]=useState(null);
  const [retrying, setRetrying] = useState(false);



const  fetchMoviesHandler =useCallback(async()=>{
  setIsLoading(true);
  setError(null)
   try{
const response=await fetch('https://react-movielist-7c0ee-default-rtdb.firebaseio.com/movies.json');

if(!response.ok){
  throw new Error('something went wrong.....retrying')
}
const data= await response.json();
const loadedMovies = [];

for (const key in data) {
  loadedMovies.push({
    id: key,
    title: data[key].title,
    openingText: data[key].openingText,
    releaseDate: data[key].releaseDate,
  });
}

setMovies(loadedMovies);



}catch (error) {
setError(error.message) ;
}
setIsLoading(false);




},[])

useEffect(() => {
 
      fetchMoviesHandler();
   
}, [fetchMoviesHandler]);

function addMovieHandler(movie) {
  console.log(movie);
}


async function addMovieHandler(movie) {
  const response = await fetch('https://react-movielist-7c0ee-default-rtdb.firebaseio.com/movies.json', {
    method: 'POST',
    body: JSON.stringify(movie),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  console.log(data);
}



const deleteMovieHandler = async (movieId) => {
  // Delete the movie from the database
  const response = await fetch(`https://react-movielist-7c0ee-default-rtdb.firebaseio.com/movies/${movieId}.json`, {
    method: 'DELETE',
  });
  console.log('deleted')
  if (response.ok) {
    // Movie is deleted from the database, now update the UI.
    const updatedMovies = movies.filter((movie) => movie.id !== movieId);
    setMovies(updatedMovies);
  } else {
    console.error('Failed to delete the movie.');
  }
};


  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>

      <section>
        <button onClick={fetchMoviesHandler} >Fetch Movies</button>
      </section>
      <section>
       {!isLoading && <MoviesList movies={movies} delete={deleteMovieHandler}/>} 
       {!error&& isLoading  && <i className="fa fa-spinner fa-spin fa-3x"></i> } 
      {!isLoading&& error &&
      
      <div>
<p>{error}</p>

       

      </div>
      
      }
      
      </section>
    </React.Fragment>
  );
}

export default App;
