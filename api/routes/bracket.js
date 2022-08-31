const express = require('express');
const BracketController = require("../controllers/BracketController");
const router = express.Router();

router.get('/get', BracketController.getBrackets);
router.post('/create', BracketController.createBracket);
module.exports = router;