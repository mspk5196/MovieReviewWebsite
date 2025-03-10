import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MuiFileInput } from 'mui-file-input'
import { InputLabel, MenuItem, Select } from '@mui/material';

export default function AddMoviePopup({ open, onClose, onSubmit }) {

    const [image, setImage] = useState(null);

    const [movieName, setMovieName] = useState("");
    const [movieDirector, setMovieDirector] = useState("");
    const [movieProducer, setMovieProducer] = useState("");
    const [movieActor, setMovieActor] = useState("");
    const [movieYear, setMovieYear] = useState("");
    const [movieShortDesc, setMovieShortDesc] = useState("");
    const [movieLongDesc, setMovieLongDesc] = useState("");

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [errors, setErrors] = useState({});

    const [movieRating, setMovieRating] = React.useState('');

    const handleChange = (event) => {
        setMovieRating(event.target.value);
    };

    const validateFields = () => {
        const newErrors = {};

        if (!movieName) newErrors.movieName = 'Title is required';
        if (!movieDirector) newErrors.movieDirector = 'Directed Name is required';
        if (!movieProducer) newErrors.movieProducer = 'Producer Name by is required';
        if (!movieActor) newErrors.movieActor = "Actor's Names are is required";
        if (!movieYear) newErrors.movieYear = 'Enter valid year';
        if (!movieShortDesc) newErrors.movieShortDesc = 'Short Description is required';
        if (!movieLongDesc) newErrors.movieLongDesc = 'Long description is required';
        if (!movieRating) newErrors.movieRating = 'Please give rating';
        if (!image) newErrors.image = 'Upload an image';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFile = (newFile) => {
        setImage(newFile)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();



        if (!validateFields()) return;

        const formData = new FormData();
        formData.append("image", image);
        formData.append("movieName", movieName);
        formData.append("movieDirector", movieDirector);
        formData.append("movieProducer", movieProducer);
        formData.append("movieActor", movieActor);
        formData.append("movieYear", movieYear);
        formData.append("movieShortDesc", movieShortDesc);
        formData.append("movieLongDesc", movieLongDesc);
        formData.append("movieRating", movieRating);

        try {
            const res = await fetch('http://localhost:8000/api/upload-movie', {
                method: 'POST',
                body: formData,
            });
            const result = res.json();

            if (result == 400) {
                alert("Movie Not Added");
            }
            else {
                onSubmit();
            }

        }
        catch (error) {
            console.log("Failed to add movie");
        };
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Movies</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <TextField
                    margin="dense"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => { setMovieName(e.target.value) }}
                    error={!!errors.movieName}
                    helperText={errors.movieName}
                    inputProps={{
                        maxLength: 30,
                    }}
                    required
                />
                <TextField
                    margin="dense"
                    label="Directoed by"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => setMovieDirector(e.target.value)}
                    inputProps={{
                        maxLength: 100,
                    }}
                    required
                    error={!!errors.movieDirector}
                    helperText={errors.movieDirector}
                />
                <TextField
                    margin="dense"
                    label="Produced by"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => setMovieProducer(e.target.value)}
                    inputProps={{
                        maxLength: 200,
                    }}
                    required
                    error={!!errors.movieProducer}
                    helperText={errors.movieProducer}
                />
                <TextField
                    margin="dense"
                    label="Actors"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => setMovieActor(e.target.value)}
                    inputProps={{
                        maxLength: 300,
                    }}
                    required
                    error={!!errors.movieActor}
                    helperText={errors.movieActor}
                />
                <TextField
                    margin="dense"
                    type="date"
                    fullWidth
                    variant="standard"
                    onChange={e => setMovieYear(e.target.value)}
                    error={!!errors.movieYear}
                    helperText={errors.movieYear}
                    required
                />
                <TextField
                    margin="dense"
                    label="Short Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => setMovieShortDesc(e.target.value)}
                    error={!!errors.movieShortDesc}
                    helperText={errors.movieShortDesc}
                    inputProps={{
                        maxLength: 130,
                    }}
                    required
                />
                <TextField
                    margin="dense"
                    label="Long Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => setMovieLongDesc(e.target.value)}
                    error={!!errors.movieLongDesc}
                    helperText={errors.movieLongDesc}
                    inputProps={{
                        maxLength: 1000,
                    }}
                    required
                />
                <div>
                    <InputLabel>Rating</InputLabel>
                    <Select
                        id="demo-simple-select"
                        value={movieRating}
                        label="Rating"
                        onChange={handleChange}
                        sx={{ width: '200px', height: '30px' }}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select>
                </div>
                <br />
                <MuiFileInput value={image} inputProps={{ accept: 'images/*' }} placeholder="Upload File" onChange={handleFile} error={!!errors.image} helperText={errors.image} />

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary" variant='outlined'>Cancel</Button>
                <Button color="primary" onClick={handleSubmit} variant='contained'>Upload</Button>
            </DialogActions>

        </Dialog>
    );
}
