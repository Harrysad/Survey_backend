const express = require('express')
const router = express.Router()
const { protect, authorize } = require('../middleware/authMiddleware')

// Testowy endpoint tylko dla administratorów
router.get('/admin-only', protect, authorize('Administrator'), (_req, res) => {
  res.send('Dostępne tylko dla administratorów')
})

// Testowy endpoint dla managerów i administratorów
router.get('/manager-access', protect, authorize('Administrator', 'Manager'), (_req, res) => {
  res.send('Dostępne dla administratorów i managerów')
})

// Testowy endpoint dla wszystkich zalogowanych użytkowników
router.get('/any-user', protect, (_req, res) => {
  res.send('Dostępne dla każdego zalogowanego użytkownika')
})

module.exports = router;