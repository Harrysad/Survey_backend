const mongoose = require('mongoose');

const AnswerCellSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['checkbox', 'text', 'textarea'],
        required: true
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
});

const AnswerRowSchema = new mongoose.Schema({
    cells: {
        type: [AnswerCellSchema],
        required: true
    }
});

const AnswerGridSchema = new mongoose.Schema({
    rows: {
        type: [AnswerRowSchema],
        required: true
    }
});

const AnswersOfSurveySchema = new mongoose.Schema({
    surveyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Survey',
        required: true
    },
    grid: {
        type: AnswerGridSchema,
        required: true
    },
    editable: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('AnswersOfSurvey', AnswersOfSurveySchema);
