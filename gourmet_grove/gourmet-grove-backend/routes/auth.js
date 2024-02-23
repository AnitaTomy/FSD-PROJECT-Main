const express=require('express');

// creating an instance of router
const router=express.Router();

// Importing the user model which contains the schema for registration of users
const User=require('../models/user')

// API FOR LOGIN ROUTER
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username === 'Admin' && password === 'admin@12345') {
            res.json({ success: true, message: 'Welcome Admin' });
            return; 
        }
        const user = await User.findOne({ username });
        // Check if the user exists and the password is correct
        if (user && user.password === password) {
            res.json({ success: true, userId: user._id, username: user.username, message: 'Welcome User' })

        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// API to check if the user has an active session
router.get('/checksession', (req, res) => {
    if (req.session && req.session.user) {
        res.json({ success: true, username: req.session.user.username });
    } else {
        res.json({ success: false });
    }
});


// API FOR SIGNUP ROUTER
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please fill all the required fields.'});
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists.' });
        }
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ success: true, message: 'User registered successfully.' });
        } catch (error) {
            console.error('Error during signup:', error);
            res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    });
    // API FOR UPDATE
    router.put('/update/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const newDetails = req.body;
    
            const user = await User.findById(id);
    
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
    
            // Update user details
            if (newDetails.username) user.username = newDetails.username;
            if (newDetails.email) user.email = newDetails.email;
            if (newDetails.password) user.password = newDetails.password;
    
            await user.save();
    
            res.json({ success: true, message: 'User details updated successfully' });
        } catch (error) {
            console.error('Error during user update:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    });

// API FOR DELETING A USER
router.delete('/delete/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      console.log('Deleting user with ID:', userId);
  
      const user = await User.findOneAndDelete({ _id: userId });
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error during user deletion:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  
  

// API FOR VIEWING THE REGISTERD USERS
router.get('/view',async(req,res)=>{
    try{
        const users=await User.find();
        if(users.length===0){
            return res.status(404).json({success:false,message:"No Registerd Users"});
        }
        res.json({success:true,users});
    }
    catch(error){
        console.error("Error",error);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
});

// API endpoint to view user details by ID
router.get('/viewuser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error("Error", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
// exporting router
module.exports=router;