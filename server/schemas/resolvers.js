const { User, Pillz } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('pillzs');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('pillzs');
    },
    //It is "pillzs" with an s because mongoDB does not know the z is implied plural. It actually helps in our favor.
    pillz: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Pillz.find(params).sort({ createdAt: -1 });
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
    addPillz: async (parent, { Pillz }, context) => {
      if (context.user) {
        const pillz = await Pillz.create({
          Pillz,
          username: context.user.username,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pillzs: pillz._id } },
          { new: true, runValidators: true },
        );

        return pillz;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;