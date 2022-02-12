const express = require('express');
const router = express.Router();

const consumerController  = require('../controllers/consumerController');

router.get('/', consumerController.fetch_consumers);
router.get('/:id', consumerController.fetch_consumer);
router.post('/', consumerController.post_consumer);
router.patch('/:id', consumerController.disable_consumer);

module.exports = router;