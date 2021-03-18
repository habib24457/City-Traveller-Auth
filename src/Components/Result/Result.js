import React, { useContext } from 'react';
import {UserContext} from "../../App";
import './Result.css';
import {Navbar,Button,Nav,Container,Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';


const Result = () => {
    const [loggedinUser,setLoggedinUser] = useContext(UserContext);
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
                <Nav.Link style={{color:'green'}} href="#features">User:{loggedinUser.name}</Nav.Link>
                </Nav>
                </Navbar.Collapse>
                </Navbar>
             </div>
            </div>

            <div className="row">
                <div className="col-md-4">
                    lorem ipsum dolor
                </div>

                <div className="col-md-8">
                    lorem ipsum dolor
                </div>
            </div>
        </Container>
    );
};

export default Result;