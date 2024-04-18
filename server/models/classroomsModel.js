const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClassroomSchema = new Schema({
    name: { 
        type: String,
        required: true 
    }
},{ timestamps: true });

module.exports = mongoose.model('Classroom', ClassroomSchema);