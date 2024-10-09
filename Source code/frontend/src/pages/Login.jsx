import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <main style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Login Page</h2>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Username" 
          style={{ margin: '10px', padding: '5px', width: '200px' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          style={{ margin: '10px', padding: '5px', width: '200px' }}
        />
        <button 
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            margin: '10px'
          }}
        >
          Login
        </button>
      </form>
      <button 
        onClick={handleBackClick}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Back to Home
      </button>
    </main>
  );
}

export default Login;