const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

// API to add a new recipe
router.post('/addRecipe', async (req, res) => {
    try {
        const { userId, title, description, ingredients, steps, image, category, course } = req.body;
        const newRecipe = new Recipe({ userId, title, description, ingredients, steps, image, category, course });
        await newRecipe.save();
        res.status(201).json({ success: true, message: 'Recipe added successfully', recipe: newRecipe });
    } catch (error) {
        console.error('Error during recipe creation:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


// API to update a recipe
router.put('/updateRecipe/:id', async (req, res) => {
    try {
        const {title, description, ingredients, steps, image, category, course } = req.body;
        const existingRecipe = await Recipe.findById(req.params.id);

        // Check if the recipe exists
        if (!existingRecipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }

        // Update the recipe details
        existingRecipe.title = title || existingRecipe.title;
        existingRecipe.description = description || existingRecipe.description;
        existingRecipe.ingredients = ingredients || existingRecipe.ingredients;
        existingRecipe.steps = steps || existingRecipe.steps;
        existingRecipe.image = image || existingRecipe.image;
        existingRecipe.category = category || existingRecipe.category;
        existingRecipe.course = course || existingRecipe.course;

        await existingRecipe.save();

        res.json({ success: true, message: 'Recipe updated successfully', recipe: existingRecipe });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'error' });
    }
});

// API to delete a recipe
router.delete('/deleteRecipe/:id', async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!deletedRecipe) {
      return res.status(404).json({ success: false, message: 'Recipe not found' });
    }

    res.json({ success: true, message: 'Recipe deleted successfully', recipe: deletedRecipe });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// API to view all the available recipe
router.get('/getAllRecipes', async (req, res) => {
    try {
        // Fetch all recipes from the database
        const recipes = await Recipe.find();
        
        res.status(200).json({ success: true, recipes });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Error fetching recipes' });
    }
});

// API for viewing latest recipies
router.get('/getLatestRecipes', async (req, res) => {
    try {
      const latestRecipes = await Recipe.find().sort({ createdAt: -1 }).limit(8);
      return res.json({ success: true, recipes: latestRecipes });
    } catch (error) {
      console.error('Error fetching latest recipes:', error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });

//    API to view recipe details based on recipe id
  router.get('/getRecipeById/:id', async (req, res) => {
    try {
      const recipeId = req.params.id;
      const recipe = await Recipe.findById(recipeId);
  
      if (recipe) {
        res.json({ success: true, recipe });
      } else {
        res.status(404).json({ success: false, message: 'Recipe not found' });
      }
    } catch (error) {
      console.error('Error fetching recipe by ID:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

// Export the router
module.exports = router;


