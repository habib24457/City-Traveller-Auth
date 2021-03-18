import React, { useContext } from 'react';
import {Button} from 'react-bootstrap';
import  firebase from 'firebase';
import 'firebase/auth';
import firebaseConfig from "./firebase.config";
import {UserContext} from "../../App";
import {useHistory,useLocation} from "react-router-dom";

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }else{
    firebase.app();
  }

const Login = () => {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [loggedinUser,setLoggedinUser] = useContext(UserContext);
    const handleGoogleSignIn =()=> {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
         const {displayName,email} = result.user;
         const signedInUser = {name:displayName,email};
         setLoggedinUser(signedInUser);
         history.replace(from);
    })
    .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
  });
    }


    return (
        <div>
          <Button onClick={handleGoogleSignIn} className="btn btn-primary">Sign In with Google</Button>  
        </div>
    );
};

export default Login;