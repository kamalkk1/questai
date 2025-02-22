const express = require('express');
const router = express.Router();
const episodeController = require('../controllers/episodeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/',authMiddleware, episodeController.createEpisode);
router.get("/:episodeId", authMiddleware, episodeController.getEpisodeById);
router.delete('/:id',authMiddleware, episodeController.deleteEpisode);
router.put("/:episodeId", authMiddleware, episodeController.updateEpisode);
module.exports = router;