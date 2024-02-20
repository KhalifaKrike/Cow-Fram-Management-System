const fs = require("fs/promises");


const path = require("path").join(__dirname, '..', 'data', 'births.json');
const cowpath = require("path").join(__dirname, '..', 'data', 'cows.json');
let cows = require("../data/cows.json");
let Births = require("../data/births.json");

const getAll = () => Births;

const getById = (id) => Births.filter(Birth => Birth.BirthID === Number(id))[0];

const add = async ({ MotherCowID, BirthDate }) => {

    // add it in cow
    cows.push({
        CowID: cows.length == 0 ? 1 : cows[cows.length - 1].CowID + 1,
        EntryDate: BirthDate || new Date().toISOString().slice(0, 10),
        BirthDate: BirthDate || new Date().toISOString().slice(0, 10),
        Breed: cows.filter(cow => cow.CowID === Number(MotherCowID))[0]["Breed"]
    });
    await fs.writeFile(cowpath, JSON.stringify(cows));

    //
    Births.push({
        BirthID: Births.length == 0 ? 1 : Births[Births.length - 1].BirthID + 1,
        MotherCowID,
        CowID: cows[cows.length - 1].CowID,
        BirthDate: BirthDate || new Date().toISOString().slice(0, 10),
    });
    await fs.writeFile(path, JSON.stringify(Births));
}

const remove = async (id) => {
    Births = Births.filter(Birth => Birth.BirthID !== Number(id));
    await fs.writeFile(path, JSON.stringify(Births));
}
//herej
const update = async ({ id, MotherCowID, BirthDate }) => {
    Births = Births.map(Birth => {
        if (Birth.BirthID === Number(id)) {
            Birth.MotherCowID = MotherCowID || Birth.MotherCowID;
            Birth.BirthDate = BirthDate || Birth.BirthDate;
        }
        return Birth;
    });
    await fs.writeFile(path, JSON.stringify(Births));
}

module.exports = { getAll, getById, add, remove, update };
