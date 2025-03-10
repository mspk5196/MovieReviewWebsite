import React, { useState } from 'react'
import UserDetails from '../../components/UserDetails/UserDetails'
import '../../styles/pages/Profile.scss'
import ProfileEditForm from '../../components/Datas/ProfileEditForm';
import { useNavigate } from 'react-router-dom';

export default function Profile() {

  const { logout, name, email, login } = UserDetails();

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const navigate = useNavigate()

  return (
    <div className='profile'>
      <div className='profile_header'>
        <h1>Welcome, <span>{name}</span></h1>
        <p>EMail ID: {email}</p>
        <button onClick={() => { logout(); navigate('/') }}>Logout</button>
        <button onClick={() => { setEditDialogOpen(true); }}>Edit Details</button>

        <ProfileEditForm
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onSubmit={() => {
            setEditDialogOpen(false);
            logout();
            alert("Sign In again to continue...");
            navigate('/Profile');
            window.location.reload();
          }}
        />
      </div>
    </div>

  )
}
