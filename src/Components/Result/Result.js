import React, { useContext } from 'react';
import {UserContext} from "../../App";
import './Result.css';
import {Navbar,Nav,Container,Form,Button} from 'react-bootstrap';
//import {Link} from 'react-router-dom';
//import {GoogleMapReact,Map,Marker} from 'google-map-react';

import mapImg from '../../images/Map.png';


const Result = () => {
    const [loggedinUser,setLoggedinUser] = useContext(UserContext);
    console.log(setLoggedinUser);
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

            <div className="row rowDesign">
                <div className="col-md-4 ">
                    <Form className="search-design">
                    <input  className="form-control" type="text" 
                     placeholder="Pick from" name="fromPlace" required />         
                    <br/>
                    <input  className="form-control" type="text" 
                     placeholder="Pick to" name="toPlace" required />         
                    <br/>
                    <Button className="btn btn-warning">Search</Button>
                    </Form>
                </div>

                <div className="col-md-8 show-map">

                   <img src={mapImg} alt="map"/>
                   
                   {/* {
                   google map properties (Map,Marker) weren't importing. Although dependenties r installed
                    <h1>Show Map</h1>
                    <Map google={this.props.google} zoom={14}>
                    <Marker onClick={this.onMarkerClick}
                     name={'Current location'} />
                    </Map>
                }  */}

                </div>
            </div>
        </Container>
    );
};

export default Result;