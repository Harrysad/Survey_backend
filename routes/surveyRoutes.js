const express = require('express');
const router = express.Router();

const surveyController  = require('../controllers/surveyController');
// const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/create', /* protect, authorize('Administrator'), */surveyController.createSurvey);
router.get('/', /* protect, authorize('Administrator'), */surveyController.getSurveys);
router.get('/:id', /* protect, authorize('Administrator'), */surveyController.getSurvey);
router.put('/:id', /* protect, authorize('Administrator'), */surveyController.updateSurvey);
router.delete('/:id', /* protect, authorize('Administrator'), */surveyController.deleteSurvey);

module.exports = router;