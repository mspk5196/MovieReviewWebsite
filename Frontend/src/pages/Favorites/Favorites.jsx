import React, { useEffect, useState } from 'react'
import UserDetails from '../../components/UserDetails/UserDetails';
import { Button, IconButton } from '@mui/material';
import '../../styles/pages/Favorites.scss'

export default function Favorites() {

  const [movieDetail, setMovie] = useState([]);
  const [showDetail, setShow] = useState([]);
  const [deleteMovie, setDeleteMovie] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const { email } = UserDetails();
  const mail = email;

  const fetchFavouriteMovie = async (mail) => {
    try {
      const res = await fetch(`http://localhost:8000/api/get-favourite-movie/${mail}`, {
        method: "GET",
      });
      const dataMovie = await res.json();
      setMovie(dataMovie.get_favourite_movie);
    } catch (error) {
      console.error("Error fetching uploaded movies:", error);
    }
  };

  const fetchFavouriteShow = async (mail) => {
    try {
      const res = await fetch(`http://localhost:8000/api/get-favourite-show/${mail}`, {
        method: "GET",
      });
      const dataShow = await res.json();
      setShow(dataShow.get_favourite_show);
    } catch (error) {
      console.error("Error fetching uploaded shows:", error);
    }
  };

  const handleMovieDelete = async (id) => {
    console.log("Deleting movie with ID:", id);
    try {
      const res = await fetch(`http://localhost:8000/api/delete-favourite-movie/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      
      if(res.ok){
        alert("Movie deleted successfully");
        fetchFavouriteMovie(mail);
        setDeleteMovie(false);
      } else {
        alert("Error deleting movie");
      }
    } catch (error) {
      console.error("Error deleting uploaded movie:", error);
    }
  };
  const handleShowDelete = async (id) => {
    console.log("Deleting movie with ID:", id);
    try {
      const res = await fetch(`http://localhost:8000/api/delete-favourite-show/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      
      if(res.ok){
        alert("Show deleted successfully");
        fetchFavouriteShow(mail);
        setDeleteShow(false);
      } else {
        alert("Error deleting show");
      }
    } catch (error) {
      console.error("Error deleting uploaded show:", error);
    }
  };

  useEffect(() => {
    fetchFavouriteMovie(mail);
    fetchFavouriteShow(mail);
  }, [mail]);

  return (
    <div className="favorites">
      <div className='movies'>
        <h2 className="title">Favourite Movies</h2>
        <div className="movie-list">
          {movieDetail.map((movieDiv, i) => (
            <div key={i} className="movie-card">
              <div className="movie-img">
                <img src={`http://localhost:8000/uploads/${movieDiv.Image}`} alt={movieDiv.MovieName} />
              </div>
              <div className="movie-info">
                <h3>{movieDiv.MovieName}</h3>
                <p><strong>Release Date:</strong> {new Date(movieDiv.MovieYear).toLocaleDateString('en-IN')}</p>
                <p><strong>Director:</strong> {movieDiv.MovieDirector}</p>
                <p><strong>Producer:</strong> {movieDiv.MovieProducer}</p>
                <p><strong>Actors:</strong> {movieDiv.MovieActor}</p>
                <p className="rating"><strong>Rating:</strong> {movieDiv.MovieRating} / 5</p>
                <button className="remove-btn" onClick={() => { handleMovieDelete(movieDiv.ID); }}>Remove from Favourites</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='shows'>
        <h2 className="title">Favourite Shows</h2>
        <div className="movie-list">
          {showDetail.map((showDiv, i) => (
            <div key={i} className="movie-card">
              <div className="movie-img">
                <img src={`http://localhost:8000/uploads/${showDiv.Image}`} alt={showDiv.ShowName} />
              </div>
              <div className="movie-info">
                <h3>{showDiv.MovieName}</h3>
                <p><strong>Present By:</strong> {showDiv.ShowPresentedBy}</p>
                <p><strong>Episodes/Seasons:</strong> {showDiv.ShowEpisodes}/{showDiv.ShowSeasons}</p>
                <p><strong>Network:</strong> {showDiv.ShowNetwork}</p>
                <p><strong>Description:</strong> {showDiv.ShowSDesc}</p>
                <p className="rating"><strong>Rating:</strong> {showDiv.ShowRating} / 5</p>
                <button className="remove-btn" onClick={() => { handleShowDelete(showDiv.ID); }}>Remove from Favourites</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
