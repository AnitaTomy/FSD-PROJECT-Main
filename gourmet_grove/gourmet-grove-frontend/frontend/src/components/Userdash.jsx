import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';

import '../Userdash.css';

const Userdash = ({ onLogout }) => {
  const { username } = useParams();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userRecipes, setUserRecipes] = useState([]);
   const [editingRecipe, setEditingRecipe] = useState(null);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

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

  const handleAddRecipeClick = () => {
    const userId = localStorage.getItem('userId');
    navigate(`/addrecipe?userId=${userId}`);
  };

  const handleEditRecipeClick = (recipeId) => {
    const userId = localStorage.getItem('userId');
    navigate(`/edituser/${userId}`);
  };
  
  

  const handleDeleteRecipeClick = async (recipeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (!confirmDelete) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/recipe/deleteRecipe/${recipeId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        setUserRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id !== recipeId)
        );
        alert('Recipe deleted successfully!');
      } else {
        console.error('Error deleting recipe:', data.message);
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('User ID not found in localStorage.');
        }
        const response = await fetch(`http://localhost:3000/api/userrecipe/userRecipes/${userId}`);
        const data = await response.json();
        if (data.success) {
          setUserRecipes(data.recipes);
        } else {
          console.error('Error fetching user recipes:', data.message);
        }
      } catch (error) {
        console.error('Error fetching user recipes:', error);
      }
    };

    fetchUserRecipes();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CssBaseline />
      <MuiAppBar
        position="fixed"
        sx={{
          backgroundColor: 'Darkred',
          color: 'white',
          marginLeft: openDrawer && `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <IconButton
            color="white"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(openDrawer && { display: 'none' }) }}
          >
            <MenuIcon sx={{ color: 'white' }} />
          </IconButton>
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
            <MenuItem onClick={handleMenuClose}>{username}</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </MuiAppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="left"
        open={openDrawer}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          <button
            onClick={handleAddRecipeClick}
            className="drawer-button"
            style={{ backgroundColor: 'white', color: 'black' }}
          >
            <ListItem>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Add Recipe" />
            </ListItem>
          </button>
          <button
            onClick={handleEditRecipeClick}
            className="drawer-button"
            style={{ backgroundColor: 'white', color: 'black' }}
          >
            <ListItem>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Profile" />
            </ListItem>
          </button>
          
          <button
            onClick={handleDeleteRecipeClick}
            className="drawer-button"
            style={{ backgroundColor: 'white', color: 'black' }}
          >
        
          </button>
        </List>
      </Drawer>

      <main className="main-content" sx={{ flexGrow: 1, p: 3, marginTop: '64px', marginLeft: openDrawer ? `${drawerWidth}px` : '0' }}>
          <div>
            <h2 style={{ marginTop: '50px' }}>Welcome, {username}!</h2>
            <div className="container">
              <div className="row">
                {userRecipes.map((recipe) => (
                  <div className="col sm-12 md-12 lg-4" key={recipe._id}>
                    <div className="card" style={{ width: '18rem',marginBottom:"30px"}}>
                      {recipe.image && (
                        <img src={recipe.image} className="card-img-top" alt={recipe.title} />
                      )}
                      <div className="card-body">
                        <h5 className="card-title">{recipe.title}</h5>
                        {/* Use Link to navigate to the EditRecipe component */}
                        <Link to={`/editrecipe/${recipe._id}`}>
                          <button className="btn btn-primary" style={{backgroundColor:"Darkred"}}>
                            Edit Recipe
                          </button>
                        </Link> <br /><br />
                        <button
                          className="btn btn-danger ml-2"
                          style={{backgroundColor:"Darkred"}}
                          onClick={() => handleDeleteRecipeClick(recipe._id)}
                        >
                          Delete Recipe
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      </main>
    </Box>
  );
};

const drawerWidth = 240;

export default Userdash;
