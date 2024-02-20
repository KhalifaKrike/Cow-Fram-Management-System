const fs = require("fs/promises");


const path = require("path").join(__dirname, '..', 'data', 'cows.json');
let cows = require("../data/cows.json");


const getAll = () => cows;

const getById = (id) => cows.filter(cow => cow.CowID === Number(id))[0];

const add = async ({ BirthDate, EntryDate, Breed }) => {
    cows.push({
        CowID: cows.length == 0 ? 1 : cows[cows.length - 1].CowID + 1,
        EntryDate: EntryDate || new Date().toISOString().slice(0, 10),
        BirthDate: BirthDate || null,
        Breed
    });
    await fs.writeFile(path, JSON.stringify(cows));
}

const remove = async (id) => {
    cows = cows.filter(cow => cow.CowID !== Number(id));
    await fs.writeFile(path, JSON.stringify(cows));
}

const update = async ({ id, EntryDate, Breed, BirthDate }) => {
    cows = cows.map(cow => {
        if (cow.CowID === Number(id)) {
            cow.Breed = Breed || cow.Breed;
            cow.EntryDate = EntryDate || cow.EntryDate;
            cow.BirthDate = BirthDate || cow.BirthDate;
        }
        return cow;
    });
    await fs.writeFile(path, JSON.stringify(cows));
}

module.exports = { getAll, getById, add, remove, update };
