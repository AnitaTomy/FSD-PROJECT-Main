import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/auth/checksession', {
                    method: 'GET',
                    credentials: 'include',
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    // User is already logged in, redirect to the dashboard
                    navigate(`/userdash/${data.username}`);
                }
            } catch (error) {
                console.error('Error checking session:', error);
            }
        };

        checkSession();
    }, [navigate]);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data.message);

                // Check if the user is an admin
                if (username === 'Admin' && password === 'admin@12345') {
                    localStorage.setItem('userId', data.userId);
                    navigate('/admindash');
                } else {
                    // Redirect to the user dashboard
                    localStorage.setItem('userId', data.userId);
                    navigate(`/userdash/${username}`);
                }
            } else {
                console.error('Login failed:', data.message);
                window.alert('Login failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className='login-page'>
            {/* Header Section */}
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

            {/* Login Form Section */}
            <div className='login-container'
                style={{
                    backgroundImage: `url('/img/pexels-klaus-nielsen-6287210.jpg')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    color: '#fff',
                }}
            >
                <div className='login-wrapper'>
                    <div className="login-form">
                        <h1 style={{color:"white", textAlign:"center"}}>Login</h1>
                        <form>
                            <input type="text" id='username' placeholder='Enter your username' value={username} onChange={(e) => setUsername(e.target.value)} /> <br />
                            <input type="password" id='password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type='button' onClick={handleLogin} style={{color:"white",backgroundColor:"#8B0000"}}>Login</button><br />
                            <Link to={'/signup'} style={{color:"white",textDecoration:"none"}}>Dont Have an Account??</Link><br />
                            <Link to={'/forgetpassword'} style={{color:"white",textDecoration:"none"}}>Forget Password</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
