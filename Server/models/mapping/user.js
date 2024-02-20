const fs = require("fs/promises");


const path = require("path").join(__dirname, '..', 'data', 'users.json');
let users = require("../data/users.json");

const findUser = ({ email, password }) => {
    const userFound = users.filter(user => user.email === email && user.password === password)[0];
    return userFound && userFound;
}




module.exports = { findUser };

