const { Router } = require('express');
const { getAllCows, getCow, deleteCow, addCow, updateCow } = require('../controllers/cow');
const authMiddleware = require('../middelware/auth');

const route = Router();

//route.use(authMiddleware);

route.route("/").get(getAllCows).post(addCow);
route.route("/:id").get(getCow).delete(deleteCow).patch(updateCow);



module.exports = route;