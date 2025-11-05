const auth = require("./schema/auth");

const authService = {
  create: async function createAuth({ email, password }) {
    const newAuth = auth.create({ email, password });
    (await newAuth).save();
    return newAuth;
  },
  getById: async function getAuthById(id) {
    const data = await auth.findById(id).exec();
    return data;
  },
  getAuthByFilter: async function getAuth(query) {
    const data = await auth.findOne({ ...query }).exec();
    return data;
  },

  updatePassword: async function updatePass(authId, password) {
    const data = await auth.findByIdAndUpdate(
      authId,
      { password },
      { new: true }
    );
    return data;
  },
  updateAuth: async function updateAuthById(authId, updateData) {
    const data = await auth.findByIdAndUpdate(
      authId,
      {
        ...updateData,
      },
      { new: true }
    );
    return data;
  },
  saveVerificationToken: async function saveToken(authId, token, expiryDate) {
    const data = await auth.findByIdAndUpdate(
      authId,
      {
        verificationToken: token,
        verificationTokenExpiryDate: expiryDate,
      },
      { new: true }
    );
    return data;
  },

  findByVerificationToken: async function findByToken(token) {
    const data = await auth.findOne({ verificationToken: token }).exec();
    return data;
  },
};

module.exports = { authService };
