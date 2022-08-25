const express = require('express');
const AdminController = require("../controllers/AdminController");
const router = express.Router();

router.post('/auth', AdminController.authAdmin);
router.get('/', AdminController.reject);
router.get('/deleteAllTourneys', AdminController.deleteAllTourneys);
router.get('/deleteAllData', AdminController.deleteAllData);

module.exports = router;