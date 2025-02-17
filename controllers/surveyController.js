const Survey = require('../models/Survey')

module.exports = {
  createSurvey: (req, res, next) => {
    const { title, description, questions } = req.body

    // console.log('User ID: ', req.user.userId)

    const processedQuestions = questions.map((question) => {
      if (question.questionType === 'table') {
        const { rows, columns } = question.table

        if (columns.length === 2) {
          question.table.columns = []
        }

        if (!rows || rows.length === 0) {
          throw new Error('Tabela musi zawierać przynajmniej jeden wiersz.')
        }

        const formattedRows = rows.map((row) => ({
          rowHeading: row.rowHeading || '',
          cells: row.cells.map((cell) => {
            if (!['checkbox', 'text', 'textarea'].includes(cell.type)) {
              throw new Error(`Nieprawidłowy typ komórki: ${cell.type}`)
            }
            return {
              type: cell.type,
              value: cell.value,
            }
          }),
        }))

        question.table = {
          columnHeadings: columns,
          rows: formattedRows,
        }
      }
      return question
    })

    const survey = new Survey({
      title,
      description,
      questions: processedQuestions,
      // createdBy: req.user.userId,
    })

    survey
      .save()
      .then((savedSurvey) => {
        res.status(201).json({
          message: 'Ankieta została utworzona!',
          survey: savedSurvey,
        })
      })
      .catch((error) => {
        next(error)
      })
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
