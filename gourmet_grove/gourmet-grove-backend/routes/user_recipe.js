const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// API for retrieving recipes uploaded by a particular user
router.get('/userRecipes/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Search for recipes uploaded by the specified user
        const recipes = await Recipe.find({ userId });

        if (recipes.length === 0) {
            return res.status(404).json({ success: false, message: 'No recipes found for the specified user.' });
        }

        res.json({ success: true, recipes });
    } catch (error) {
        console.error('Error during user recipe retrieval:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});
module.exports = router;