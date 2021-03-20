import React, { useContext, useState} from 'react';
import {Button,Container,Navbar,Nav} from 'react-bootstrap';
import  firebase from 'firebase';
import 'firebase/auth';
import firebaseConfig from "./firebase.config";
import {UserContext} from "../../App";
import {useHistory,useLocation,Link} from "react-router-dom";
import "./Login.css";

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }else{
    firebase.app();
  }

const Login = () => { 
  const [newUser,setNewUser] = useState(false);
   const[user,setUser] = useState({
    isSignedIn: false,
    name:'',
    email:'',
    password:'',
    error:'',
    success: false,
  });

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/result" } };


  //handle submit 
   const handleSubmit =(e)=>{
   // console.log(user.email,user.password);

   /*Creating a new account with email and password */ 
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const newUserInfo = {...user};
        newUserInfo.error = errorMessage;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });   
    }/*Creating a new account with email and password ends*/



    /*Signin with email and password */ 
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then((userCredential) => {
      const newUserInfo = {...user};
      newUserInfo.error = '';
      newUserInfo.email = user.email;
      newUserInfo.success = true;
      newUserInfo.name = user.name;
      setUser(newUserInfo);
      setLoggedinUser(newUserInfo);
     history.replace(from);
     //history.push("/result");
    
     console.log("Login Successfully",newUserInfo);
    })
    .catch((error) => {
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success =false;
      setUser(newUserInfo);
    });
    }/*Signin with email and password ends*/ 
    
    e.preventDefault();   
   }

    
    
  /*Google Sign in*/
    const [loggedinUser,setLoggedinUser] = useContext(UserContext);
    console.log(loggedinUser); 
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
      console.log(error);
      });
    }/*Google Sign in Ends*/


 /*Form validation , Handle blur */
    const handleBlur = (e)=>{
      let isFormValid;
      //validating email
      if(e.target.name === 'email'){
        isFormValid = /\S+@\S+\.\S+/.test(e.target.value); 
      } 
      //validating password
      if(e.target.name === 'password'){
        const isPasswordValid = e.target.value.length >6;
        const passwordHasNumber = /\d{1}/.test(e.target.value); //regular expression check one or more number
        isFormValid = (isPasswordValid && passwordHasNumber);
      }
      //confirming password


      //validating name
      if(e.target.name ==='name'){
        isFormValid = (e.target.value);
      }

      if(isFormValid){
        const newUserInfo = {...user}; //copying user object in newUserInfo
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
      }else{
        const newUserInfo = {...user}; 
        newUserInfo.error = 'Enter Valid username & password';
        setUser(newUserInfo);
      }
    }/*Form validation , Handle blur ends*/


    return (
        <Container>
            <div className="row">  
             <div className="col-md-12">     
                <Navbar bg="light" variant="light">
                <Navbar.Brand href="/home">CITY TRAVELLER</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                <Nav>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="#">Destination</Nav.Link>
                <Nav.Link href="#">Contact</Nav.Link>
                <Button className="btn btn-danger">Login</Button>
                </Nav>
                </Navbar.Collapse>
                </Navbar>
             </div>
            </div>

        <div className="row form-design form-group shadow-lg p-3 mb-5 bg-white rounded">                   
        <form onSubmit={handleSubmit}>
          <h2 style={{marginBottom:"30px"}}>Create a new account</h2>
          {
           newUser && <input  className="form-control" onBlur={handleBlur} type="text" 
          placeholder="Name" name="name" required />   
          }       
                
          <br/>
          <input  className="form-control" onBlur={handleBlur} type="text" placeholder="Email" name="email" required />
          <br/>
          <input  className="form-control" onBlur={handleBlur} type="password" placeholder="Password" name="password" required />
          <br/> 
          {
           newUser && <input className="form-control" onBlur={handleBlur} 
             type="password" placeholder="ConfirmPassword" 
              name="confirmPassword" required/> 
          }                  
                  
          <br/>                           
           <input type="submit" className="submitBtn-design" 
           value={newUser ? 'Create Account' : 'Login'}/> 
                             
          <br/>

          <p style={{marginTop:"10px"}}>Don't Have an account?
          <Link onClick={() =>{setNewUser(!newUser)}} to="/login">
            Create a New Account
          </Link>
          </p>

          
           <p style={{marginTop:"10px",color:"red"}}>{user.error}</p>
          
          
          {
            user.success && <p style={{marginTop:"10px",color:"green"}}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>
          }
      </form>
      </div> 

      <div className="row google-button-design">
           <Button type="button" className="btn btn-info" onClick={handleGoogleSignIn} >
            Sign In with Google</Button> 
      </div>
          
      </Container>
    );
};

export default Login;