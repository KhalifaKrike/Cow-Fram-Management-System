const milkProductionData = require('../models/mapping/milkProduction');

const getAllmilkProduction = (req, res) => {
    const data = milkProductionData.getAll();
    res.json(data);
}
const getMilkProduction = (req, res) => {
    const data = milkProductionData.getById(req.params.id);
    res.json(data);
}
const addMilkProduction = (req, res) => {
    milkProductionData.add(req.body);
    res.json(req.body);
}
const deleteMilkProduction = (req, res) => {
    milkProductionData.remove(req.params.id);
    res.json({ message: `the record with this id ${req.params.id} is deleted` });
}
const updateMilkProduction = (req, res) => {
    const { ProductionDate, CowID, MilkQuantity } = req.body;
    milkProductionData.update({ id: req.params.id, ProductionDate, CowID, MilkQuantity });
    res.json({ message: `the record with this id ${req.params.id} is updated` });
}



module.exports = {
    getAllmilkProduction,
    getMilkProduction,
    addMilkProduction,
    deleteMilkProduction,
    updateMilkProduction
};
