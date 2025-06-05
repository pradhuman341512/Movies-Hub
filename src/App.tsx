'use client'
import { useEffect, useState } from 'react'
import './App.css'
import { Search } from './components/search'

const  API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method:'GET',
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`
}

}

const   App =()=> {
const [searchTerm,setSearchTerm] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const [movieList,setMovieList] = useState([]);
const [isLoading,setIsLoading] = useState(false);

const fetchMovies = async ()=>{
    setIsLoading(true);
    setErrorMessage('');


  try{

      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint,API_OPTIONS);

      if(!response.ok){
        throw new Error('Failded to fetch movies');
      }

      const data = await response.json();
      console.log(data);
      if(data.Response === 'false'){
        setErrorMessage(data.Error || 'Faild to fetch movies');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

  } catch(error){
    console.error(`Error fetching movies: ${error}`);
    setErrorMessage('Error fetching movies. Please try again latter.');
  } finally{
        setIsLoading(false);
  }
}
    useEffect(()=>{
      fetchMovies();
    },[])

  return (
    <main>
        <div className='pattern'/>
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="Hero Banner" />
            <h1>Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          </header>
          <section className='all-movies'>
            <h2>All Movies</h2>

          {isLoading ?(<p className='text-white'>Loading...</p>):errorMessage ? ( <p className='text-red-500'>{errorMessage}</p>): (
            <ul>
              {movieList.map((movie)=>())}
            </ul>
          )}
          </section>
        </div>
    </main>
  )
}

export default App
