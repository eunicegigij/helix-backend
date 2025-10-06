const User = require("./schema/user");

const userService = {
  create: async function createUser(userData) {
    const newUser = await User.create(userData);
    return newUser;
  },

  findByAuthId: async function findByAuthId(authId) {
    return await User.findOne({ authId }).exec();
  },

  findById: async function findByUserId(id) {
    return await User.findById(id).exec();
  },

  update: async function updateUser(userId, updateData) {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).exec();
    return updatedUser;
  },
};

module.exports = { userService };
