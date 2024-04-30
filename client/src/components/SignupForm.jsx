import { useState } from "react";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { CREATE_USER } from "../utils/mutations";
import { createUser } from "../utils/API";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validated] = useState(false);
  const [createUser] = useMutation(CREATE_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      const { data } = await createUser({ variables: { ...userFormData } });
      Auth.login(data.createUser.token);
    } catch (err) {
      console.error(err);
    }
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <Theme>
        <Form.Root
          className="FormRoot"
          noValidate
          validated={validated}
          onSubmit={handleFormSubmit}
        >
          <Form.Field className="FormField" name="email">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">Username</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing">
                Please enter a username
              </Form.Message>
              <Form.Message className="FormMessage" match="typeMismatch">
                Please provide a username
              </Form.Message>
            </div>
            <Form.Control asChild onChange={handleInputChange}>
              <input className="Input" required />
            </Form.Control>
          </Form.Field>
          <Form.Field className="FormField" name="email">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">Email</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing">
                Please enter your email
              </Form.Message>
              <Form.Message className="FormMessage" match="typeMismatch">
                Please provide a valid email
              </Form.Message>
            </div>
            <Form.Control asChild onChange={handleInputChange}>
              <input className="Input" type="email" required />
            </Form.Control>
          </Form.Field>
          <Form.Field className="FormField" name="password">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Form.Label className="FormLabel">Password</Form.Label>
              <Form.Message className="FormMessage" match="valueMissing">
                Please enter a valid password
              </Form.Message>
            </div>
            <Form.Control asChild onChange={handleInputChange}>
              <textarea className="Input" type="password" required />
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild>
            <button className="Button" style={{ marginTop: 10 }}>
              Sign Up!
            </button>
          </Form.Submit>
        </Form.Root>
      </Theme>
    </div>
  );
};

export default SignupForm