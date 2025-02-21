const Survey = require('../models/Survey')

module.exports = {
  createSurvey: (req, res, next) => {
    const { title, description, grid } = req.body;

    const newSurvey = new Survey({
        title,
        description,
        grid,
    });

    newSurvey
      .save()
      .then((savedSurvey) => {
        res.status(201).json({
          message: "Ankieta została utworzona!",
          survey: savedSurvey,
        });
      })
      .catch((error) => {
        next(error);
      });
  },
  getSurveys: (req, res, next) => {
    Survey.find()
      .then((surveys) => {
        res.status(200).json({
          surveys,
        })
      })
      .catch((error) => {
        next(error)
      })
  },
  getSurvey: (req, res, next) => {
    Survey.findById(req.params.id)
      .then((survey) => {
        if (!survey) {
          return res.status(404).json({
            message: 'Ankieta nie została znaleziona.',
          })
        }
        res.status(200).json({
          survey,
        })
      })
      .catch((error) => {
        next(error)
      })
  },
  updateSurvey: (req, res, next) => {
    Survey.findByIdAndUpdate(req.params.id, req.body)
      .then((survey) => {
        if (!survey) {
          return res.status(404).json({
            message: 'Ankieta nie została znaleziona.',
          })
        }
        res.status(200).json({
          message: 'Ankieta została zaktualizowana!',
        })
      })
      .catch((error) => {
        next(error)
      })
  },
  deleteSurvey: (req, res, next) => {
    Survey.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({
          message: 'Ankieta została usunięta!',
        })
      })
      .catch((error) => {
        next(error)
      })
  },
}
