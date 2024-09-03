const LinkService = require('../services/LinkService');

const LinkRouter = require('express').Router();

// Creating a new shortened link
LinkRouter.post('/l/newlink', async (req, res) => {
    try {
        const { title, originalUrl, userId, password } = req.body;
        const newLink = await LinkService.createLink(title, originalUrl, userId, password);
        res.status(201).json(newLink);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Retreiving actual url
LinkRouter.post('/l/getlink', async (req, res) => {
    try {
        // Extract the short URL from the URL parameters
        const {shortUrl} = req.body;

        // Retrieve the link by its short URL
        const link = await LinkService.getLinkByShortUrl(shortUrl);
        
        if (!link) {
            return res.status(404).json({ error: 'Link not found' });
        }

        // Return the original URL
        res.json(link);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

LinkRouter.post('/l/verify-password', async (req, res) => {
    try {
        // Extract the short URL from the URL parameters
        const {link, password} = req.body;

        // Retrieve the link by its short URL
        const result = await LinkService.verifyLinkPassword(link, password);

        // Return the original URL
        res.json({isMatch:result});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Incrementing viewer count
LinkRouter.post('/l/increment-viewer-count', async (req, res) => {
    try {
        // Extract the short URL from the URL parameters
        const {shortUrl}= req.body;

        // Increment the viewer count for the link
        const updatedLink = await LinkService.incrementViewerCount(shortUrl);

        // Check if the link was found and updated
        if (!updatedLink) {
            return res.status(404).json({ error: 'Link not found' });
        }

        // Return success message
        res.status(201).json(updatedLink);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Export the LinkRouter
module.exports = LinkRouter;
