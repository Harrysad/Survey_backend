const mongoose = require('mongoose');

const CellSchema = new mongoose.Schema({
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

const RowSchema = new mongoose.Schema({
    rowHeading: {
        type: String,
        required: true
    },
    cells: {
        type: [CellSchema],
        required: true
    }
});

const GridSchema = new mongoose.Schema({
    columnHeadings: {
        type: [String],
        required: true
    },
    rows: {
        type: [RowSchema],
        required: true
    }
});

const SurveySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    grid: {
        type: GridSchema,
        required: true
    }
});

module.exports = mongoose.model('Survey', SurveySchema);