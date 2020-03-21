import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();
    const handleSignIn = () => {
        auth.signInWithGoogle()
            .then(response => {
                window.location.pathname = '/review';
            })
    }
    const handleSignOut = () => {
        auth.signOut()
        .then (response => {
            window.location.pathname = '/'
        }) 
    }
    return (
        <div>
            <h2 className="text-muted text-center">Join the party</h2>
            {
                auth.user ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign in With Google</button>
            }           
        </div>
    );
};
export default Login;