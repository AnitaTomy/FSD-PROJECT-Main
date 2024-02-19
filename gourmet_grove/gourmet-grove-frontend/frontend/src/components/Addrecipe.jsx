// AddRecipe.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Login.css'; // Import the shared CSS file

const AddRecipe = () => {
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get('userId');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [image, setImage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  const navigate = useNavigate();

  const handleAddRecipe = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/recipe/addRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          title,
          description,
          ingredients,
          steps,
          image,
          category: selectedCategory, // Corrected here
          course: selectedCourse,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Failed to add recipe:', errorMessage);
        window.alert('Failed to add recipe: ' + errorMessage);
        return;
      }

      const data = await response.json();
      console.log('Recipe added successfully:', data.message);
      window.alert('Recipe added successfully!');
      
      navigate(`/userdash/${userId}`);
    } catch (error) {
      console.error('Error during adding recipe:', error);
      window.alert('Error during adding recipe: ' + error.message);
    }
  };

  return (
    <div className='login-page'>
      <div
        className='login-container'
        style={{
          backgroundImage: `url('/img/pexels-elevate-1267320.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          color: '#fff',
        }}
      >
        <div className='login-wrapper'>
          <div className="login-form">
            <h2>Add Recipe</h2>
            <form>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' required /><br />
              <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' required /><br />
              <input type="text" id="ingredients" value={ingredients.join(',')} onChange={(e) => setIngredients(e.target.value.split(','))} placeholder='Ingredients (comma-separated)' required /><br />
              <input type="text" id="steps" value={steps.join(',')} onChange={(e) => setSteps(e.target.value.split(','))} placeholder='Steps (comma-separated)' required /><br />
              <input type="text" id="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder='Image URL' /><br />

              <div className="select-group">
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    style={{ width: '100%', padding: '8px' }}
  >
    <option value="" disabled selected>Select Category</option>
    <option value="Vegetarian">Vegetarian</option>
    <option value="Non-Vegetarian">Non-Vegetarian</option>
  </select>
</div><br />

<div className="select-group">
  <select
    value={selectedCourse}
    onChange={(e) => setSelectedCourse(e.target.value)}
    style={{ width: '100%', padding: '8px' }}
  >
    <option value="" disabled selected>Select Course</option>
    <option value="Appetizer">Appetizer</option>
    <option value="Starter">Starter</option>
    <option value="Main Course">Main Course</option>
    <option value="Dessert">Dessert</option>
  </select>
</div><br />
              <button type="button" onClick={handleAddRecipe}>
                Add Recipe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;