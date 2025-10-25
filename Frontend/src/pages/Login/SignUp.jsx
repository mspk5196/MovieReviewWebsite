import React, { useEffect, useState } from 'react'
import '../../styles/pages/SignIn.scss'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
const API_URL = process.env.VITE_API_URL;

export default function SignUp() {

  const navigate = useNavigate();


  const [emailLogin, setEmail] = useState("");
  const [passLogin, setPass] = useState("");
  const [nameLogin, setName] = useState("");
  const roleLogin = "user";

  const [ud, setUserData] = useState([]);

  useEffect(() => {
    console.log("Updated user data:", ud);
  }, [ud]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    const fetchedData = await fetchUserData();
    // console.log("Fetched Data:", fetchedData);
  
    let userFound = fetchedData.some(ud => ud.EMail === emailLogin);
  
    if (userFound) {
      alert("User already exist with this email ID, Please use a different email.");
      console.log("User Already Exists");
      return;
    }
  
    try {
      const res = await fetch(`${API_URL}/api/add-user-data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailLogin, passLogin, nameLogin, roleLogin })
      });
  
      const data = await res.json();
      if (!res.ok) {
        throw new Error("HTTP Error");
      } else {
        alert("Registration successful! You can now sign in.");
        navigate("/Profile");
      }
    } catch (error) {
      alert("User Registration Failed");
      console.log(error);
    }
  };
  

  const fetchUserData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/fetch-user-data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error("HTTP Error");
      }
  
      setUserData(data.master_user);
      return data.master_user;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  
  return (
    <div className="SignUpBox">
      <h1>Sign Up</h1>
      <p style={{ textAlign: 'center' }}>Register your account here</p>
      <form onSubmit={handleSignUp}>
        <input type="text" name="name" placeholder='Name' required onChange={e => setName(e.target.value)} />
        <br />
        <input type="text" name="username" placeholder='Email' required onChange={e => setEmail(e.target.value)} />
        <br />
        <input type="password" name="password" placeholder='Password' required onChange={e => setPass(e.target.value)} />
        <br />
        <Button type='submit' variant='contained' sx={{ backgroundColor: 'rgb(0, 140, 255)' }}>Sign Up</Button>

        <p>Already have an account, <a href="/Profile">Sign In</a></p>
      </form>
    </div>
  )
}
