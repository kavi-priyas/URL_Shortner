const UserModel = require('../models/UserModel');
const LinkModel = require('../models/LinkModel');
const bcrypt = require('bcrypt');

const generateShortUrl = async () => {
    // Define the character set for generating short URLs
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const shortUrlLength = 8; // The length of the short URL

    let shortUrl;
    let isUnique = false;

    // Loop until a unique short URL is found
    while (!isUnique) {
        // Generate a random short URL
        shortUrl = '';
        for (let i = 0; i < shortUrlLength; i++) {
            shortUrl += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        // Check if the short URL already exists in the LinkModel
        const existingLink = await LinkModel.findOne({ shortUrl });
        if (!existingLink) {
            isUnique = true; // The short URL is unique
        }
    }

    return shortUrl;
};

const LinkService = {

    // Create a new shortened link
    createLink: async (title, originalUrl, userId, password) => {
        try {
            // Generate a unique short URL
            const shortUrl = await generateShortUrl();

            // Hash the password if provided
            let hashedPassword = null;
            if (password) {
                const salt = await bcrypt.genSalt(10);
                hashedPassword = await bcrypt.hash(password, salt);
            }

            // Create a new link
            const newLink = new LinkModel({
                originalUrl,
                shortUrl,
                user: userId ? userId : null, // Add user only if it exists
                password: password? hashedPassword : null,
                title: title ? title : null,   // Add title only if it exists
            });
              

            // Save the link to the database
            await newLink.save();

            // Link the newly created link to the user document
            if(userId){
                await UserModel.findByIdAndUpdate(userId, {
                    $push: {
                        links: newLink._id
                    }
                });
            } 
            // Return the new link
            return newLink;
        } catch (error) {
            throw error;
        }
    },

    // Get a link by its short URL
    getLinkByShortUrl: async (shortUrl) => {
        try {
            // Find the link by short URL
            const link = await LinkModel.findOne({ shortUrl });
            return link;
        } catch (error) {
            throw error;
        }
    },

    // Increment the viewer count for a link
    incrementViewerCount: async (shortUrl) => {
        try {
            const link = await LinkModel.findOne({ shortUrl });
            link.viewerCount += 1;
            await link.save();
            return link
        } catch (error) {
            throw error;
        }
    },

    // Verify link password
    verifyLinkPassword: async (link, providedPassword) => {
        try {
            const reslink = await LinkModel.findById(link);
            // Compare the provided password with the stored hashed password
            const isMatch = await bcrypt.compare(providedPassword, reslink.password);
            return isMatch;
        } catch (error) {
            throw error;
        }
    },
};

module.exports = LinkService;
