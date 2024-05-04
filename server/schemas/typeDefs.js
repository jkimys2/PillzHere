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
    time: String
    notes: String
    paymentType: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user: User
    pillz: [Pillz]
    me: Auth
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPillz(name: String!, quantity: Int!, dosage: String!, category: String, frequency: String, time: String, notes: String, paymentType: String): Pillz
  }
`;

module.exports = typeDefs;