import React from 'react';
import {Navbar,Button,Nav,Container,Card} from 'react-bootstrap';
import {useState,useEffect} from 'react';
import ridesData from '../../Data/Data.json';
import background from '../../Bg.png';
import './Home.css';
import {Link} from 'react-router-dom';

const Home = () => {
        const [rides,setRides] = useState([]);

        useEffect(()=>{
            setRides(ridesData);
            
        },[])
        console.log(rides);
    return (
        <div className="BG" style={{ backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh'
        }}> 
            <Container> 
             <div className="row">  
             <div className="col-md-12">     
                <Navbar bg="light" variant="light">
                <Navbar.Brand href="/home">CITY TRAVELLER</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                <Nav>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="#features">Destination</Nav.Link>
                 <Nav.Link href="#pricing">Blog</Nav.Link>
                 <Nav.Link href="#pricing">Contact</Nav.Link>
                <Link to={"/login"}>
                <Button className="btn btn-danger">Login</Button>
                 </Link>
                </Nav>
                </Navbar.Collapse>
                </Navbar>
             </div>
            </div>
            <div className="row rides-design">          
            {
            rides.map(ride=> 
            
            <div key={ride.id} className="col-md-3">
             <Link to={`/result/${ride.id}`}> 
            <Card style={{ width: '15rem',height: '18rem',cursor: 'pointer'}}>
            <Card.Img variant="top" src={ride.img} />
             <Card.Body>
             <Card.Title style={{textAlign:'center',textDecoration:'none'}}>{ride.transport_name}</Card.Title>
            </Card.Body>
            </Card>
            </Link> 
            
            </div>
                   )
            } 
            </div>
        </Container>
        </div>
    );
};

export default Home;