// const { pillz, user } = require('../models');
// const user = require('../models/user');

// const resolvers = {
//     Query: {
//       user: async () => {
//         return user.find().populate('user');
//       },
//     }

//   Mutation: {
//     addUser: async (parent, { username, email, password }) => {
//       const user = await User.create({ username, email, password });
//       const token = signToken(user);
//       return { token, user };
//     },
//   },
//  };