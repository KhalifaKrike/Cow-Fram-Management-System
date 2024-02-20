const { Router } = require('express');
const { getAllExams, getExam, addExam, deleteExam, updateExam } = require('../controllers/medicalExams');
const authMiddleware = require('../middelware/auth');

const route = Router();

//route.use(authMiddleware);

route.route("/").get(getAllExams).post(addExam);
route.route("/:id").get(getExam).delete(deleteExam).patch(updateExam);



module.exports = route;