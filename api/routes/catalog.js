const express = require('express');
const router = express.Router();

// Require controller modules.
const TestController = require('../controllers/testController');
// GET catalog home page.

router.get('/', TestController.test_function);

module.exports = router;