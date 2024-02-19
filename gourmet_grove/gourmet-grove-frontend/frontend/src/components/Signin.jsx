import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const Signin = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSignin = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert('Registration successful!'); 
          navigate('/login'); 
          window.location.reload();
        } else {
          alert(`Registration failed: ${data.message}`); 
        }
      } catch (error) {
        console.error('Error during signup:', error);
        alert('Internal server error. Please try again later.'); 
      }
    };

    return (
        <div>
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
                    </ul>
                </nav>
            </header>

            <div
  style={{
    backgroundImage: `url('/img/pexels-klaus-nielsen-6287210.jpg')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    color: '#fff',
  }}
  className="signin-container"
>
  <div className='signin-form'>
    <h2>Signup</h2>
    <form>
      <input type="text" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} /><br/>
      <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
      <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
      <button type="button" onClick={handleSignin}>
        Register
      </button><br />
      <Link to={'/login'} style={{color:"white",textDecoration:"none",textAlign:"center"}}>Already Have an Account??</Link><br />
    </form>
  </div>
</div>

        </div>
    );
}

export default Signin;
