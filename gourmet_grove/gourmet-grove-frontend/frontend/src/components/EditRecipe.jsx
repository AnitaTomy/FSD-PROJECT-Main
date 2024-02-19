import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../Login.css';

const EditRecipe = () => {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({
    title: '',
    description: '',
    ingredients: '',
    steps: '',
    image: '',
    category: '',
    course: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/recipe/getRecipeById/${id}`);
        const data = await response.json();

        if (data.success) {
          setRecipeDetails(data.recipe);
        } else {
          console.error('Error fetching recipe details:', data.message);
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleUpdateRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/recipe/updateRecipe/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeDetails),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Recipe updated successfully:', data.message);
        window.alert('Recipe updated successfully');
          } else {
        console.error('Update failed:', data.message);
        window.alert('Update failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error during update:', error);
      window.alert('Error during update');
    }
  };

  return (
    <div className='login-page'>
      <header className="header">
        <div className="logo-container">
          <div className="logo">
            <img
              src="/img/166028664_padded_logo-removebg-preview.png"
              alt="Gourmet Grove"
              className="logo-img"
              style={{ height: '70px', width: '70px' }}
            />
          </div>
          <h3>Gourmet Grove</h3>
        </div>
      </header>

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
            <h2>Edit Recipe</h2>
            <form>
              {/* <label htmlFor="title">Title:</label> */}
              <h6 style={{color:"white"}}>Title</h6>
              <input
                type="text"
                id="title"
                name="title"
                value={recipeDetails.title}
                onChange={(e) => setRecipeDetails({ ...recipeDetails, title: e.target.value })}
                required
              />

              {/* Add other form fields with pre-filled values */}
              <h6 style={{color:"white"}}>Description</h6>
              <textarea
                id="description"
                name="description"
                value={recipeDetails.description}
                onChange={(e) => setRecipeDetails({ ...recipeDetails, description: e.target.value })}
                required
              />

              <h6 style={{color:"white"}}>Ingredients</h6>
              <textarea
                id="ingredients"
                name="ingredients"
                value={recipeDetails.ingredients}
                onChange={(e) => setRecipeDetails({ ...recipeDetails, ingredients: e.target.value })}
                required
              />

<h6 style={{color:"white"}}>Procedure</h6>
              <textarea
                id="steps"
                name="steps"
                value={recipeDetails.steps}
                onChange={(e) => setRecipeDetails({ ...recipeDetails, steps: e.target.value })}
                required
              />

<h6 style={{color:"white"}}>Category</h6>
              <select
                id="category"
                name="category"
                value={recipeDetails.category}
                onChange={(e) => setRecipeDetails({ ...recipeDetails, category: e.target.value })}
                required
              >
                <option value="Vegetarian">Vegetarian</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>

              <h6 style={{color:"white"}}>Course</h6>
              <select
                id="course"
                name="course"
                value={recipeDetails.course}
                onChange={(e) => setRecipeDetails({ ...recipeDetails, course: e.target.value })}
                required
              >
                <option value="Appetizer">Appetizer</option>
                <option value="Starter">Starter</option>
                <option value="Main Course">Main Course</option>
                <option value="Dessert">Dessert</option>
              </select>

              <br/>
              <button type="button" onClick={handleUpdateRecipe}>
                Update Recipe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
