const { Router } = require('express');
const { logIn,logOut } = require('../controllers/user');

const route = Router();

route.route("/login").post(logIn);
route.route("/logout").post(logOut);



module.exports = route;