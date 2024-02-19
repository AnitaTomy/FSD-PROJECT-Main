import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditUser = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/viewuser/${userId}`);
        const data = await response.json();

        if (data.success) {
          setUserDetails(data.user);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError('Error fetching user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userDetails.username,
          email: userDetails.email,
          password: userDetails.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('User updated successfully:', data.message);
        window.alert('User updated successfully');
      } else {
        console.error('Update failed:', data.message);
        window.alert('Update failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error during user update:', error);
      window.alert('Error during user update');
    }
  };

  return (
    <div className='login-page'>
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
          <h3>Gourmet Grove</h3>
        </div>
      </header>

      <div
        className='login-container'
        style={{
          backgroundImage: `url('/img/pexels-elevate-1267320.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          color: '#fff',
        }}
      >
        <div className='login-wrapper'>
        <div className="login-form">
          <h2>Edit Profile</h2>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form>
            <h6 style={{ color: "white" }}>Username</h6>
            <input
              type="text"
              id="username"
              name="username"
              value={userDetails.username}
              onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
            />

            <h6 style={{ color: "white" }}>Email</h6>
            <input
              type="text"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            />

            {/* Add other form fields with onChange handlers */}

            <br/>
            <button type="button" onClick={handleUpdateUser}>
              Update User
            </button>
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default EditUser;
