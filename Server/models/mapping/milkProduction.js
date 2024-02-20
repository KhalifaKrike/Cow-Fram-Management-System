const fs = require("fs/promises");


const path = require("path").join(__dirname, '..', 'data', 'MilkProduction.json');
let milkProduction = require("../data/MilkProduction.json");


const getAll = () => milkProduction;

const getById = (id) => milkProduction.filter(milk => milk.ProductionID === Number(id))[0];

const add = async ({ ProductionDate, CowID, MilkQuantity }) => {
    milkProduction.push({
        ProductionID: milkProduction.length == 0 ? 1 : milkProduction[milkProduction.length - 1].ProductionID + 1,
        ProductionDate: ProductionDate || new Date().toISOString().slice(0, 10),
        CowID: CowID,
        MilkQuantity
    });
    await fs.writeFile(path, JSON.stringify(milkProduction));
}

const remove = async (id) => {
    milkProduction = milkProduction.filter(milk => milk.ProductionID !== Number(id));
    await fs.writeFile(path, JSON.stringify(milkProduction));
}

const update = async ({ id, ProductionDate, CowID, MilkQuantity }) => {
    milkProduction = milkProduction.map(milk => {
        if (milk.ProductionID === Number(id)) {
            milk.ProductionDate = ProductionDate || milk.ProductionDate;
            milk.CowID = CowID || milk.CowID;
            milk.MilkQuantity = MilkQuantity || milk.MilkQuantity;
        }
        return milk;
    });
    await fs.writeFile(path, JSON.stringify(milkProduction));
}

module.exports = { getAll, getById, add, remove, update };
