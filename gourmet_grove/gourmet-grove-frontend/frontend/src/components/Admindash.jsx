import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CommentIcon from '@mui/icons-material/Comment';
import Button from '@mui/material/Button';
import { TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const Admindash = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [userDetails, setUserDetails] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [showDetails, setShowDetails] = useState(false); // State to track whether to show details
  const [selectedView, setSelectedView] = useState('users'); // Initial view is users
  const [commentDetails, setCommentDetails] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [recipeNames,setRecipeNames]=useState({});
  const navigate = useNavigate();
  const params = useParams();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    navigate('/login');
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userResponse = await fetch('http://localhost:3000/api/auth/view');
        const recipeResponse = await fetch('http://localhost:3000/api/recipe/getAllRecipes');
        const commentResponse = await fetch('http://localhost:3000/api/review/getAllReviews');

        const userData = await userResponse.json();
        const recipeData = await recipeResponse.json();
        const commentData = await commentResponse.json();

        if (userData.success && recipeData.success && commentData.success) {
          setTotalUsers(userData.users.length);
          setTotalRecipes(recipeData.recipes.length);
          setTotalComments(commentData.reviews.length);
        } else {
          console.error('Error fetching statistics');
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStats(); 
  }, []); 

  

  const deleteUser = async (userId) => {
    console.log('Deleting user with ID:', userId);
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/delete/${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.success) {
          alert('User deleted successfully');
          showUserDetails();
        } else {
          alert('Error deleting user');
        }
      } catch (error) {
        console.error('Error during user deletion:', error);
        alert('Error deleting user');
      }
    }
  };

  useEffect(() => {
    // Fetch user details to get user names based on user ID
    const fetchUserNames = async () => {
      try {
        const userResponse = await fetch('http://localhost:3000/api/auth/viewuser');
        const userData = await userResponse.json();

        if (userData.success) {
          const names = {};
          userData.users.forEach((user) => {
            names[user._id] = user.username;
          });
          setUserNames(names);
        } else {
          console.error('Error fetching user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserNames();
  }, []);


  useEffect(() => {
    // Fetch recipe details to get recipe names based on recipe ID
    const fetchRecipeNames = async () => {
      try {
        const recipeResponse = await fetch('http://localhost:3000/api/recipe/getAllRecipes');
        const recipeData = await recipeResponse.json();
  
        if (recipeData.success) {
          const names = {};
          recipeData.recipes.forEach((recipe) => {
            names[recipe._id] = recipe.title;
          });
          setRecipeNames(names);
        } else {
          console.error('Error fetching recipe details');
        }
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      }
    };
  
    fetchRecipeNames();
  }, []);
  

  const deleteRecipe = async (recipeId) => {
    console.log('Deleting recipe with ID:', recipeId);
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');

    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/api/recipe/deleteRecipe/${recipeId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.success) {
          alert('Recipe deleted successfully');
          showRecipeDetails();
        } else {
          alert('Error deleting recipe');
        }
      } catch (error) {
        console.error('Error during recipe deletion:', error);
        alert('Error deleting recipe');
      }
    }
  };

  const showUserDetails = async () => {
    try {
      const userResponse = await fetch('http://localhost:3000/api/auth/view');
      const userData = await userResponse.json();

      if (userData.success) {
        setUserDetails(
          userData.users
            .filter((user) => user.username !== 'Admin')
            .map((user) => ({ ...user, id: user.id }))
        );
      } else {
        console.error('Error fetching user details');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const showRecipeDetails = async () => {
    try {
      const recipeResponse = await fetch('http://localhost:3000/api/recipe/getAllRecipes');
      const recipeData = await recipeResponse.json();

      if (recipeData.success) {
        setRecipeDetails(
          recipeData.recipes.map((recipe) => ({ ...recipe, id: recipe.id }))
        );
      } else {
        console.error('Error fetching recipe details');
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };
  const showCommentDetails = async () => {
    try {
      const commentResponse = await fetch('http://localhost:3000/api/review/getAllReviews');
      const commentData = await commentResponse.json();

      if (commentData.success) {
        setCommentDetails(
          commentData.reviews.map((review) => ({ ...review, id: review._id }))
        );
      } else {
        console.error('Error fetching comment details');
      }
    } catch (error) {
      console.error('Error fetching comment details:', error);
    }
  };

  const deleteComment = async (commentId) => {
    console.log('Deleting comment with ID:', commentId);
    const confirmDelete = window.confirm('Are you sure you want to delete this comment?');

    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3000/api/review/deleteReview/${commentId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.success) {
          alert('Comment deleted successfully');
          showCommentDetails();
        } else {
          alert('Error deleting comment');
        }
      } catch (error) {
        console.error('Error during comment deletion:', error);
        alert('Error deleting comment');
      }
    }
  };


  const handleSidebarButtonClick = (view) => {
    setSelectedView(view);
    setShowDetails(true); 
    if (view === 'users') {
      showUserDetails();
      setRecipeDetails([]); // Clear recipe details
    } else if (view === 'recipes') {
      showRecipeDetails();
      setUserDetails([]); // Clear user details
    } else if (view === 'comments') {
      showCommentDetails();
      setUserDetails([]);
      setRecipeDetails([]);
    }
  };
  const styles = {
    body: {
      // backgroundImage: 'url("/img/pexels-laker-6156996.jpg")', // Replace with the actual path to your image
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '100vh', // Ensure the background covers the entire viewport height
    },
  };

  return (
    
    <Box sx={{...styles.body, display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <MuiAppBar
        position="fixed"
        sx={{
          backgroundColor: 'Darkred',
          width: '1500px',
          height: '90px',
          color: 'white',
        }}
      >
        <Toolbar>
          <img
            src="/img/166028664_padded_logo-removebg-preview.png"
            alt="Gourmet Grove Logo"
            className="logo-img"
            style={{ height: '50px', width: '50px', marginRight: '10px' }}
          />
          <Typography variant="h6" noWrap component="div" sx={{ color: 'white' }}>
            Gourmet Grove
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <IconButton color="inherit" aria-label="user icon" onClick={handleMenuOpen}>
            <AccountCircleIcon sx={{ color: 'white' }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Admin</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </MuiAppBar>

      {/* Sidebar Section */}
      <Box
  sx={{
    backgroundColor: 'rgba(21, 21, 21, 0.8)',
    color: 'white',
    width: '200px',
    padding: '20px',
    position: 'fixed',
    border: '2px solid Darkred',
    height: '100vh',
    marginTop: '95px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}
>
  <Button
    variant="outlined"
    onClick={() => handleSidebarButtonClick('users')}
    sx={{
      marginBottom: '10px',
      backgroundColor: 'Darkred',
      color: '#fff',
      border: '1px solid Darkred',
    }}
  >
    View Users
  </Button>

  <Button
    variant="outlined"
    onClick={() => handleSidebarButtonClick('recipes')}
    sx={{
      marginBottom: '10px',
      backgroundColor: 'Darkred',
      color: 'white',
      border: '1px solid Darkred',
    }}
  >
    View Recipes
  </Button>

  <Button
    variant="outlined"
    onClick={() => handleSidebarButtonClick('comments')}
    sx={{
      marginBottom: '10px',
      backgroundColor:'Darkred',
      color: '#fff',
      border: '1px solid Darkred',
    }}
  >
    View Comments
  </Button>
</Box>

      {/* Main Content Section */}
      <Box
        sx={{
          marginLeft: '200px', // Adjust the margin based on the sidebar width
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Content Section */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '100px',

            padding: '20px',
            cursor: 'pointer',
          }}
        >
          <StyledBox onClick={showUserDetails}>
            <PersonIcon sx={{ fontSize: 40, color: 'white' }} />
            <Typography variant="h6" sx={{ textAlign: 'center', color: 'white', marginTop: '10px' }}>
              Registered Users
            </Typography>
            <Typography variant="h4" sx={{ textAlign: 'center', color: 'white' }}>
              {totalUsers}
            </Typography>
          </StyledBox>

          <StyledBox onClick={() => { showRecipeDetails(); }}>
            <RestaurantIcon sx={{ fontSize: 40, color: 'white' }} />
            <Typography variant="h6" sx={{ textAlign: 'center', color: 'white', marginTop: '10px' }}>
              Total Recipes
            </Typography>
            <Typography variant="h4" sx={{ textAlign: 'center', color: 'white' }}>
              {totalRecipes}
            </Typography>
          </StyledBox>

          <StyledBox>
            <CommentIcon sx={{ fontSize: 40, color: 'white' }} />
            <Typography variant="h6" sx={{ textAlign: 'center', color: 'white', marginTop: '10px' }}>
              Total Comments
            </Typography>
            <Typography variant="h4" sx={{ textAlign: 'center', color: 'white' }}>
              {totalComments}
            </Typography>
          </StyledBox>
        </Box>
            {/* User Details Section */}
{showDetails && (
  <TableContainer sx={{ marginTop: '20px', backgroundColor: 'rgba(21, 21, 21, 0.8)', padding: '15px', borderRadius: '8px', marginLeft: 'auto', marginRight: 'auto', width: 'fit-content' }}>
    <Table sx={{ border: '1px solid Darkred' }}>
      <TableBody>
        {userDetails
          .filter((user) => user.username.toLowerCase() !== 'admin')
          .map((user) => (
            <TableRow key={user.id} sx={{ borderBottom: '1px solid Darkred' }}>
              <TableCell sx={{ borderRight: '1px solid Darkred', color: 'white' }}>
                <strong>{user.username !== undefined ? user.username : 'N/A'}</strong>
              </TableCell>
              <TableCell sx={{ borderRight: '1px solid Darkred', color: 'white', width: '200px' }}>
                <strong>{user.email !== undefined ? user.email : 'N/A'}</strong>
              </TableCell>
              {/* Omitted the line below to hide user ID */}
              {/* <TableCell>{user._id}</TableCell> */}
              <TableCell sx={{width: '200px'}}>
                <Button onClick={() => deleteUser(user._id)} variant='contained'
                  sx={{ backgroundColor: 'Darkred', color: 'white', fontWeight: 'bold' }}>
                  Delete User
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
)}

      
  {/* Recipe Details Section */}
  {showDetails && (
    <TableContainer sx={{ marginTop: '20px', backgroundColor: 'rgba(21, 21, 21, 0.8)', padding: '15px', borderRadius: '8px', marginLeft: 'auto', marginRight: 'auto', width: 'fit-content' }}>
      <Table sx={{ border: '1px solid Darkred' }}>
        <TableBody>
          {recipeDetails.map((recipe) => (
            <TableRow key={recipe.id} sx={{ borderBottom: '1px solid Darkred' }}>
              <TableCell sx={{ borderRight: '1px solid Darkred', color: 'white' }}>
                <strong>{recipe.title !== undefined ? recipe.title : 'N/A'}</strong>
              </TableCell>
              <TableCell sx={{ borderRight: '1px solid Darkred', color: 'white' }}>
                <strong>{userNames[recipe.userId] || 'N/A'}</strong>
              </TableCell>
              <TableCell sx={{ borderRight: '1px solid Darkred', color: 'white' }}>
                {/* Display image as an actual image based on the URL */}
                {recipe.image && <img src={recipe.image} alt={`Recipe ${recipe.title} Image`} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />}
              </TableCell>
              <TableCell>
                <Button onClick={() => deleteRecipe(recipe._id)} variant='contained'
                  sx={{ backgroundColor: 'Darkred', color: 'white', fontWeight: 'bold' }}>
                  Delete Recipe
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )}

        {/* Comment Details Section */}
{showDetails && selectedView === 'comments' && (
  <TableContainer sx={{ marginTop: '20px', backgroundColor: 'rgba(21, 21, 21, 0.8)', padding: '15px', borderRadius: '8px', marginLeft: 'auto', marginRight: 'auto', width: 'fit-content' }}>
    <Table sx={{ border: '1px solid Darkred' }}>
      <TableBody>
        {commentDetails.map((comment) => (
          <TableRow key={comment.id} sx={{ borderBottom: '1px solid Darkred' }}>
            <TableCell sx={{ borderRight: '1px solid Darkred', color: 'white' }}>
              <strong>{comment.comment !== undefined ? comment.comment : 'N/A'}</strong>
            </TableCell>
            <TableCell sx={{ borderRight: '1px solid Darkred', color: 'white' }}>
            <strong>{comment.author || 'N/A'}</strong>
            </TableCell>
            <TableCell sx={{ borderRight: '1px solid Darkred', color: 'white' }}>
              <strong>{recipeNames[comment.recipeId] || 'N/A'}</strong>
            </TableCell>
            <TableCell>
              <Button onClick={() => deleteComment(comment._id)} variant='contained'
                sx={{ backgroundColor: 'Darkred', color: 'white', fontWeight: 'bold' }}>
                Delete Comment
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)}


      </Box>
    </Box>
  );
};

const StyledBox = (props) => (
  <Box
    sx={{
      backgroundColor: 'rgba(21, 21, 21, 0.8)',
      border: '2px solid black',
      padding: '20px',
      border: '2px solid Darkred',
      borderRadius: '8px',
      textAlign: 'center',
      margin: '0 10px',
      flex: 1,
      ...props.sx
    }}
    {...props}
  ></Box>
);

export default Admindash;
