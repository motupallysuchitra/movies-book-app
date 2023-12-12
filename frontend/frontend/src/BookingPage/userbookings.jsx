


import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/navbar";
import Footer from "../Navbar/Footer";
import { fetchWithToken } from "../Api/interceptor";
import Loading from "../Home/Loading";

const Bill = ({ totalCost }) => {
  return (
    <div>
      <h3>Total Amount: ${totalCost}</h3>
    </div>
  );
};

function UserBookings() {
  const [userBookings, setUserBookings] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    let access_token = localStorage.getItem("access_token");

    async function fetchUserBookings() {
      try {
        const response = await fetchWithToken("http://127.0.0.1:8000/api/user/bookings/", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserBookings(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchAllMovies() {
      try {
        const response = await fetchWithToken("http://127.0.0.1:8000/api/movies/");
        if (response.ok) {
          const data = await response.json();
          setMovies(data.movies);
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchAllTheaters() {
      try {
        const response = await fetchWithToken("http://127.0.0.1:8000/api/theaters/");
        if (response.ok) {
          const data = await response.json();
          setTheaters(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchUserBookings();
    fetchAllMovies();
    fetchAllTheaters();
  }, []);

  const getMovieName = (movieId) => {
    const foundMovie = movies.find((movie) => movie.movie_id === movieId);
    return foundMovie ? foundMovie.title : "Unknown Movie";
  };

  const getTheaterName = (theaterId) => {
    const foundTheater = theaters.find((theater) => theater.theater_id === theaterId);
    return foundTheater ? foundTheater.name : "Unknown Theater";
  };

  const getTheaterTiming = (theaterId) => {
    const foundTheater = theaters.find((theater) => theater.theater_id === theaterId);
    return foundTheater ? foundTheater.timing : "Unknown Theater";
  };

  const handlePayment = async (bookingId, totalCost) => {
    try {
      showPaymentButtons(bookingId, totalCost);
    } catch (error) {
      console.log(error);
    }
  };

  const showPaymentButtons = (bookingId, totalCost) => {
    const googlePayButton = document.getElementById("google-pay-button");
    const phonePeButton = document.getElementById("phonepe-button");

    googlePayButton.style.display = "block";
    phonePeButton.style.display = "block";

    googlePayButton.addEventListener("click", () => initiatePayment(bookingId, totalCost, "googlepay"));
    phonePeButton.addEventListener("click", () => initiatePayment(bookingId, totalCost, "phonepe"));
  };

  const initiatePayment = (bookingId, totalCost, paymentMethod) => {
   
  };

  return (
    <>
      <Navbar />
      <div
        className="container"
        style={{
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textShadow: "2px 2px 3px black",
          gap: "20px",
        }}
      >
        <h2>My Bookings</h2>
        <hr />
        {userBookings.length === 0 ? (
          <div className="loading">
            <Loading />
          </div>
        ) : (
          userBookings &&
          userBookings.map((booking) => {
            const movieName = getMovieName(booking.movie);
            const theaterName = getTheaterName(booking.theater);

            if (movieName !== "Unknown Movie" && theaterName !== "Unknown Theater") {
              return (
                <div
                  style={{
                    display: "flex",
                    boxShadow: "4px 4px 10px rgba(0, 128, 255, 0.7)",
                    width: "auto",
                    height: "auto",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2em",
                  }}
                  key={booking.booking_id}
                >
                  <h2>
                    Movie: {movieName} <br />
                    Theater: {theaterName} <br />
                    Timing: {getTheaterTiming(booking.theater)} <br />
                    Seats: {booking.seat_numbers.join(",")}
                  </h2>
                  <Bill totalCost={booking.total_cost} />
                  <div style={{ display: "flex", gap: "5px" }}>
  <button id="google-pay-button" className="btn btn-primary" style={{ display: "none", backgroundColor: "#4CAF50", color: "#fff", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Pay with Google Pay</button>
  {/* <button id="phonepe-button" className="btn btn-primary" style={{ display: "none", backgroundColor: "#4CAF50", color: "#fff", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Pay with Phone Pe</button> */}
</div>

                  <button
  className="btn btn-primary"
  style={{ margin: "10px", backgroundColor: "#4CAF50", color: "#fff", padding: "10px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}
  onClick={() => handlePayment(booking.booking_id, booking.total_cost)}
>
  Pay Now
</button>

                </div>
              );
            }
            return (
              <div className="loading" key={booking.booking_id}>
                <Loading />
              </div>
            );
          })
        )}
      </div>
      <Footer />
    </>
  );
}

export default UserBookings;


