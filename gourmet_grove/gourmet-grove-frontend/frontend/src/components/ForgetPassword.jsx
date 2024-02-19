import React, { useState } from 'react';
import '../Login.css'; // Import the existing CSS file
import { Link } from 'react-router-dom';

const UpdatePassword = () => {
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdatePassword = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Password updated successfully: ${data.message}`);
        window.location.reload();
      } else {
        setMessage(`Password update failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Error during password update:', error);
      setMessage('Internal server error');
    }
  };

  return (
    <div className='login-container'
                style={{
                    backgroundImage: `url('/img/pexels-klaus-nielsen-6287210.jpg')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    color: '#fff',
                }}
            >
    <div className='login-container'>
      <div className='login-wrapper'>
        <div className="login-form">
          <h2>Update Password</h2>
          <form>
            <input type="text" id="username" placeholder="Username "value={username} onChange={(e) => setUsername(e.target.value)} />

            <input type="password" id="currentPassword" placeholder='Current Password' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />

            <input type="password" id="newPassword" placeholder='New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

            <button type="button" onClick={handleUpdatePassword}>
              Update Password
            </button>
            <Link to={'/login'} style={{color:"white", textAlign:"center",textDecoration:"none"}}>Login</Link>
          </form>

          {message && <h6>{message}</h6>}
        </div>
      </div>
    </div>
    </div>
  );
};

export default UpdatePassword;
