const express = require('express');
const AdminController = require("../controllers/AdminController");
const router = express.Router();

router.post('/auth', AdminController.authAdmin);
router.get('/', AdminController.reject);

module.exports = router;