import React from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();
export const AuthContextProvider = (props) => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
        auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  

const getUser = user => {
    const {displayName, email, photoURL} = user;
    return {name: displayName, email, photo: photoURL}
}
const Auth = () => {
    const [user, setUser] = useState(null)

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
            .then(response => {
                const signedInUser = getUser(response.user);
                setUser(signedInUser);
                return response.user;
            })
            .catch(error => {
                // setUser(null);
                return error.message;
            })
    }
    const signOut =  () => {
        return firebase.auth().signOut()
            .then(() => {
                setUser(null);
            })
            .catch(error => {
                // setUser(null);
                return error.message;
            })
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(usr => {
          if (usr) {
            const currentUser = getUser(usr);
            setUser(currentUser);
          } else {
            setUser(null);
          }
        });
    
        
      }, []);

    return {
        signInWithGoogle, 
        user, 
        signOut
    }
}

export default Auth;