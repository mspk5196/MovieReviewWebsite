import React, { useState } from 'react'
import '../../styles/pages/AddMovies.scss'
import Button from '@mui/material/Button';
import AddMoviePopup from '../../components/PopupForm/AddMoviePopup';
import AddShowsPopup from '../../components/PopupForm/AddShowsPopup';

export default function AddMovies() {

  const [image, setImage] = useState("");
  const [movieName, setMovieName] = useState("");
  const [movieDirector, setMovieDirector] = useState("");
  const [movieYear, setMovieYear] = useState("");
  const [movieShortDesc, setMovieShortDesc] = useState("");
  const [movieLongDesc, setMovieLongDesc] = useState("");

  const [addMoviePopup, setAddMoviePopup] = useState(false);
  const [addShowsPopup, setAddShowsPopup] = useState(false);

  return (
    <div className='adminDiv'>
      <div className='addMovie'>
        <button onClick={() => { setAddMoviePopup(true); }}>Add Movies</button>
        <button onClick={() => { setAddShowsPopup(true); }}>Add Shows</button>
         </div>


      <AddMoviePopup
        open={addMoviePopup}
        onClose={() => setAddMoviePopup(false)}
        onSubmit={() => {
          setAddMoviePopup(false);
          alert("Movies Added Successfully");
          location.reload();
        }}
      />
      <AddShowsPopup
        open={addShowsPopup}
        onClose={() => setAddShowsPopup(false)}
        onSubmit={() => {
          setAddShowsPopup(false);
          alert("Shows Added Successfully");
          location.reload();
        }}
      />
    </div>
  )
}
