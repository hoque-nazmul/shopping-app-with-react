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
        <div className="login text-center">
            <h2 className="text-muted text-center">Join the party</h2>
            {
                auth.user ? <button className="btn btn-danger mt-5 py-2 px-3" onClick={handleSignOut}>Sign Out</button> : <button className="btn btn-info mt-5 py-2 px-3" onClick={handleSignIn}>Sign in With Google</button>
            }           
        </div>
    );
};
export default Login;