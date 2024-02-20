const { Router } = require('express');
const {  getAllBirths, getBirth, addBirth, deleteBirth, updateBirth  } = require('../controllers/birth');
const authMiddleware = require('../middelware/auth');

const route = Router();

//route.use(authMiddleware);

route.route("/").get(getAllBirths).post(addBirth);
route.route("/:id").get(getBirth).delete(deleteBirth).patch(updateBirth);



module.exports = route;