import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import UserDetails from '../UserDetails/UserDetails';

export default function ProfileEditForm({ open, onClose, onSubmit }) {
    const [emailEdit, setEmail] = useState('');
    const [nameEdit, setName] = useState('');
    const [idEdit, setEditId]=useState('');
    const [errors, setErrors] = useState({});


    const { email, name, userID, login }=UserDetails();

    useEffect(() => {
            setEmail(email || '');
            setName(name || '');
            setEditId(userID || '')
    }, []);

    const validateFields = () => {
        const newErrors = {};
        if (!emailEdit) newErrors.emailEdit = 'Email is required';
        if (!nameEdit) newErrors.nameEdit = 'Name is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;


        try {
            const res = await fetch(`http://localhost:8000/api/edit-user-data/`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    emailEdit, 
                    nameEdit,
                    idEdit
                })
            });

            if (!res.ok) {
                throw new Error("HTTP Error");
            }
            else{
                onSubmit();
            }
            
        } catch (error) {
            console.error(error);
        }

    };
    

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Details</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={emailEdit}
                    onChange={e => setEmail(e.target.value)}
                    error={!!errors.emailEdit}
                    helperText={errors.emailEdit}
                />
                <TextField
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={nameEdit}
                    onChange={e => setName(e.target.value)}
                    error={!!errors.nameEdit}
                    helperText={errors.nameEdit}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Save Changes</Button>
            </DialogActions>

        </Dialog>
    );
}
