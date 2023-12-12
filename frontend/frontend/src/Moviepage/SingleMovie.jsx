import { useParams } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Home/Loading";
import "./moviepage.css";
import Footer from "../Navbar/Footer";
import { fetchWithToken } from "../Api/interceptor";





function SingleMovie() {
  const [movie, setMovie] = useState(null);
  const [theaters, setTheaters] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetchWithToken(`http://127.0.0.1:8000/api/movies/single/?id=${id}`);

        if (response.ok) {
          const result = await response.json();
          setMovie(result.movies);
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchTheaters() {
      try {
        const response = await fetchWithToken(`http://127.0.0.1:8000/api/movies/theaters/?movie=${id}&page=1`);

        if (response.ok) {
          const result = await response.json();
          setTheaters(result.theaters);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchMovie();
    fetchTheaters();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="thtrdiv">
        <div className="col-md-3" style={{ margin: "1em", display: "flex", justifyContent: "center" }}>
          {movie && movie.map((i) => (
            <div key={i.movie_id} className="card" style={{ width: "18rem", backgroundColor: "transparent" }}>
              <img src={i.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="product-title" id={i.movie_id}>{i.title}</h5>
                <p className="card-text" id={i.movie_id}>Director: {i.director}<img src="https://cdn-icons-png.flaticon.com/128/2589/2589175.png" alt="Icon" style={{ width: '30px', height: '30px' }} /></p>
                <p className="card-text" id={i.movie_id}>Language: {i.language}</p>
                <p className="card-text genre" id={i.movie_id}>Genre: {i.genre}</p>
                <p className="card-text genre" id={i.movie_id}>Duration: {i.duration} Mins</p>
              </div>
            </div>
          ))}
        </div>
        {movie && movie.map((k, p) => (
  <div className="col-md-6" style={{ margin: "1em", display: "flex", flexDirection: "column", position: "relative" }}>
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.5) 0%), url(${k.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "820px", 
        width:"1280px",
        borderRadius: "10px", 
        overflow: "hidden",
   
        
        
      }}
    >
   
      <h2 style={{ color: "white", textShadow: "2px 2px 3px black", zIndex: 1, position: "relative" }}>Theater List</h2>
      <hr style={{ color: "white", zIndex: 1, position: "relative" }} />

      {theaters ? (
        theaters.map((i) => (
          <div key={i.theater_id} className="card-body">
            <h5 className="product-title" id={i.theater_id} style={{ color: "white", zIndex: 1, position: "relative" }}>{i.name}</h5>
            <p className="card-text" id={i.theater_id} style={{ color: "white", zIndex: 1, position: "relative" }}>Address: {i.address}</p>
            <p className="card-text" id={i.theater_id} style={{ color: "white", zIndex: 1, position: "relative" }}>Pincode: {i.pincode}</p>
            <p className="card-text genre" id={i.theater_id} style={{ color: "white", zIndex: 1, position: "relative" }}>Timings: {i.timing}</p>
            <a href={`/movie/${id}/theater/${i.theater_id}`} className="btn btn-primary" id={i.theater_id} style={{ zIndex: 1, position: "relative" }}>Book Now</a>
            <img src="https://cdn-icons-png.flaticon.com/128/8932/8932779.png" alt="Icon" style={{ height: '60px', zIndex: 1, position: "relative" }} />
            <hr style={{ color: "white", zIndex: 1, position: "relative" }} />
          </div>
        ))
      ) : (
        <div className="loading"><Loading /></div>
      )}
    </div>
  </div>
))}

      </div>
        
      <hr style={{ color: "white" }} />
      <Footer />
    </>
  );
}

export default SingleMovie;
