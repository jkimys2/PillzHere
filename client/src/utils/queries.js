import { gql } from "@apollo/client";

export const QUERY_PILLZ = gql`
  query Pillz {
    Pillz {
      name
      quantity
      dosage
    }
  }
`;

export const QUERY_USER = gql`
  query me {
    me {
      username
      pillz {
        _id
        name
        quantity
        dosage
      }
    }
  }
`;

export const QUERY_SINGLE_PILL = gql`
  query Pillz($pillzId: ID!) {
    Pillz(pillzId: $pillzId) {
      _id
      name
      dosage
      frequency
      category
      time
      notes
      payment_type
    }
  }
`;
