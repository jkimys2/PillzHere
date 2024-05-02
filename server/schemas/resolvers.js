const Pillz = require('../models/pillz');
const User = require('../models/user');
const { pillz, user } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
      users: async () => {
        return User.find().populate('pillz');
      },
      user: async (parent, { username }) => {
        return User.findOne({ username }).populate('pillz');
      },
      //It is "pillzs" with an s because mongoDB does not know the z is implied plural. It actually helps in our favor.
      pillzs: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Pillz.find(params).sort({ createdAt: -1 });
      },
      pillz: async (parent, { pillzId }) => {
        return Pillz.findOne({ _id: pillzId });
      },
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate('pillz');
        }
        throw AuthenticationError;
      },
    },

Mutation: {
    addUser: async (parent, { username, email, password }) => {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
    },
    login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw AuthenticationError;
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw AuthenticationError;
        }
  
        const token = signToken(user);
  
        return { token, user };
      },
      addPillz: async (parent, { pillz }, context) => {
        if (context.user) {
          const newPillz = await Pillz.create({
            pillz,
            username: context.user.username,
          });
  
          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $addToSet: { pillz: pillz._id } }
          );
  
          return pillz;
        }
        throw AuthenticationError;
        ('You need to be logged in!');
      },

   }
};

module.exports = resolvers;