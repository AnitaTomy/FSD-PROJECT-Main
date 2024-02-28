import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './Login.css';
import './Signin.css';

import Home from './components/Home';
import Login from './components/Login';
import Signin from './components/Signin';
// import Search from './components/Search';
import Userdash from './components/Userdash';
import About from './components/About';
import Addrecipe from './components/Addrecipe';
import ViewRecipe from './components/ViewRecipe';
import EditRecipe from './components/EditRecipe';
import Admindash from './components/Admindash';
import ForgetPassword from './components/ForgetPassword';
import EditUser from './components/EditUser';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signin />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/userdash/:username' element={<Userdash/>}/>
        <Route path='/addrecipe' element={<Addrecipe/>}/>
        <Route path='/recipe/:recipeId' element={<ViewRecipe/>}/>
        <Route path='/editrecipe/:id' element={<EditRecipe />} />
        <Route path='/admindash/:userId' element={<Admindash/>}/>
        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/edituser/:userId' element={<EditUser/>}/>
      </Routes>
    </div>
  );
}

export default App;
