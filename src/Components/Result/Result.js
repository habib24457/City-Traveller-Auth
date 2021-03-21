import React, { useContext,useState,useEffect } from 'react';
import ridesData from '../../Data/Data.json';
import {UserContext} from "../../App";
import './Result.css';
import {Navbar,Nav,Container,Form,Button} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
//import {Link} from 'react-router-dom';
//import {GoogleMapReact,Map,Marker} from 'google-map-react';

import mapImg from '../../images/Map.png';


const Result = () => {
    let {rideId} = useParams();
    const [ride,setRide] = useState({});
    const [searchResult,setSearchResult] = useState({
        success: false,
        locationFrom:'',
        locationTo:'',
    })

    useEffect(() => {
        const data = ridesData.filter(s => s.id == rideId);
        setRide(data);
    },[rideId])
    //console.log("Useparams",ride[0]?.img);

    const carImg = ride[0]?.img;
    console.log("car=",carImg);

    const [loggedinUser,setLoggedinUser] = useContext(UserContext);
    console.log(setLoggedinUser);

    const handleSearch=()=>{
        const newSearchResult = {...searchResult};
        newSearchResult.success = true;
        setSearchResult(newSearchResult);
    }

    const handleBlur = (e)=>{
        const newSearchResult = {...searchResult};
        newSearchResult[e.target.name]= e.target.value;
        setSearchResult(newSearchResult);
    }


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
                <Nav.Link style={{color:'green'}} href="#features">User:{loggedinUser.name}</Nav.Link>
                </Nav>
                </Navbar.Collapse>
                </Navbar>
             </div>
            </div>

            <div className="row rowDesign">
                <div className="col-md-4 ">
                    <Form className="search-design">
                    <input onBlur={handleBlur}  className="form-control" type="text" 
                     placeholder="Pick from" name="locationFrom" required/>         
                    <br/>
                    <input onBlur={handleBlur} className="form-control" type="text" 
                     placeholder="Pick to" name="locationTo" required/>         
                    <br/>
                    <Button onClick={handleSearch} className="btn btn-warning">Search</Button>
                    </Form>                    

                    {
                      searchResult.success && 
                      <div className="search-result">
                        <h3>Search Result</h3>
                        <div className="location-detail">
                        <h4>From:{searchResult.locationFrom}</h4>
                        <h4>To:{searchResult.locationTo}</h4>
                        </div> 

                        <div> 
                        <img src={carImg} alt="c"/>
                        </div>                                                                    
                     </div>
                      
                    }

                </div>

                <div className="col-md-8 show-map">

                   <img src= {mapImg} alt="map"/>
                   
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