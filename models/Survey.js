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


module.exports = mongoose.model('Grid', GridSchema);