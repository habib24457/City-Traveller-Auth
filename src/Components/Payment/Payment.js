import React,{ useContext} from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';
import { Elements } from '@stripe/react-stripe-js';
//import {useParams} from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './PaymentCard';
import loginPic from '../../Bg.png';
import {UserContext} from "../../App";
import './Payment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTicketAlt,faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const stripePromise = loadStripe('pk_test_51IhJfaKSu2UCBkjrmudHYyuSve1JRUdu2YnlbhaIRDGM4MM4sHkJUWrZXvficsncoRRozsKBe8QwyVaIJikKpEyp00qYSKyjSj');

const Payment = () => {
 const [loggedinUser] = useContext(UserContext);
 console.log(loggedinUser.ticketData);       

    return (
        <div className="BG" style={{
            backgroundImage: `url(${loginPic})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '100vh'
          }}>
        <Container>
            <Row>
                <Navbar>
                    <Navbar.Brand href="/home">CITY TRAVELLER</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                    </Navbar.Collapse>
                </Navbar>
            </Row>

            <Row className="mt-5 pt-5">
                <Col>
                      <div  className="final-ticket-design">
                      <h5> <FontAwesomeIcon icon={faTicketAlt}/> Your total Ticket price is: {loggedinUser?.ticketData?.total}$</h5>
                        <h5>
                        <FontAwesomeIcon icon={faMapMarkerAlt}/> 
                            Your Destination
                            </h5>
                        <p> <span className="text-success">From:</span>  {loggedinUser?.ticketData?.locationFrom} | <span className="text-success">To:</span> {loggedinUser?.ticketData?.locationTo}</p>
                      </div>
                </Col>
                <Col>
                <h5>This is an example of paymentMethod using Stripe:</h5>
                    <ul>
                        <li>Demo Card number is: 4242 4242 4242 4242</li>
                        <li>Card data is: Any future date</li>
                        <li>CVC: You can enter any 3 digit number</li>
                        <li>Zip: Enter your zip: eg. 45128</li>
                    </ul>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm></CheckoutForm>
                    </Elements>
                </Col>
            </Row>
        </Container>
        </div>
    );
};

export default Payment;