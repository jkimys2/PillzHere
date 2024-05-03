import AuthService from "./../utils/auth";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import {Nav, Button, Tab, Modal, Navbar, Container} from "react-bootstrap";
import { useState } from "react";
import { KnownArgumentNamesOnDirectivesRule } from "graphql/validation/rules/KnownArgumentNamesRule";
 

const Navigation = () => {

    const [showModal, setShowModal]= useState(false);
      return (
        <>
        <Navbar>
          <Container fluid>
            <Navbar.Brand as={Link} to='/'>
            💊   PillzHere
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar"/>
            <Navbar.Collapse>
              <Nav>
                <Nav.Link as={Link} to='/'>
                  {AuthService.loggedIn()? (
                      <>
                      <Nav.Link as={Link} to='/pillz'> See your Pillz</Nav.Link>
                      <Nav.Link onClick={AuthService.logout}>LogOut</Nav.Link>
                      </>
                  ):(
                    <Nav.Link onClick={()=>setShowModal(true)}>LogIn/SignUp</Nav.Link>
                  ) }
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignupForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
        </>
      );
    }

export default Navigation;