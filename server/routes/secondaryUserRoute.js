const express = require('express');
const router = express.Router();

const secondaryUserController  = require('../controllers/secondaryUserController');

router.get('/', secondaryUserController.fetch_secondaryUsers);
router.get('/:id', secondaryUserController.fetch_secondaryUser);
router.post('/', secondaryUserController.post_secondaryUser);
router.patch('/:id', secondaryUserController.disable_secondaryUser);

module.exports = router;