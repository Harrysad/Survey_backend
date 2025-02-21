const express = require('express');
const router = express.Router();

const surveyController  = require('../controllers/surveyController');

router.post('/create', surveyController.createSurvey);
router.get('/', surveyController.getSurveys);
router.get('/:id', surveyController.getSurvey);
router.put('/:id', surveyController.updateSurvey);
router.delete('/:id', surveyController.deleteSurvey);

module.exports = router;