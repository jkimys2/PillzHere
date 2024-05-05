const { User, Pillz } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    pillz: async (parent, { username }) => {
      const params = username ? { username } : {};
      return User.find({params}).populate("pillz");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("pillz");
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
    addPillz: async (parent, { name, quantity, dosage }, context) => {
      if (context.user) {
        const pillz = await Pillz.create({
          name,
          quantity,
          dosage,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { pillz: pillz._id } },
          { new: true, runValidators: true }
        );

        return pillz;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
