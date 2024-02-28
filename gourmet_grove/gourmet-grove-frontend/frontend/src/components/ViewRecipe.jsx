import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import {
  Typography,
  Box,
  Button,
  TextField,
  Rating,
  Avatar,
  Divider,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';

// CSS Styles
const StyledHeader = styled('header')({
  background: 'darkred',
  color: 'white',
  padding: '10px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const StyledLogoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

const StyledLogo = styled('div')({
  marginRight: '10px',
});

const StyledNav = styled('nav')({
  ul: {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    li: {
      marginLeft: '20px',
      a: {
        textDecoration: 'none',
        color: 'white',
        hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
});

const StyledRecipeContainer = styled('div')({
  backgroundColor: 'white',
  maxWidth: '800px',
  margin: '20px auto',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
});

const StyledRecipeDetails = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledRecipeTitle = styled('h2')({
  color: 'black',
  display: 'flex',
  alignItems: 'center',
  marginTop: '20px',
});

const StyledRatingStars = styled('div')({
  marginLeft: '10px',
});

const StyledDescriptionIngredientsSteps = styled('div')({
  display: 'flex',
  marginLeft: '20px',
});

const StyledIngredientsBox = styled('div')({
  flex: 1,
  marginRight: '20px',
});

const StyledStepsBox = styled('div')({
  flex: 1,
});

const StyledReviewsContainer = styled('div')({
  marginTop: '20px',
});

const StyledReviewCard = styled(Paper)({
  padding: '20px',
  marginBottom: '20px',
});

const StyledReviewAuthor = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '10px',
});

const StyledReviewAvatar = styled(Avatar)({
  marginRight: '10px',
});

const StyledReviewContent = styled('div')({
  marginLeft: '60px',
});

const StyledRating = styled(Rating)({
  marginBottom: '10px',
});

const StyledReviewComment = styled('div')({
  marginBottom: '10px',
});

const StyledRatingCommentContainer = styled('div')({
  marginTop: '20px',
});

const StyledCommentPaper = styled(Paper)({
  padding: '20px',
});

const StyledCommentForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledRatingStarsInput = styled('div')({
  display: 'flex',
  marginBottom: '15px',
  justifyContent: 'center',
  label: {
    cursor: 'pointer',
    marginRight: '5px',
    input: {
      display: 'none',
      '&:checked + .star': {
        color: '#ffc107',
      },
    },
  },
  '.star': {
    fontSize: '25px',
    color: '#e4e5e9',
  },
});

const StyledCommentTextArea = styled('textarea')({
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  marginBottom: '15px',
});

const StyledSubmitButton = styled('button')({
  padding: '10px 20px',
  background: '#333',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  '&:hover': {
    background: '#555',
  },
});

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
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/recipe/getRecipeById/${recipeId}`);
        const data = await response.json();

        if (data.success) {
          setRecipe(data.recipe);
        } else {
          console.error('Error fetching recipe details:', data.message);
          setRecipe(null);
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        setRecipe(null);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
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

    if (rating === 0 && comment.trim() === '') {
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
          author: authorName,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Thank you for your review!');
        window.location.reload();
      } else {
        console.error('Error adding review:', data.message);
      }
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const calculateRecipeAverageRating = () => {
    const recipeReviews = reviews.filter((review) => review.recipeId === recipeId);
    if (recipeReviews.length === 0) return 0;

    const totalRating = recipeReviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / recipeReviews.length;
  };

  const renderStars = (averageRating) => {
    const maxStars = 5;
    const fullStars = Math.floor(averageRating);
    const remainder = averageRating % 1;
    const outlinedStars = maxStars - fullStars - (remainder > 0 ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">&#9733;</span>);
    }

    if (remainder > 0) {
      stars.push(<span key="half" className="star half">&#9733;</span>);
    }

    for (let i = 0; i < outlinedStars; i++) {
      stars.push(<span key={i + fullStars + (remainder > 0 ? 1 : 0)} className="star outlined">&#9734;</span>);
    }

    return stars;
  };

  if (recipe === null) {
    return <p>Loading recipe details...</p>;
  }

  if (!recipe || !recipe.title || !recipe.image || !recipe.description || !recipe.ingredients || !recipe.steps) {
    return <p>Recipe details are incomplete or not found.</p>;
  }

  return (
    <Box>
      <StyledHeader>
        <StyledLogoContainer>
          <StyledLogo>
            <img
              src="/img/166028664_padded_logo-removebg-preview.png"
              alt="Gourmet Grove"
              style={{ height: '70px', width: '70px' }}
            />
          </StyledLogo>
          <Typography variant="h5">Gourmet Grove</Typography>
        </StyledLogoContainer>
        <StyledNav>
          <ul>
            <li>
              <Link to={'/'}>Home</Link>
            </li>
            <li>
              <Link to={'/about'}>About</Link>
            </li>
            <li>
              <Link to={'/login'}>Login</Link>
            </li>
            <li>
              <Link to={'/signup'}>Signup</Link>
            </li>
          </ul>
        </StyledNav>
      </StyledHeader>

      <StyledRecipeContainer>
        <StyledRecipeDetails>
          <StyledRecipeTitle>
            {recipe.title}
            <StyledRatingStars>{renderStars(calculateRecipeAverageRating())}</StyledRatingStars>
          </StyledRecipeTitle>

          <img
            src={recipe.image}
            alt={recipe.title}
            style={{ width: '100%', borderRadius: '10px', marginBottom: '20px' }}
          />

          <Typography variant="h6" color="black">
            {recipe.description}
          </Typography>

          <StyledDescriptionIngredientsSteps>
            <StyledIngredientsBox>
              <Typography variant="h6" color="black">
                Ingredients:
              </Typography>
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <input type="checkbox" style={{ marginRight: '5px' }} />
                  <span>{ingredient.trim()}</span>
                </div>
              ))}
            </StyledIngredientsBox>

            <StyledStepsBox>
              <Typography variant="h6" color="black">
                Steps:
              </Typography>
              {recipe.steps.map((step, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <input type="checkbox" style={{ marginRight: '5px' }} />
                  <span>{step.trim()}</span>
                </div>
              ))}
            </StyledStepsBox>
          </StyledDescriptionIngredientsSteps>

          <StyledReviewsContainer>
            <Typography variant="h6">Reviews:</Typography>
            {reviews.map((review) => (
              <StyledReviewCard key={review._id}>
                <StyledReviewAuthor>
                  <StyledReviewAvatar alt={review.author} src="/img/default-avatar.jpg" />
                  <StyledReviewContent>
                    <Typography variant="subtitle1">Author: {review.author}</Typography>
                    <StyledRating value={review.rating} readOnly />
                  </StyledReviewContent>
                </StyledReviewAuthor>
                <StyledReviewComment>
                  <Typography variant="body2">{review.comment}</Typography>
                </StyledReviewComment>
              </StyledReviewCard>
            ))}
          </StyledReviewsContainer>

          <StyledRatingCommentContainer>
            <Typography variant="h6">Rate and Comment:</Typography>
            <Typography variant="subtitle1">
              My team and I love hearing from you! Submit your recipe review here.
            </Typography>

            <StyledCommentPaper>
              <StyledCommentForm onSubmit={handleFormSubmit}>
                <Box mt={2} mb={2}>
                  <TextField
                    label="Your Name"
                    variant="outlined"
                    fullWidth
                    value={authorName}
                    onChange={handleAuthorNameChange}
                    required
                  />
                </Box>

                <StyledRatingStarsInput>
                  {[...Array(5)].map((_, index) => {
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
                        <FaStar className="star" color={ratingValue <= (hoverRating || rating) ? '#ffc107' : '#e4e5e9'} />
                      </label>
                    );
                  })}
                </StyledRatingStarsInput>

                <Box mt={2} mb={2}>
                  <StyledCommentTextArea
                    placeholder="Comment"
                    value={comment}
                    onChange={handleCommentChange}
                  />
                </Box>

                <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
              </StyledCommentForm>
            </StyledCommentPaper>
          </StyledRatingCommentContainer>
        </StyledRecipeDetails>
      </StyledRecipeContainer>
    </Box>
  );
};

export default ViewRecipe;
