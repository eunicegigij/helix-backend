const User = require("./schema/user");


const userService = {
    create: async function createUser(userData) {
    const newUser = await User.create(userData); 
    return newUser;
    }

};

module.exports = { userService };