import React from 'react';
import { Navbar, Button, Nav, Container, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ridesData from '../../Data/Data.json';
import background from '../../Bg.png';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        setRides(ridesData);

    }, [])
    console.log(rides);
    return (
        <div className="BG" style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'
        }}>
            <Container>
                <div className="row">
                    <div className="col-md-12">
                        <Navbar >
                            <Navbar.Brand href="/home">CITY TRAVELLER</Navbar.Brand>
                            <Navbar.Collapse className="justify-content-end">
                                <Nav>
                                    <Nav.Link href="/home">Home</Nav.Link>
                                    <Link to={"/login"}>
                                        <Button className="btn btn-danger">Login</Button>
                                    </Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                </div>
                <h1 className="text-center text-secondary">Choose a vehicle</h1>
                <div className="row rides-design">
                    {
                        rides.map(ride =>
                            <div key={ride.id} className="col-md-3">
                                <h4 className="text-center">{ride.transport_name}</h4>
                                <Link to={`/result/${ride.id}`}>
                                    <Card style={{ width: '15rem', height: '12rem', cursor: 'pointer' }}>
                                        <Card.Img className="p-5 ride-image" variant="top" src={ride.img} />
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