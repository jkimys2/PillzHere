import "./Login.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
// import LoginForm from "../components/LoginForm";
// import SignupForm from "../components/SignupForm";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.css";
import CarOne from "../assets/images/CarOne.jpeg";
import CarTwo from "../assets/images/CarTwo.jpeg";

export default function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({ variables: { ...formState } });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Carousel>
            <Carousel.Item>
              <img src={CarOne} className="image" width={1600} height={850} alt="Carousel 1"  />
            </Carousel.Item>
            <Carousel.Item>
              <img src={CarTwo} className="image" width={1600} height={850} alt="Carousel 2" />
            </Carousel.Item>
          </Carousel>
        </Row>
      </Container>
    </>
  );
}
