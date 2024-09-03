const UserModel = require('../models/UserModel');
const LinkModel = require('../models/LinkModel');
const bcrypt = require('bcrypt');

const UserService = {
    // Create a new user account
    createUser: async (username, password, email) => {
        try {
            // Check if username or email already exists
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                throw new Error('Username or email already exists');
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create a new user
            const newUser = new UserModel({
                username,
                password: hashedPassword,
                email,
            });

            // Save the user
            await newUser.save();
            return newUser;
        } catch (error) {
            throw error;
        }
    },

    // User login
    loginUser: async (email, password) => {
        try {
            // Find the user
            const user = await UserModel.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }

            // Compare the provided password with the stored hashed password
            const isMatch = await bcrypt.compare(password,user.password);
            
            if (!isMatch) {
                throw new Error('Invalid password');
            }

            return user;
        } catch (error) {
            throw error;
        }
    },

    getUserLinks: async (userId) => {
        try {

            const user = await UserModel.findById(userId)
            
            const linkPromises = user.links.map(async (l) => {
                return await LinkModel.findById(l);
            });
              
            const userLinks = await Promise.all(linkPromises);
            // Fetch the links for the user with pagination
            // const userLinks = await LinkModel.find({ user :userId })

            // Return the links and the flag indicating whether there are more links to load
            return userLinks
        } catch (error) {
            throw error;
        }
    },

    fetchUser:async (userId) => {
        try {

            const user = await UserModel.findById(userId)
            return user
        } catch (error) {
            throw error;
        }
    }
};

module.exports = UserService;
