import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/recipe/getLatestRecipes');
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setRecipes(data.recipes.slice(0, 8));
        } else {
          console.error('Error fetching recipes:', data.message);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
    return () => setSearchTerm('');
  }, []);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/review/getAllReviews');
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
  }, []);

  

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const courseImages = [
    { course: 'appetizer', imageSrc: '/img/pexels-kampus-production-6760864.jpg', alt: 'Appetizer' },
    { course: 'starter', imageSrc: '/img/pexels-boryslav-shoot-14571140.jpg', alt: 'Starter' },
    { course: 'main-course', imageSrc: '/img/pexels-horizon-content-3763847.jpg', alt: 'Main Course' },
    { course: 'dessert', imageSrc: '/img/pexels-kadir-avşar-14705141.jpg', alt: 'Dessert' },
  ];

  const categoryImages = [
    { category: 'vegetarian', imageSrc: '/img/pexels-lisa-fotios-1351238.jpg', alt: 'Vegetarian' },
    { category: 'non-vegetarian', imageSrc: '/img/pexels-ruslan-khmelevsky-7226367.jpg', alt: 'Non-Vegetarian' },
  ];

  const handleCourseClick = async (course) => {
    try {
      const response = await fetch(`http://localhost:3000/api/search/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ course }),
      });

      const data = await response.json();

      if (data.success) {
        setRecipes(data.recipes);
      } else {
        console.error('Error fetching recipes:', data.message);
        window.alert("No Recipes found");
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleCategoryClick = async (category) => {
    try {
      const response = await fetch(`http://localhost:3000/api/search/catsearch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category }),
      });

      const data = await response.json();

      if (data.success) {
        setRecipes(data.recipes);
      } else {
        console.error('Error fetching recipes:', data.message);
        window.alert("No Recipes found");
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleExploreNowClick = () => {
    const headerElement = document.getElementById('header');
    if (headerElement) {
      headerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // Function to calculate average rating for a specific recipe
  const calculateRecipeAverageRating = (recipeId) => {
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

  return (
    <div>
   <section id="cta" className="jumbotron text-center">
  <div className="container">
    <a href="food-index.html"><img src="/img/166028664_padded_logo-removebg-preview.png" alt="" className="img-fluid" /></a>
    <h6 style={{color:"#ffffff"}}>Gourmet Grove's web app provides a user-friendly platform for food enthusiasts to effortlessly explore and purchase a curated selection of premium, artisanal ingredients and gourmet products...</h6>
    <Link to={'/'} className="btn btn-primary" onClick={handleExploreNowClick}>
          EXPLORE NOW
        </Link>
  </div>
</section>
      <header className="header" id="header">
        <div className="logo-container">
          <div className="logo">
            <img
              src="/img/166028664_padded_logo-removebg-preview.png"
              alt="Gourmet Grove"
              className="logo-img"
              style={{ height: '70px', width: '70px' ,color:'white'}}
            />
          </div>
          <h3 style={{color:"white"}}>Gourmet Grove</h3>
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
            <li>
              <Link style={{ textDecoration: "none", color: "white" }} >
                {/* Add your search bar JSX here */}
                <div style={{ position: 'relative', borderRadius: '4px', backgroundColor: 'rgba(255, 255, 255, 0.15)', marginLeft: 0, width: '100%', display: 'flex' }}>
                  <input type="text" placeholder="Search..." style={{ padding: '10px', color: 'inherit', width: '100%', border: 'none', background: 'transparent' }} value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
                  <button style={{ position: 'absolute', right: 0, top: 0, padding: '10px', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}><span class="material-symbols-outlined">
                    search
                  </span></button>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </header>

    <div className="app-container">
      <main className="main-content">
          <h5 style={{ color: "black"}}>"Unlock Culinary Creativity: Your Personal Recipe Haven!"</h5>
        <div className="combined-images">
  {[...courseImages, ...categoryImages].map(({ course, category, imageSrc, alt }) => (
    <div key={course || category} onClick={() => course ? handleCourseClick(alt) : handleCategoryClick(alt)} className="combined-image-container">
      <div className="overlay">
        <h5>{alt}</h5>
      </div>
      <img src={imageSrc} alt={alt} className="combined-image" />
    </div>
  ))}
</div>


<div className="row">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <div className="col-sm-6 col-md-6 col-lg-3" key={recipe._id}>
              <div className="card recipe-card" style={{ width: '18rem', marginBottom: '60px' }}>
                <Link to={{ pathname: `/recipe/${recipe._id}`, state: { recipeId: recipe._id } }}>
                  <div className="recipe-image-container">
                    <img src={recipe.image} alt={recipe.title} className="card-img-top img-fluid" />
                  </div>
                </Link>
                <div className="card-body" style={{backgroundColor:"grey"}}>
                  <div className="recipe-rating">
                    {renderStars(calculateRecipeAverageRating(recipe._id))}
                  </div>
                  <h5 className="card-title">{recipe.title}</h5>
                  <Link
                    to={{ pathname: `/recipe/${recipe._id}`, state: { recipeId: recipe._id } }}
                    className="btn btn-primary btn-view-more"
                  >
                    View More
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No matching recipes found.</p>
        )}
      </div>
      <a id="scrollUp" href="#top" style={{position: 'absolute', zIndex: 2147483647, display: 'block'}}>
    <span className="material-symbols-outlined">
      arrow_upward
    </span>
  </a>

      <footer className="footer">
  <div className="footer-content">
    <h6 style={{color:"white"}}>&copy; 2024 Gourmet Grove. All Rights Reserved.</h6>
  </div>
</footer>


      </main>
    </div>
    </div>
  );
};

export default Home;
