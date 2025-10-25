import React, { useEffect, useState } from 'react';
import '../../styles/pages/Home.scss';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import MoviePopup from '../../components/PopupDetails/MoviePopup';
const API_URL = process.env.VITE_API_URL;

export default function Movies() {
    const [movieDetail, setMovie] = useState([]);
    // const [isFav, setFav] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [selectedMovieDetail, setSelectedMovie] = useState([]);


    const fetchSelectedMovie = async (itemId) => {
        try {
            const res = await fetch(`${API_URL}/api/get-selected-movie/${itemId}`, {
                method: "GET",
            });
            const dataMovie = await res.json();
            // console.log(dataMovie.get_selected_movie);
            setSelectedMovie(dataMovie.get_selected_movie);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    const fetchUploadedMovie = async () => {
        try {
            const res = await fetch(`${API_URL}/api/get-movie`, {
                method: "GET",
            });
            const dataMovie = await res.json();
            setMovie(dataMovie.get_movie);
        } catch (error) {
            console.error("Error fetching uploaded movies:", error);
        }
    };

    useEffect(() => {
        fetchUploadedMovie();
    }, []);

    return (
        <div className='movies'>
            <p id='tit'>Popular Movies</p>
            <div className='movieList'>
                {movieDetail.map((movieDiv, i) => (
                    <div key={i} className='movie' onClick={() => {fetchSelectedMovie(movieDiv.ID); setPopupOpen(true);}}>
                        <div className='movieImg'>
                            <img src={`${API_URL}/uploads/${movieDiv.Image}`} alt="Uploaded" />
                        </div>
                        <div className='movieTitle'>
                            <p>Movie name: <span>{movieDiv.MovieName}</span></p>
                            <p>Directed by: <span>{movieDiv.MovieDirector}</span></p>
                            <p>Movie Rating: {movieDiv.MovieRating} out of 5</p>
                        </div>
                        <div className='movieSDesc'>
                            <p><span id='year'>{new Date(movieDiv.MovieYear).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>{movieDiv.MovieSDesc}</p>
                        </div>
                    </div>
                ))}
            </div>
            <MoviePopup
                open={isPopupOpen}
                onClose={() => setPopupOpen(false)}
                movieData={selectedMovieDetail}
            />
        </div>
    );
}
