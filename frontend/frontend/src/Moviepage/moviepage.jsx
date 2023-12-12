import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Home/Loading";
import { useNavigate } from "react-router";

function Movie() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState();
  const [isGenre, setIsGenre] = useState(false);
  const [isLanguage, setIsLanguage] = useState(false);
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    async function getMovies() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/movies/?page=1");
        setMovies(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getMovies();
  }, []);

  function isPage(pageNumber) {
    return movies && pageNumber <= movies.total_pages;
  }

  async function fetchData(url) {
    try {
      const response = await axios(url);
      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleGenreChange({ target }) {
    const selectedGenre = target.value;
    setIsGenre(selectedGenre !== "All");
    setGenre(selectedGenre);
    fetchData(`http://127.0.0.1:8000/api/movies/genre/?genre=${selectedGenre}`);
  }

  function handleLanguageChange({ target }) {
    const selectedLanguage = target.value;
    setIsLanguage(selectedLanguage !== "All");
    setLanguage(selectedLanguage);
    fetchData(`http://127.0.0.1:8000/api/movies/language/?language=${selectedLanguage}`);
  }

  function navigateToTheater(event) {
    const logged = localStorage.getItem("access_token");
    if (logged) {
      const movieId = event.target.id;
      navigate(`/movie/${movieId}`);
    } else {
      alert("Please Login First!");
      navigate("/login/");
    }
  }

  async function movieSearch(event) {
    event.preventDefault();
    const searchValue = document.getElementById("search").value;
    fetchData(`http://127.0.0.1:8000/api/movies/search/?search=${searchValue}`);
    document.getElementById("search").value = "";
  }

  const buttons = Array.from({ length: movies?.total_pages + 2 }, (_, i) => (
    <button key={i} className="btn btn-primary btn-lg page" disabled={!isPage(i)} id={i} onClick={() => fetchData(`http://127.0.0.1:8000/api/movies/?page=${i}`)}>
      {i}
    </button>
  ));

  return (
    <>

      <div className="filter-section">
      <div style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', fontWeight: 'bold', color: 'white', backgroundColor: 'navyblue', padding: '10px', textAlign: 'center', marginLeft: '10px' }}>Latest Movies</div>

        <span>
          
          
          <label className="select-label">Genre: </label>
          <select onChange={handleGenreChange} className="select-class">
            <option value="All">All Genre</option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
          </select>
        </span>
        <span>
          <label className="select-label">Language: </label>
          <select onChange={handleLanguageChange} className="select-class">
            <option value="All">All Language</option>
            <option value="Hindi">Hindi</option>
            <option value="English">English</option>
            <option value="Bengali">Bengali</option>
            <option value="Tamil">Tamil</option>
            <option value="Telegu">Telegu</option>
            <option value="Marathi">Marathi</option>
          </select>
        </span>
        <span>
          <form className="form-inline my-2 my-lg-0" style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "1em" }} onSubmit={movieSearch}>
            <input className="form-control mr-sm-2 myinput" type="search" placeholder="Search"   id="search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search 
            </button>
            
          </form>
          
        </span>
        
      </div>
      
      {movies ? (
 
        movies.movies.map((movie) => (
          
          <div key={movie.movie_id} className="col-md-3">
            <div className="card-main" id={movie.movie_id}>
              <img src={movie.image} id={movie.movie_id} className="card-img-top" alt="LoadImage"></img>
              <h5 className="product-title" id={movie.movie_id}>
                {movie.title}
              </h5>
              {/* <div className="thumb"  >
    <img src="	https://pixner.net/boleto/demo/assets/images/movie/tomato.png" alt="movie" />
    <span className="content">88%</span>
</div> */}
  <div className="sc-7o7nez-0 ifFqly">
      UA
    </div>
<div className="sc-7o7nez-0 ifFqly">
      Hindi, Telugu, Tamil, Kannada, Malayalam
    </div>
              <button type="button" className="btn btn-primary btn-lg" id={movie.movie_id} onClick={navigateToTheater} >
                  Book Now

              </button>
  
           <div className="thumb"  >
    <img src="	https://pixner.net/boleto/demo/assets/images/movie/tomato.png" alt="movie" />
    <span className="content">88%</span>
</div>



              
            </div>
          </div>
        ))
      ) : (
        <div className="loading">
          <Loading />
        </div>
      )}

      {movies && movies.movies.length <= 0 && (
        <div className="col-md-3">
          <p>No Movies Found!!</p>
        </div>
      )}

      <div className="pagination">{buttons}</div>
    </>
  );
}

export default Movie;





