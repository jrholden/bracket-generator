const express = require('express');
const router = express.Router();

// Require controller modules.
const TournamentController = require('../controllers/TournamentController');
// GET catalog home page.

router.post('/save', TournamentController.saveTournament);

router.get('/delete/:id', TournamentController.deleteTournament);
router.get('/get', TournamentController.getTournaments);
router.get('/get/:id', TournamentController.getOneTournament);

module.exports = router;