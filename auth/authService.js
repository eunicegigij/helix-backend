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
    const data = await auth.find({ ...query }).exec();
    return data;
  },
};

module.exports = { authService };
