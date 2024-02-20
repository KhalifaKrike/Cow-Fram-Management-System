
const ExamsData = require('../models/mapping/medicalExams');


const getAllExams = (req, res) => {
    const data = ExamsData.getAll();
    res.json(data);
}
const getExam = (req, res) => {
    const data = ExamsData.getById(req.params.id);
    res.json(data);
}
const addExam = (req, res) => {
    ExamsData.add(req.body);
    res.json(req.body);
}
const deleteExam = (req, res) => {
    ExamsData.remove(req.params.id);
    res.json({ message: `the record with this id ${req.params.id} is deleted` });
}
const updateExam = (req, res) => {
    const { Disease, CowID, ExamDate, Result } = req.body;
    ExamsData.update({ id: req.params.id, Disease, CowID, ExamDate, Result });
    res.json({ message: `the record with this id ${req.params.id} is updated` });
}



module.exports = { getAllExams, getExam, addExam, deleteExam, updateExam };