const AnswersOfSurvey = require('../models/AnswersOfSurvey');
const Survey = require('../models/Survey');

module.exports = {
    createAnswer: async (req, res) => {
        try {
            const { surveyId, grid, editable } = req.body;

            const surveyExists = await Survey.findById(surveyId);
            if (!surveyExists) {
                return res.status(404).json({ message: 'Powiązana ankieta nie istnieje' });
            }

            const newAnswer = new AnswersOfSurvey({
                surveyId,
                grid,
                editable
            });

            await newAnswer
            .save()
            .then(() => {
                return Survey.updateOne(
                    { _id: surveyId },
                    { $push: { answers: newAnswer._id } }
                );
            });
            // console.log(newAnswer);
            res.status(201).json(newAnswer);
        } catch (error) {
            res.status(500).json({ message: 'Błąd podczas tworzenia odpowiedzi', error: error.message });
        }
    },
    getAnswersBySurveyId: async (req, res) => {
        try {
            const { surveyId } = req.params;
    
            const answers = await AnswersOfSurvey.find({ surveyId }).populate('surveyId');
            if (!answers.length) {
                return res.status(404).json({ message: 'Brak odpowiedzi dla tej ankiety' });
            }
    
            res.status(200).json(answers);
        } catch (error) {
            res.status(500).json({ message: 'Błąd podczas pobierania odpowiedzi', error: error.message });
        }
    },
    updateAnswer: async (req, res) => {
        try {
            const { id } = req.params;
            const { grid, editable } = req.body;
    
            const updatedAnswer = await AnswersOfSurvey.findByIdAndUpdate(
                id,
                { grid, editable },
                { new: true, runValidators: true }
            );
    
            if (!updatedAnswer) {
                return res.status(404).json({ message: 'Odpowiedź nie została znaleziona' });
            }
    
            res.status(200).json(updatedAnswer);
        } catch (error) {
            res.status(500).json({ message: 'Błąd podczas aktualizacji odpowiedzi', error: error.message });
        }
    },
    deleteAnswer: async (req, res) => {
        try {
            const { id } = req.params;
    
            const deletedAnswer = await AnswersOfSurvey.findByIdAndDelete(id)
            .then((answer) => {
                return Survey.updateOne(
                    { _id: answer.surveyId },
                    { $pull: { answers: answer._id } }
                );
            });
    
            if (!deletedAnswer) {
                return res.status(404).json({ message: 'Odpowiedź nie została znaleziona' });
            }
    
            res.status(200).json({ message: 'Odpowiedź została usunięta' });
        } catch (error) {
            res.status(500).json({ message: 'Błąd podczas usuwania odpowiedzi', error: error.message });
        }
    }
};