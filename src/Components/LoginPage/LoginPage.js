import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./LoginPage.css";
import loginPic from "../../Bg.png";
import firebase from "firebase";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import loginImg from "../../assets/login.png";

/**Initializing firebase */
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const LoginPage = () => {
  //const [toggleState, setToggleState] = useState(1);
  //const [newUser, setNewUser] = useState(false);
  const [loggedinUser, setLoggedinUser] = useContext(UserContext);

  // const [user, setUser] = useState({
  //   isSignedIn: false,
  //   name: "",
  //   email: "",
  //   password: "",
  //   error: "",
  //   errorMessage: "",
  //   success: false,
  // });

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/result" } };

  /**Toggle between login and register */
  // const toggleTab = (index) => {
  //   setToggleState(index);
  // };

  /**Validating form data*/
  // const handleBlur = (e) => {
  //   let isFormValid;
  //   if (e.target.name === "user-name") {
  //     user.name = e.target.value;
  //   }
  //   if (e.target.name === "email") {
  //     isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
  //   }
  //   if (e.target.name === "password") {
  //     const isPasswordValid = e.target.value.length > 5;
  //     const passwordHasNumber = /\d{1}/.test(e.target.value);
  //     isFormValid = isPasswordValid && passwordHasNumber;
  //   }
  //   if (isFormValid) {
  //     const newUserInfo = { ...user }; //copying user object in newUserInfo
  //     newUserInfo[e.target.name] = e.target.value;
  //     setUser(newUserInfo);
  //   }
  // };

  /**Signup:creating a new user */
  // const handleSignup = (e) => {
  //   console.log(user);
  //   e.preventDefault();
  //   if (user.name && user.email && user.password) {
  //     firebase
  //       .auth()
  //       .createUserWithEmailAndPassword(user.email, user.password)
  //       .then(() => {
  //         const alertMessage = "Register successful";
  //         const newUserInfo = { ...user };
  //         newUserInfo.error = "";
  //         newUserInfo.success = true;
  //         newUserInfo.errorMessage = alertMessage;
  //         setUser(newUserInfo);
  //         console.log("Successfully");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         const errorMessage = error.message;
  //         const newUserInfo = { ...user };
  //         newUserInfo.error = errorMessage;
  //         newUserInfo.success = false;
  //         setUser(newUserInfo);
  //       });
  //   } else {
  //     const alertMessage =
  //       "input cannot be empty and password must be at least 6 characters";
  //     const newInfo = { ...user };
  //     newInfo.errorMessage = alertMessage;
  //     setUser(newInfo);
  //   }
  // };

  /**Handle login */
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   //console.log(user.email, user.password);
  //   if (user.email && user.password) {
  //     firebase
  //       .auth()
  //       .signInWithEmailAndPassword(user.email, user.password)
  //       .then(() => {
  //         const alertMessage = "Login successful";
  //         const newInfo = { ...user };
  //         newInfo.errorMessage = alertMessage;
  //         const signedInUser = { name: user.name, email: user.email };
  //         setLoggedinUser(signedInUser);
  //         setUser(newInfo);
  //         history.replace(from);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         const errorMessage = error.message;
  //         const newUserInfo = { ...user };
  //         newUserInfo.error = errorMessage;
  //         newUserInfo.success = false;
  //         setUser(newUserInfo);
  //       });
  //   } else {
  //     const alertMessage = "input cannot be empty";
  //     const newInfo = { ...user };
  //     newInfo.errorMessage = alertMessage;
  //     setUser(newInfo);
  //   }
  // };

  /**Handle google signin */
  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signedInUser = { name: displayName, email };
        setLoggedinUser(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(loggedinUser);
  return (
    <div
      className="BG"
      style={{
        backgroundImage: `url(${loginPic})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Navbar>
              <Nav.Link href="/home">
                <Button className="btn btn-secondary">Home</Button>
              </Nav.Link>
              <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
            </Navbar>
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <img src={loginImg} alt="login" />
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-success google-btn-design"
            >
              Sign in With Google
            </button>
          </div>
          <div className="col-md-4"></div>
        </div>

        {/* <div className="row mt-5">
          <div className="col-md-12">
            <div className="bloc-tabs">
              <button
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
              >
                Login
              </button>

              <button
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}
              >
                Register
              </button>
            </div>

            {/* <div className="row">
              <div className="content-tabs">
                <div className={toggleState === 1 ? "content  active-content" : "content"}>

                  <div class="col-xs-1" align="center">
                    <p style={{ marginTop: "10px", color: "red" }}>{user.error}</p>
                    <p style={{ marginTop: "10px", color: "red" }}>{user.errorMessage}</p>
                    <form className="form-design">
                      <input style={{ width: '350px' }} className="form-control" onBlur={handleBlur} type="text"
                        placeholder="Enter your Email" name="email" required />
                      <br />
                      <input style={{ width: '350px' }} className="form-control" onBlur={handleBlur} type="password"
                        placeholder="Enter your password" name="password" required />
                      <br />
                      <button type="submit" onClick={handleLogin} class="btn btn-warning">Login</button>
                    </form>
                  </div>
                </div>

                <div className={toggleState === 2 ? "content  active-content" : "content"}>
                  <ul>
                    <li>Email: example@example.com</li>
                    <li>Password must contain one Alphabet and at least 6 characters</li>
                  </ul>
                  <div class="col-xs-1" align="center">
                    <p style={{ marginTop: "10px", color: "red" }}>{user.error}</p>
                    <p style={{ marginTop: "10px", color: "red" }}>{user.errorMessage}</p>
                    <form className="form-design">
                      <input style={{ width: '350px' }} className="form-control" onBlur={handleBlur} type="text"
                        placeholder="Your name" name="user-name" required />
                      <br />
                      <input style={{ width: '350px' }} className="form-control" onBlur={handleBlur} type="text"
                        placeholder="Enter your Email" name="email" required />
                      <br />
                      <input style={{ width: '350px' }} className="form-control" onBlur={handleBlur} type="password"
                        placeholder="Password" name="password" required />
                      <br />
                      <button onClick={handleSignup} class="btn btn-warning">Register</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
