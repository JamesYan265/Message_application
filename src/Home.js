import { Google } from '@mui/icons-material';
import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import {auth, provider} from "./firebase";
import './Home.css';

function Home() {
  return (
    <>
        <div className='loginContainer'>
            <div className='loginTitle'>
                <p>Welcome to Message Application</p>
                <p>Hope you can enjoy !</p>
            </div>
            <SignInButton />
        </div>
    </>
  )
}

export default Home

//SignIn
function SignInButton() {
    const signInWithGoogle = () => {
        //use Firebase login
        signInWithPopup(auth, provider);
    };

    return (
        <div className='loginBox'>
            <button onClick={signInWithGoogle} className="loginButton">
                <Google fontSize='large'/><p>Login</p>
            </button> 
        </div>
    )
}