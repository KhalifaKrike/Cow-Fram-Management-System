const { Router } = require('express');
const authMiddleware = require('../middelware/auth');
const {
    getAllmilkProduction,
    getMilkProduction,
    addMilkProduction,
    deleteMilkProduction,
    updateMilkProduction
} = require('../controllers/milkProduction');


const route = Router();

//route.use(authMiddleware);

route.route("/").get(getAllmilkProduction).post(addMilkProduction);
route.route("/:id").get(getMilkProduction).delete(deleteMilkProduction).patch(updateMilkProduction);



module.exports = route;