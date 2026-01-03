const express = require('express');
const { createShortUrl, getUrl } = require('../controllers/url');
const router = express.Router();

router.post('/', createShortUrl);
router.get('/:shortId', getUrl);

module.exports = router;
