const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    pillz: [Pillz]
  }

  type Pillz {
    _id: ID
    name: String
    quantity: Int
    dosage: String
    category: String
    frequency: String
    payment_type: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user: User
  }
`;

module.exports = typeDefs;
