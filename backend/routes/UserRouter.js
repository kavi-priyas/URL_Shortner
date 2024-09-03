const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken')
const KEY = "Thisisthekey"

const UserRouter = require('express').Router();

// Route for creating a new user account
UserRouter.post('/u/newuser', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const newUser = await UserService.createUser(username, password, email);
        res.status(201).json({ user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route for user login
UserRouter.post('/u/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserService.loginUser(email, password);
        const authToken = jwt.sign({email:email},KEY)
        res.json({user:user, authToken: authToken});
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// Route to fetch user
UserRouter.post('/u/fetch-user', async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await UserService.fetchUser(userId);
        res.json(user);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// Route for fetching links of a user with pagination
UserRouter.post('/u/links', async (req, res) => {
    try {
        const {userId} = req.body;
        
        // Get links with pagination
        const links = await UserService.getUserLinks(userId);
        res.json(links);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Export the UserRouter
module.exports = UserRouter;
