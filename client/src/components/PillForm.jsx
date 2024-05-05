import "./PillForm.css";
import { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { ADD_PILLZ } from "../utils/mutations";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

const pillForm = () => {
  const [userFormData, setUserFormData] = useState({
    name: "",
    quantity: "",
    dosage: "",
    category: "",
    frequency: "",
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [addPillz] = useMutation(ADD_PILLZ, {
    refetchQueries: [QUERY_USER, "me"],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addPillz({
        variables: {
          ...userFormData,
          quantity: parseInt(userFormData.quantity),
        },
      });
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      name: "",
      quantity: "",
      dosage: "",
      category: "",
      frequency: "",
    });
  };

  return (
    <Container className="cont">
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with adding your Pillz!
        </Alert>

        <Form.Group>
          <Form.Label className="label" htmlFor="name">Pillz Name:</Form.Label>
          <Form.Control
            className="form"
            type="text"
            placeholder="Pillz Name"
            name="name"
            onChange={handleInputChange}
            value={userFormData.name}
            required
          />
          <Form.Control.Feedback type="invalid">
            Pillz Name is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label className="label" htmlFor="quantity">Pillz Quantity:</Form.Label>
          <Form.Control
            className="form"
            type="text"
            placeholder="Pillz Quantity"
            name="quantity"
            onChange={handleInputChange}
            value={userFormData.quantity}
            required
          />
          <Form.Control.Feedback type="invalid">
            Pillz Quantity is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label className="label" htmlFor="dosage">Pillz Dosage:</Form.Label>
          <Form.Control
            className="form"
            type="text"
            placeholder="Pillz Dosage"
            name="dosage"
            onChange={handleInputChange}
            value={userFormData.dosage}
            required
          />
          <Form.Control.Feedback type="invalid">
            Pillz Dosage is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Button
        className="button"
          disabled={
            !(userFormData.name && userFormData.quantity && userFormData.dosage)
          }
          type="submit"
          variant="success"
        >
          Add Pillz!
        </Button>
      </Form>
    </Container>
  );
};

export default pillForm;
