//Bıu sayfa veritababnındaki results tablosu tanımıdır
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
    surveyId: {
        type: Schema.Types.ObjectID,
        required: true
    },
    answers: {
        type: Array,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectID,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = Results = mongoose.model("Results", ResultSchema);