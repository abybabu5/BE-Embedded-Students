const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = require("./projects");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    studentID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         throw new Error("Email is invalid!");
        //     }
        // }
    },
    date: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    projects: [{
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        repourl: {
            type: String,
            required: true
        },
        liveurl: {
            type: String,
            required: true
        }
    }]
}, {timestamps: true});
const studentList = mongoose.model("student", studentSchema);

module.exports = studentList;