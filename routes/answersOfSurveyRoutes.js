const express = require('express');
const router = express.Router();

const answersOfSurveyController = require('../controllers/answersOfSurveyController');

router.post('/create', answersOfSurveyController.createAnswer);
router.get('/:surveyId', answersOfSurveyController.getAnswersBySurveyId);
router.put('/:id', answersOfSurveyController.updateAnswer);
router.delete('/:id', answersOfSurveyController.deleteAnswer);

module.exports = router;