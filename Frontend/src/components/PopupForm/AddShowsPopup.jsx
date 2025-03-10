import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MuiFileInput } from 'mui-file-input'
import { InputLabel, MenuItem, Select } from '@mui/material';

export default function AddShowsPopup({ open, onClose, onSubmit }) {

    const [image, setImage] = useState(null);

    const [showsName, setShowsName] = useState("");
    const [showsPresentedBy, setShowsPresentedBy] = useState("");
    const [showsEpisodes, setShowsEpisodes] = useState("");
    const [showsSeasons, setShowsSeasons] = useState("");
    const [showsNetwork, setShowsNetwork] = useState("");
    const [showsShortDesc, setShowsShortDesc] = useState("");
    const [showsLongDesc, setShowsLongDesc] = useState("");
    const [showsRating, setShowsRating] = React.useState('');

    // const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setShowsRating(event.target.value);
    };

    const validateFields = () => {
        const newErrors = {};

        if (!showsName) newErrors.showsName = 'Title is required';
        if (!showsPresentedBy) newErrors.showsPresentedBy = 'Directed by is required';
        if (!showsEpisodes) newErrors.showsEpisodes = 'Enter valid Episodes';
        if (!showsSeasons) newErrors.showsSeasons = 'Enter valid Seasons';
        if (!showsNetwork) newErrors.showsNetwork = 'Enter valid Network';
        if (!showsShortDesc) newErrors.showsShortDesc = 'Short Description is required';
        if (!showsLongDesc) newErrors.showsLongDesc = 'Long description is required';
        if (!showRating) newErrors.movieRating = 'Please give rating';
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
        formData.append("showsName", showsName);
        formData.append("showsPresentedBy", showsPresentedBy);
        formData.append("showsEpisodes", showsEpisodes);
        formData.append("showsSeasons", showsSeasons);
        formData.append("showsNetwork", showsNetwork);
        formData.append("showsShortDesc", showsShortDesc);
        formData.append("showsLongDesc", showsLongDesc);
        formData.append("showsRating", showsRating);

        try {
            const res = await fetch('http://localhost:8000/api/upload-shows', {
                method: 'POST',
                body: formData,
            });
            const result = res.json();

            if (result == 400) {
                alert("shows Not Added");
            }
            else {
                onSubmit();
            }

        }
        catch (error) {

        };
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Shows</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => { setShowsName(e.target.value) }}
                    error={!!errors.showsName}
                    helperText={errors.showsName}
                    inputProps={{
                        maxLength: 30,
                    }}
                    required
                />
                <TextField
                    margin="dense"
                    label="Presented by"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => setShowsPresentedBy(e.target.value)}
                    inputProps={{
                        maxLength: 80,
                    }}
                    required
                    error={!!errors.showsPresentedBy}
                    helperText={errors.showsPresentedBy}
                />
                <TextField
                    margin="dense"
                    label="Episodes"
                    type="tel"
                    fullWidth
                    variant="standard"
                    onChange={e => setShowsEpisodes(e.target.value)}
                    error={!!errors.showsEpisode}
                    helperText={errors.showsEpisode}
                    required
                />
                <TextField
                    margin="dense"
                    label="Seasons"
                    type="tel"
                    fullWidth
                    variant="standard"
                    onChange={e => setShowsSeasons(e.target.value)}
                    error={!!errors.showsSeasons}
                    helperText={errors.showsSeasons}
                    required
                />
                <TextField
                    margin="dense"
                    label="Network"
                    type="tel"
                    fullWidth
                    variant="standard"
                    onChange={e => setShowsNetwork(e.target.value)}
                    error={!!errors.showsNetwork}
                    helperText={errors.showsNetwork}
                    required
                />
                <TextField
                    margin="dense"
                    label="Short Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={e => setShowsShortDesc(e.target.value)}
                    error={!!errors.showsShortDesc}
                    helperText={errors.showsShortDesc}
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
                    onChange={e => setShowsLongDesc(e.target.value)}
                    error={!!errors.showsLongDesc}
                    helperText={errors.showsLongDesc}
                    inputProps={{
                        maxLength: 800,
                    }}
                    required
                />
                <div>
                    <InputLabel>Rating</InputLabel>
                    <Select
                        id="demo-simple-select"
                        value={showsRating}
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
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button color="primary" onClick={handleSubmit}>Save Changes</Button>
            </DialogActions>

        </Dialog>
    );
}
