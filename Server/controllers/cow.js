const cowData = require('../models/mapping/cow')

const getAllCows = (req, res) => {
    const data = cowData.getAll();
    res.json(data);
}
const getCow = (req, res) => {
    const data = cowData.getById(req.params.id);
    res.json(data);
}
const addCow = (req, res) => {
    cowData.add(req.body);
    res.json(req.body);
}
const deleteCow = (req, res) => {
    cowData.remove(req.params.id);
    res.json({ message: `the record with this id ${req.params.id} is deleted` });
}
const updateCow = (req, res) => {
    const { EntryDate, Breed } = req.body;
    cowData.update({ id: req.params.id, EntryDate, Breed });
    res.json({ message: `the record with this id ${req.params.id} is updated` });
}



module.exports = { getAllCows, getCow, deleteCow, addCow, updateCow };
