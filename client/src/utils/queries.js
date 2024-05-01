import {gql} from '@apollo/client';

export const QUERY_PILLZ = gql`
    query pillz($username: String) {
        pillz(username: $username) {
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



