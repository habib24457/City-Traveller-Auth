import React, { useContext, useState, useEffect } from "react";
import ridesData from "../../Data/Data.json";
import { UserContext } from "../../App";
import "./Result.css";
import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import background from "../../Bg.png";
import Map from "./Map";
//import {Link} from 'react-router-dom';
//import {GoogleMapReact,Map,Marker} from 'google-map-react';

const Result = () => {
  let { rideId } = useParams();
  const [ride, setRide] = useState({});
  const history = useHistory();
  // const [userTicket,setUserTicket] = useState({});

  const [youngTicket, setYoungTicket] = useState("0");
  const [youngTPrice, setYoungTPrice] = useState(0);

  const [adultTicket, setAdultTicket] = useState("0");
  const [adultTPrice, setAdultTPrice] = useState(0);

  const [searchResult, setSearchResult] = useState({
    success: false,
    locationFrom: "",
    locationTo: "",
  });
  const rideIdNum = parseInt(rideId);

  useEffect(() => {
    const data = ridesData.filter((s) => s.id === rideIdNum);
    setRide(data);
  }, [rideIdNum]);
  //console.log("Useparams",ride[0]?.img);

  const carImg = ride[0]?.img;
  console.log("car=", carImg);

  //console.log("Hello",a+1);

  const [loggedinUser, setLoggedinUser] = useContext(UserContext);
  console.log(setLoggedinUser);

  const handleSearch = (e) => {
    e.preventDefault();
    const fromLoc = document.getElementById("fromLoc").value;
    const toLoc = document.getElementById("toLoc").value;

    if (fromLoc && toLoc) {
      const newSearchResult = { ...searchResult };
      newSearchResult.success = true;
      setSearchResult(newSearchResult);
    } else {
      alert("Enter you location");
    }
  };

  const handleBlur = (e) => {
    const newSearchResult = { ...searchResult };
    newSearchResult[e.target.name] = e.target.value;
    setSearchResult(newSearchResult);
  };

  const calculateTotal = (ticketPrice) => {
    console.log(youngTPrice);
    console.log(adultTPrice);
  };

  const handleYoungTicket = (e) => {
    e.preventDefault();
    // console.log("Zara",e.target.getAttribute('value'));

    if (e.target.getAttribute("name") === "youngPlus") {
      let ticketAmount = document.getElementById("youngTicketAmount").value;

      let ticketAmountNumber = parseInt(ticketAmount);

      let finalTicketAmount = ticketAmountNumber + 1;
      let ticketPrice = 100 * finalTicketAmount;
      setYoungTPrice(ticketPrice);
      setYoungTicket(finalTicketAmount);
      calculateTotal(ticketPrice);
    }

    if (e.target.getAttribute("name") === "youngMinus") {
      let ticketAmount = document.getElementById("youngTicketAmount").value;

      let ticketAmountNumber = parseInt(ticketAmount);
      if (ticketAmountNumber > 0) {
        let finalTicketAmount = ticketAmountNumber - 1;
        let ticketPrice = 100 * finalTicketAmount;
        setYoungTicket(finalTicketAmount);
        setYoungTPrice(ticketPrice);
        calculateTotal(ticketPrice);
      } else {
        alert("Ticket amount can not be negative");
      }
    }

    if (e.target.getAttribute("name") === "adultPlus") {
      let ticketAmount = document.getElementById("adultTicketAmount").value;
      let ticketAmountNumber = parseInt(ticketAmount);
      let finalTicketAmount = ticketAmountNumber + 1;
      let ticketPrice = 150 * finalTicketAmount;
      setAdultTicket(finalTicketAmount);
      setAdultTPrice(ticketPrice);
      calculateTotal(ticketPrice);
    }

    if (e.target.getAttribute("name") === "adultMinus") {
      let ticketAmount = document.getElementById("adultTicketAmount").value;
      let ticketAmountNumber = parseInt(ticketAmount);

      if (ticketAmountNumber > 0) {
        let finalTicketAmount = ticketAmountNumber - 1;
        let ticketPrice = 150 * finalTicketAmount;
        setAdultTicket(finalTicketAmount);
        setAdultTPrice(ticketPrice);
        calculateTotal(ticketPrice);
      } else {
        alert("Ticket amount cannot be negative");
      }
    }
  };

  const checkBook = () => {
    const ticket = { ...searchResult };
    ticket.total = adultTPrice + youngTPrice;
    console.log(ticket);

    if (searchResult.success && ticket.total > 0) {
      const userData = { ...loggedinUser };
      userData.ticketData = ticket;
      setLoggedinUser(userData);
      history.push("/payment");
    } else {
      alert("Please choose your location or Purchase ticket");
    }
  };

  return (
    <div
      className="BG"
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "150vh",
      }}
    >
      <Container>
        <div className="row">
          <div className="col-md-12">
            <Navbar>
              <Navbar.Brand href="/home">CITY TRAVELLER</Navbar.Brand>
              <Navbar.Collapse className="justify-content-end">
                <Nav>
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link style={{ color: "green" }} href="#features">
                    User:{loggedinUser.name}
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>

        <div className="row rowDesign">
          <div className="col-md-4 ">
            <Form className="search-design">
              <input
                onBlur={handleBlur}
                className="form-control"
                type="text"
                placeholder="Pick from"
                name="locationFrom"
                id="fromLoc"
                required
              />
              <br />
              <input
                onBlur={handleBlur}
                className="form-control"
                type="text"
                placeholder="Pick to"
                name="locationTo"
                id="toLoc"
                required
              />
              <br />

              <Button
                onClick={handleSearch}
                type="submit"
                className="btn btn-warning"
              >
                Search
              </Button>
            </Form>
            {searchResult.success && (
              <div className="search-result">
                <h3>Search Result</h3>
                <div className="location-detail">
                  <h4>From:{searchResult.locationFrom}</h4>
                  <h4>To:{searchResult.locationTo}</h4>
                </div>

                <div className="text-center">
                  <h4>Your selected car:</h4>
                  <img src={carImg} alt="car" />
                </div>
              </div>
            )}
          </div>

          <div className="col-md-4 show-map">
            <Form className="search-design">
              <Form.Group>
                <Form.Label>Ticket for young people = 100$</Form.Label>
                <Form.Control
                  id="youngTicketAmount"
                  value={youngTicket}
                  type="Text"
                  required
                  readOnly
                />
                <h3 style={{ cursor: "pointer" }}>
                  <span name="youngMinus" onClick={handleYoungTicket}>
                    -
                  </span>{" "}
                  <span name="youngPlus" onClick={handleYoungTicket}>
                    +
                  </span>
                </h3>
              </Form.Group>

              <Form.Group>
                <Form.Label>Ticket for adult = 150$</Form.Label>
                <Form.Control
                  id="adultTicketAmount"
                  value={adultTicket}
                  type="Text"
                  required
                  readOnly
                />
                <h3 style={{ cursor: "pointer" }}>
                  <span name="adultMinus" onClick={handleYoungTicket}>
                    -
                  </span>{" "}
                  <span name="adultPlus" onClick={handleYoungTicket}>
                    +
                  </span>
                </h3>
              </Form.Group>
            </Form>
          </div>
          <div className="col-md-4 ticket-design text-center">
            <h3 className="mb-3">Your purchases</h3>
            <p id="young-ticket">Sub Total Young ={youngTPrice} €</p>
            <p>Sub Total Adult = {adultTPrice} </p>
            <hr />
            <h3>Total ={adultTPrice + youngTPrice}€ </h3>
            <Button onClick={() => checkBook()} variant="warning">
              Book Your Ride
            </Button>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 text-center mt-3">
            <p>Google map API wasn't purchased.</p>
            <br />
            <Map></Map>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Result;
