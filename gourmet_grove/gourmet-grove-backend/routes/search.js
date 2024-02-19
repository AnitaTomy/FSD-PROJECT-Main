const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// API for course wise search
router.post('/search', async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const {course } = req.body;
        if (!course) {
            return res.status(400).json({ success: false, message: 'Please provide course.' });
        }
        const query = {}
        if (course) {
            query.course = { $regex: course, $options: "i" };
        }
        const recipes = await Recipe.find({course});
        if (recipes.length === 0) {
            return res.status(404).json({ success: false, message: 'No recipes found for the provided category and course.' });
        }
        res.json({ success: true, recipes });
    } catch (error) {
        console.error('Error during recipe search:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// API for category wise search
router.post('/catsearch', async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const {category } = req.body;
        if (!category) {
            return res.status(400).json({ success: false, message: 'Please provide category.' });
        }
        const query = {}
        if (category) {
            query.category = { $regex: category, $options: "i" };
        }
        const recipes = await Recipe.find({category});
        if (recipes.length === 0) {
            return res.status(404).json({ success: false, message: 'No recipes found for the provided category.' });
        }
        res.json({ success: true, recipes });
    } catch (error) {
        console.error('Error during recipe search:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
