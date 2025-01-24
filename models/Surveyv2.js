// models/surveyModel.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const surveySchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    grid: {
      rows: { type: Number, required: true },
      columns: { type: Number, required: true },
      cells: [
        {
          row: { type: Number, required: true },
          column: { type: Number, required: true },
          type: { type: String, enum: ['text', 'checkbox', 'image'], required: true },
          value: { type: String } 
        }
      ]
    },
    status: {
      type: String,
      enum: ['Nowy', 'W trakcie', 'Do poprawy', 'Zakończony'],
      default: 'Nowy'
    }
  },
  {
    timestamps: true
  }
);


const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;