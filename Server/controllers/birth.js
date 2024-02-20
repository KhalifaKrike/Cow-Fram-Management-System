
const BirthsData = require('../models/mapping/birth');


const getAllBirths = (req, res) => {
    const data = BirthsData.getAll();
    res.json(data);
}
const getBirth = (req, res) => {
    const data = BirthsData.getById(req.params.id);
    data ? res.json(data) : res.json({ massege: "there is no data" });
}
const addBirth = (req, res) => {
    BirthsData.add(req.body);
    res.json(req.body);
}
const deleteBirth = (req, res) => {
    BirthsData.remove(req.params.id);
    res.json({ message: `the record with this id ${req.params.id} is deleted` });
}
const updateBirth = (req, res) => {//
    const { MotherCowID, BirthDate } = req.body;
    BirthsData.update({ id: req.params.id, MotherCowID, BirthDate });
    res.json({ message: `the record with this id ${req.params.id} is updated` });
}



module.exports = { getAllBirths, getBirth, addBirth, deleteBirth, updateBirth };