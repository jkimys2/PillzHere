import {gql} from '@apollo/client';

export const QUERY_PILLZ = gql`
query user($username: String!) {
    user(username: $username) {
      _id
      email
      password
      pillz {
        _id
        category
        dosage
        frequency
        name
        notes
        payment_type
        quantity
        time
      }
      username
    }
  }
`;


export const QUERY_USER = gql`

    {
        user {
            _id
            username
            email
            pillz {
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



