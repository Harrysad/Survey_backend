const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

/* Trasy do tworzenia użytkowników i logowania*/
router.post('/register', protect, authorize('Administrator'), registerUser);
router.post('/login', loginUser);


// /*Trasy do zarządzania ankietami*/
// router.get('/create', protect, authorize('Manager'), createSurvey);
// router.put('/update/:id', protect, authorize('Manager'), updateSurvey);
// router.get('/', protect, authorize('Manager', 'Surveyor'), updateSurvey)

module.exports = router;