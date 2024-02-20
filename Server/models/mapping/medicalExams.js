const fs = require("fs/promises");


const path = require("path").join(__dirname, '..', 'data', 'medicalExams.json');
let Exams = require("../data/medicalExams.json");


const getAll = () => Exams;

const getById = (id) => Exams.filter(Exam => Exam.ExamID === Number(id))[0];

const add = async ({ Disease, CowID, ExamDate, Result }) => {
    Exams.push({
        ExamID: Exams.length == 0 ? 1 : Exams[Exams.length - 1].ExamID + 1,
        Disease,
        CowID,
        ExamDate: ExamDate || new Date().toISOString().slice(0, 10),
        Result
    });
    await fs.writeFile(path, JSON.stringify(Exams));
}

const remove = async (id) => {
    Exams = Exams.filter(Exam => Exam.ExamID !== Number(id));
    await fs.writeFile(path, JSON.stringify(Exams));
}

const update = async ({ id, Disease, CowID, ExamDate, Result }) => {
    Exams = Exams.map(Exam => {
        if (Exam.ExamID === Number(id)) {
            Exam.Disease = Disease || Exam.Disease;
            Exam.CowID = CowID || Exam.CowID;
            Exam.ExamDate = ExamDate || new Date().toISOString().slice(0, 10);
            Exam.Result = Result || Exam.Result;
        }
        return Exam;
    });
    await fs.writeFile(path, JSON.stringify(Exams));
}

module.exports = { getAll, getById, add, remove, update };
