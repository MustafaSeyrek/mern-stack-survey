//Bu sayfa veritabanındaki surveys tablosu tanımıdır
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurveySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    questions: [{
        type: Object,
        contains: {
            answers: { type: Array },
            questionName: String
        }
    }],
    results: {type: Array, default: []},
    createdBy: {
        type: Schema.Types.ObjectID,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = Survey = mongoose.model('Surveys', SurveySchema)