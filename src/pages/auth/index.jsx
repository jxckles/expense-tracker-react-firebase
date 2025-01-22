import { useEffect, useState } from 'react';
import { auth, provider } from '../../config/firebase-config.js';
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from 'react-router-dom';
import { useGetUserInfo } from '../../hooks/useGetUserInfo.js'
import './authstyle.css';

export const Auth = () => {
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticate } = useGetUserInfo();

    const signInWithGoogle = async () => {
        setIsSigningIn(true);
        setError(null);
        try {
            const results = await signInWithPopup(auth, provider);
            const authInfo = {
                userID: results.user.uid,
                name: results.user.displayName,
                profilePhoto: results.user.photoURL,
                isAuth: true
            };
            localStorage.setItem('auth', JSON.stringify(authInfo));
            navigate('/expense-tracker');


        } catch (err) {
            setError('Failed to sign in. Please try again.');
        } finally {
            setIsSigningIn(false);
        }
    }

    if(isAuthenticate){
        return <Navigate to="/expense-tracker"/>
    }

    return (
        <div className="login-page">
            <p>Sign in w/ Google to Continue</p>
            {error && <p className="error-message">{error}</p>}
            <button 
                className="login-with-google-btn" 
                onClick={signInWithGoogle} 
                disabled={isSigningIn}
            >
                {isSigningIn ? 'Signing in...' : 'Sign in'}
            </button>
        </div>
    )
}
