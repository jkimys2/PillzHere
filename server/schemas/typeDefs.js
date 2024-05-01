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

  type Mutation {
    addUser(username: String!, email: String!, password: String!, pillzId): Auth
    login(email: String!, password: String!): Auth
    addPillz(name: String!, quantity: Int!, dosage: String!, category: String!, frequency: String!, time: String!, notes: String!, payment_type: String!): Pillz
    addPillz(pillzId: ID!): Pillz
    removePillz(pillzId: ID!): Pillz
`;

module.exports = typeDefs;
