const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    studentID: {type: Schema.Types.ObjectId, ref: 'Student'},
    repourl: {
        type: String,
        required: true
    },
    liveurl: {
        type: String,
        required: true
    }
}, {timestamps: true});

const projectList = mongoose.model("project", projectSchema);

module.exports = projectList;