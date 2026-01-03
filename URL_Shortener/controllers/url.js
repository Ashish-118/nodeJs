const { nanoid } = require('nanoid');
const Url = require('../models/url');


async function createShortUrl(req, res) {
    const { originalUrl } = req.body;

    console.log(req.body);
    if (!originalUrl) {
        return res.status(400).json({ error: 'redirectUrl is required' });
    }
    const shortId = nanoid(8);
    const save = await Url.create({
        shortId: shortId,
        redirectUrl: originalUrl,
        visitHistory: []
    })
    res.render('home', {
        shortUrl: shortId
    });

    // return res.status(201).json({ shortId: shortId });
}

async function getUrl(req, res) {
    const shortId = req.params.shortId;
    const url = await Url.findOne({ shortId: shortId });
    if (!url) {
        return res.status(404).json({ error: 'URL not found' });
    }
    url.visitHistory.push({ timestamp: Date.now() });
    await url.save();


    res.redirect(url.redirectUrl);
}

module.exports = { createShortUrl, getUrl };