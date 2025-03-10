import React, { useEffect, useState } from 'react'
import '../../styles/pages/SignIn.scss'
import { Button } from '@mui/material'
import UserDetails from '../../components/UserDetails/UserDetails';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {

    const [emailLogin, setEmail] = useState("");
    const [passLogin, setPass] = useState("");

    const {login}=UserDetails();

    const [ud, setUserData] = useState([]);

    const navigate = useNavigate()

    const fetchUserData = async () => {
        setUserData([]);
        try {
            const res = await fetch("http://localhost:8000/api/fetch-user-data", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            

            if (!res.ok) {
                throw new Error("HTTP Error");
            }
            else{
                setUserData(data.master_user);
            }
        } catch (error) {
            console.log(error);
        }
    };
    let userFound = false;
    const handleSignIn = async (e) => {
        e.preventDefault();
        await fetchUserData();

        ud.forEach(ud => {
            if (emailLogin === ud.EMail && passLogin === ud.Password) {
                userFound=true;
                if (ud.Role === 'Admin') {
                    
                    window.location.href = "/";
                    login({ email: ud.EMail, name: ud.Name, role: ud.Role,isAuth:true, userID:ud.ID });
                    alert("Admin Logged In Successfully");
                }
                else {
                    login({ email: ud.EMail, name: ud.Name, role: ud.Role,isAuth:true, userID:ud.ID });
                    alert("User Logged In Successfully");
                    navigate('/')
                }
            }
        })
        if(!userFound){
            alert("Invalid Email or Password");
            }
    };
    useEffect(()=>{
        fetchUserData();
    },[]);
    return (

        <div className="SignInBox">
            <h1>Sign In</h1>
            <form onSubmit={handleSignIn}>
                <input type="text" name="username" placeholder='Username' required onChange={e => setEmail(e.target.value)} />
                <br />
                <input type="password" name="password" placeholder='Password' required onChange={e => setPass(e.target.value)} />
                <br />
                <Button type='submit' variant='contained' sx={{ backgroundColor: 'rgb(0, 140, 255)' }}>Sign In</Button>

                <p>Not have an account yet, <a href="/SignUp">Sign Up</a></p>
            </form>
        </div>
    )
}
