const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const Classroom = mongoose.model('Classroom', ClassroomSchema);

module.exports = Classroom;
