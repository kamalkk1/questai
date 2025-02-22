const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

// Add auth middleware to protect routes
router.get('/',authMiddleware,  projectController.getProjects); 
router.post('/',authMiddleware, projectController.createProject);
router.get('/:id',authMiddleware, projectController.getProjectById);

module.exports = router;