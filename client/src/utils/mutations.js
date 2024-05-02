import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PILLZ = gql`
  mutation addPillz($name: String!, $quantity: Int!, $dosage: String!, $category: String!, $frequency: String!, $time: String!, $notes: String!, $paymentType: String!) {
    addPillz(name: $name, quantity: $quantity, dosage: $dosage, category: $category, frequency: $frequency, time: $time, notes: $notes, paymentType: $paymentType) {
        _id
    }
  }
`;
