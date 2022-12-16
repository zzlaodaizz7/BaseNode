const express = require('express');
const router = express.Router();

const { newExample, getExample } = require('../controllers/example');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
router.route('/example').post(newExample)
router.route('/example').get(isAuthenticatedUser, authorizeRoles('super', 'employeer', 'admin'), getExample);

module.exports = router;