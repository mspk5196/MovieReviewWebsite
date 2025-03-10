import { Dialog, DialogContent, DialogTitle, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import UserDetails from '../UserDetails/UserDetails'

export default function ShowPopup({ open, onClose, showData }) {

  const [data, setData] = useState([]);
  const [isFav, setFav] = useState(false);

  const { email } = UserDetails();

  useEffect(() => {
    setData(showData);
  }, [showData]);

  const [showRating, setShowRating] = React.useState('');

  const handleChange = (event) => {
    setShowRating(event.target.value);
  };

  const handleFav = async (e) => {
    if (isFav) {
      // setFav(true);
      console.log("Delete it from Favorites tab");

    } else {
      if (!showRating) {
        alert("Please select a rating");
        return;
      } else {
        setFav(true);
        const formData = new FormData();
        console.log("Image File:", data[0].Image);

        formData.append("image", data[0].Image);
        formData.append("showName", data[0].ShowName);
        formData.append("showPresentedBy", data[0].ShowPresentedBy);
        formData.append("showEpisodes", data[0].ShowEpisodes);
        formData.append("showSeasons", data[0].ShowSeasons);
        formData.append("showNetwork", data[0].ShowNetwork);

        formData.append("showShortDesc", data[0].ShowSDesc);
        formData.append("showLongDesc", data[0].ShowLDesc);
        formData.append("showRating", data[0].ShowRating);
        formData.append("email", email);

        // console.log("FormData before sending:", Array.from(formData.entries()));

        try {

          const res = await fetch('http://localhost:8000/api/upload-favourite-show', {
            method: 'POST',
            body: formData,
          });
          const result = await res.json();

          if (!res.ok) {
            alert("Show Not Added");
            console.log(result);
          } else {
            alert("Show Added Successfully");
            console.log(result);
          }

        } catch (error) {
          console.log("Failed to add show", error);
        };
      }

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
      {data.map((showDiv, index) => (
        <div key={index}>
          <IconButton onClick={onClose} sx={{
            width: 'fit-content',
            backgroundColor: '#e0e0e0',
            '&:hover': { backgroundColor: '#d6d6d6' }
          }}>
            <ArrowBackIcon />
          </IconButton>
          <DialogTitle sx={{ fontWeight: 'bold', fontSize: '20px', textAlign: 'center' }}>
            {showDiv.ShowName}
          </DialogTitle>

          <DialogContent>
            <div className='showImg' style={{ textAlign: 'center', marginBottom: '15px' }}>
              <img src={`http://localhost:8000/uploads/${showDiv.Image}`} alt="Movie" style={{ width: '100%', maxWidth: '350px', borderRadius: '8px' }} />
            </div>
            <div className='showHeader' style={{ fontSize: '14px', color: '#555', marginBottom: '10px' }}>
              <p><span style={{ fontWeight: 'bold', color: 'black' }}>Present By:</span> {showDiv.ShowPresentedBy}</p>
              <p><span style={{ fontWeight: 'bold', color: 'black' }}>Episodes/Seasons:</span> {showDiv.ShowEpisodes}/{showDiv.ShowSeasons}</p>
              <p><span style={{ fontWeight: 'bold', color: 'black' }}>Network:</span> {showDiv.ShowNetwork}</p>
            </div>
            <div className='showBody' style={{ fontSize: '14px', color: '#333', marginBottom: '10px' }}>
              <p><span style={{ fontWeight: 'bold', color: 'black' }}>Movie Description:</span> {showDiv.ShowLDesc}</p>
            </div>

            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
              <p>Show Rating: {showDiv.ShowRating} out of 5</p>
            </div>
            <div>
              <InputLabel sx={{ fontWeight: 'bold', color: '#333' }}>Give Your Rating</InputLabel>
              <Select
                value={showRating}
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
