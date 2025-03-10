import { Dialog, DialogContent, DialogTitle, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import UserDetails from '../UserDetails/UserDetails'

export default function MoviePopup({ open, onClose, movieData }) {

    const [data, setData] = useState([]);
    const [isFav, setFav] = useState(false);

    const { email } = UserDetails();

    useEffect(() => {
        setData(movieData);
    }, [movieData]);

    const [movieRating, setMovieRating] = React.useState('');

    const handleChange = (event) => {
        setMovieRating(event.target.value);
    };

    const handleFav = async (e) => {
        if (isFav) {
            setFav(false);
        } else {
            if (!movieRating) {
                alert("Please select a rating");
                return;
            } else {
                setFav(true);
                const formData = new FormData();
                console.log("Image File:", data[0].Image);

                formData.append("image", data[0].Image);
                formData.append("movieName", data[0].MovieName);
                formData.append("movieDirector", data[0].MovieDirector);
                formData.append("movieProducer", data[0].MovieProducer);
                formData.append("movieActor", data[0].MovieActor);

                const movieYear = data[0].MovieYear;
                const formattedDate = new Date(movieYear).toISOString().split('T')[0];
                formData.append("movieYear", formattedDate);

                formData.append("movieShortDesc", data[0].MovieSDesc);
                formData.append("movieLongDesc", data[0].MovieLDesc);
                formData.append("movieRating", data[0].MovieRating);
                formData.append("email", email);

                // console.log("FormData before sending:", Array.from(formData.entries())); // Log formData

                try {
                    const res = await fetch('http://localhost:8000/api/upload-favourite-movie', {
                        method: 'POST',
                        body: formData,
                    });
                    const result = await res.json();

                    if (!res.ok) {
                        alert("Movie Not Added");
                        console.log(result);
                    } else {
                        alert("Movie Added Successfully");
                        console.log(result);
                    }

                } catch (error) {
                    console.log("Failed to add movie", error);
                };
            }
            // }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} sx={{
            '& .MuiDialog-paper': {
                width: '500px',
                maxWidth: '90vw',
                borderRadius: '10px',
                padding: '20px',
                backgroundColor: '#f9f9f9',
            }
        }}>
            {data.map((movieDiv, index) => (
                <div key={index}>
                    <IconButton onClick={onClose} sx={{
                        width: 'fit-content',
                        backgroundColor: '#e0e0e0',
                        '&:hover': { backgroundColor: '#d6d6d6' }
                    }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <DialogTitle sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
                        {movieDiv.MovieName}
                    </DialogTitle>

                    <DialogContent>
                        <div className='movieImg' style={{ textAlign: 'center', marginBottom: '15px' }}>
                            <img src={`http://localhost:8000/uploads/${movieDiv.Image}`} alt="Movie" style={{ width: '100%', maxWidth: '350px', borderRadius: '8px' }} />
                        </div>
                        <div className='movieHeader' style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>
                            <p><span style={{ fontWeight: 'bold', color: 'black' }}>Release Date:</span> {new Date(movieDiv.MovieYear).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
                            <p><span style={{ fontWeight: 'bold', color: 'black' }}>Director:</span> {movieDiv.MovieDirector}</p>
                            <p><span style={{ fontWeight: 'bold', color: 'black' }}>Producer:</span> {movieDiv.MovieProducedBy}</p>
                            <p><span style={{ fontWeight: 'bold', color: 'black' }}>Actor/Actresses:</span> {movieDiv.MovieActor}</p>
                        </div>
                        <div className='movieBody' style={{ fontSize: '14px', color: '#333', marginBottom: '10px' }}>
                            <p><span style={{ fontWeight: 'bold', color: 'black' }}>Movie Description:</span> {movieDiv.MovieLDesc}</p>
                        </div>

                        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
                            <p>Movie Rating: {movieDiv.MovieRating} out of 5</p>
                        </div>
                        <div>
                            <InputLabel sx={{ fontWeight: 'bold', color: '#333' }}>Give Your Rating</InputLabel>
                            <Select
                                value={movieRating}
                                label="Rating out of 5"
                                onChange={handleChange}
                                sx={{
                                    width: '200px',
                                    height: '40px',
                                    backgroundColor: 'white',
                                    borderRadius: '5px',
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#999' },
                                }}
                            >
                                <MenuItem value={1}>One</MenuItem>
                                <MenuItem value={2}>Two</MenuItem>
                                <MenuItem value={3}>Three</MenuItem>
                                <MenuItem value={4}>Four</MenuItem>
                                <MenuItem value={5}>Five</MenuItem>
                            </Select>
                        </div>
                        <IconButton
                            onClick={handleFav}
                            sx={{
                                marginTop: '10px',
                                backgroundColor: isFav ? '#ffebee' : 'transparent',
                                '&:hover': { backgroundColor: '#f5f5f5' }
                            }}
                        >
                            {isFav ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />}
                        </IconButton>
                    </DialogContent>
                </div>
            ))}
        </Dialog>
    );
}
