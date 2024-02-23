import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const ViewRecipe = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [authorName, setAuthorName] = useState('');
  

  const handleAuthorNameChange = (event) => {
    setAuthorName(event.target.value);
  };

  useEffect(() => {
    // Fetch recipe details based on recipeId
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/recipe/getRecipeById/${recipeId}`);
        const data = await response.json();

        if (data.success) {
          setRecipe(data.recipe);
        } else {
          console.error('Error fetching recipe details:', data.message);
          // Handle the case where recipe details are not available
          setRecipe(null);
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        // Handle the case where an error occurred during fetching
        setRecipe(null);
      }
    };

    // Call the fetchRecipeDetails function
    fetchRecipeDetails();
  }, [recipeId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetch reviews specific to the current recipe
        const response = await fetch(`http://localhost:3000/api/review/getReviewsByRecipeId/${recipeId}`);
        const data = await response.json();

        if (data.success) {
          setReviews(data.reviews);
        } else {
          console.error('Error fetching reviews:', data.message);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [recipeId]);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleRatingHover = (hoveredRating) => {
    setHoverRating(hoveredRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  

  
    // Check if either rating or comment is provided
    if (rating === 0 && comment.trim() === '') {
      // If neither is provided, show an alert and prevent submission
      alert('Please provide a rating or a comment.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/api/review/addReview/${recipeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          comment,
          author: authorName, // Include the authorName in the request payload
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log('Review added successfully:', data.review);
        // Optionally, you can update the state or perform any other action after successful submission
  
        // Show a thank you alert
        alert('Thank you for your review!');
        window.location.reload();
      } else {
        console.error('Error adding review:', data.message);
        // Handle the error case
      }
    } catch (error) {
      console.error('Error adding review:', error);
      // Handle the error case
    }
  };
  

  // Function to calculate average rating for a specific recipe
  const calculateRecipeAverageRating = () => {
    const recipeReviews = reviews.filter((review) => review.recipeId === recipeId);
    if (recipeReviews.length === 0) return 0;

    const totalRating = recipeReviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / recipeReviews.length;
  };

  // Function to render stars based on the average rating
  const renderStars = (averageRating) => {
    const maxStars = 5;
    const fullStars = Math.floor(averageRating);
    const remainder = averageRating % 1;
    const outlinedStars = maxStars - fullStars - (remainder > 0 ? 1 : 0);

    const stars = [];

    // Filled stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">&#9733;</span>);
    }

    // Half-filled star
    if (remainder > 0) {
      stars.push(<span key="half" className="star half">&#9733;</span>);
    }

    // Outlined stars
    for (let i = 0; i < outlinedStars; i++) {
      stars.push(<span key={i + fullStars + (remainder > 0 ? 1 : 0)} className="star outlined">&#9734;</span>);
    }

    return stars;
  };

  if (recipe === null) {
    // Handle the case where the recipe is still loading or not available
    return <p>Loading recipe details...</p>;
  }

  if (!recipe || !recipe.title || !recipe.image || !recipe.description || !recipe.ingredients || !recipe.steps) {
    return <p>Recipe details are incomplete or not found.</p>;
  }

  return (
    <div className='centered-container'>
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
          <h3 style={{ color: "white" }}>Gourmet Grove</h3>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link style={{ textDecoration: "none", color: "white" }} to={'/'}>
                Home
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none", color: "white" }} to={'/about'}>
                About
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none", color: "white" }} to={'/login'}>
                Login
              </Link>
            </li>
            <li>
              <Link style={{ textDecoration: "none", color: "white" }} to={'/signup'}>
                Signup
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="recipe-container" style={{ backgroundColor: 'white' }}>
        <div className="recipe-details">
          <h2 className="recipe-title" style={{ color: "black", display: 'flex', alignItems: 'center', marginTop: '20px' }}>
            {recipe.title}
            <div className="rating-stars" style={{ marginLeft: '10px' }}>
              {renderStars(calculateRecipeAverageRating())}
            </div>
          </h2>
          <h4 style={{ color: "black" }}>{recipe.description}</h4>
          {/* <div className="recipe-image-container">
          <img
            src={recipe.image}
            className="recipe-image"
            alt={recipe.title}
            marginLeft={"500px"}
          />
        </div> */}


          <div className="description-ingredients-steps" style={{ display: 'flex', marginLeft: '20px' }}>
  <div className="ingredients-box" style={{ flex: 1, marginRight: '20px' }}>
    <h3 style={{ color: "black" }}>Ingredients:</h3><br />
    {recipe.ingredients.map((ingredient, index) => (
      <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <input type="checkbox" style={{ marginRight: '5px' }} />
        <span>{ingredient.trim()}</span>
      </div>
    ))}
  </div>

  <div className="steps-box" style={{ flex: 1 }}>
    <h3 style={{ color: "black" }}>Steps:</h3><br />
    {recipe.steps.map((step, index) => (
      <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        <input type="checkbox" style={{ marginRight: '5px' }} />
        <span>{step.trim()}</span>
      </div>
    ))}
  </div>
          </div>

      


      <div className="reviews-box" style={{ marginTop: '20px' }}>
  <h3>Reviews:</h3>
  {reviews.map((review) => (
    <div key={review._id} className="review-item">
      <div className="review-header">
        <h6 className="review-author">Author: {review.author}</h6>
      </div>
      <div className="review-rating">
        <span className="rating-stars">
          {renderStars(review.rating)}
        </span>
      </div>
      <div className="review-comment">
        <h6>Comment:</h6>
        <h6>{review.comment}</h6>
      </div>
    </div>
  ))}
</div>
<div className="rating-comment-box" style={{ marginTop: '20px',marginLeft:'500px' }}>
        <h3>Rate and Comment:</h3>
        <br />
        <h6>My team and I love hearing from you! Submit your recipe review here.</h6>
        <br />
        <form onSubmit={handleFormSubmit}>
        <label>
      Your Name:
      <input type="text" value={authorName} onChange={handleAuthorNameChange} required />
    </label>
    <br />
          <div className="rating-stars">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;

              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => handleRatingClick(ratingValue)}
                    onMouseEnter={() => handleRatingHover(ratingValue)}
                    onMouseLeave={() => handleRatingHover(0)}
                  />
                  <FaStar
                    className="star"
                    color={ratingValue <= (hoverRating || rating) ? '#ffc107' : '#e4e5e9'}
                    size={25}
                  />
                </label>
              );
            })}
          </div>
          <br />
          <label>
            Comment:
            <textarea value={comment} onChange={handleCommentChange}></textarea>
          </label>
          <br />
          
          <button type="submit">Submit</button>
        </form>
      </div>


        </div>

        
      </div>
    </div>
  );
};

export default ViewRecipe;
