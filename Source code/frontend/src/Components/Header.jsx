import React from 'react';
import { Button } from '@mui/material'; // Kiểm tra import

const Header = () => {
  const handleClick = (section) => {
    console.log(`Navigating to ${section}`);
    // Thêm logic điều hướng tại đây
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div style={{ width: '100%', height: 80, position: 'absolute', background: 'black' , boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)'}} />

      <Button 
        onClick={() => handleClick('about')}
        style={{
          width: 113, 
          height: 100, 
          left: 312, 
          top: -9.50, 
          position: 'absolute', 
          color: '#64B0E0', 
          fontSize: 23, 
          fontFamily: 'Inter', 
          fontWeight: '600',
          textTransform: 'none'
        }}
      >
        About us
      </Button>

      <div style={{ left: 455, top: -9.50, position: 'absolute', display: 'flex', alignItems: 'center' }}>
        <Button 
          onClick={() => handleClick('services')}
          style={{
            width: 136.81, 
            height: 100, 
            color: '#64B0E0', 
            fontSize: 23, 
            fontFamily: 'Inter', 
            fontWeight: '600',
            textTransform: 'none'
          }}
        >
          Services
        </Button>
        <div style={{ width: 20.07, height: 10.12, background: '#64B0E0', border: '1px #64B0E0 solid' }}></div>
      </div>

      <Button 
        onClick={() => handleClick('petCare')}
        style={{
          width: 113, 
          height: 100, 
          left: 641.88, 
          top: -9.50, 
          position: 'absolute', 
          color: '#64B0E0', 
          fontSize: 23, 
          fontFamily: 'Inter', 
          fontWeight: '600',
          textTransform: 'none'
        }}
      >
        Pet Care
      </Button>

      <Button 
        onClick={() => handleClick('news')}
        style={{
          width: 74, 
          height: 100, 
          left: 784.88, 
          top: -9.50, 
          position: 'absolute', 
          color: '#64B0E0', 
          fontSize: 23, 
          fontFamily: 'Inter', 
          fontWeight: '600',
          textTransform: 'none'
        }}
      >
        News
      </Button>

      <Button 
        onClick={() => handleClick('contact')}
        style={{
          width: 109, 
          height: 100, 
          left: 888.88, 
          top: -9.50, 
          position: 'absolute', 
          color: '#64B0E0', 
          fontSize: 23, 
          fontFamily: 'Inter', 
          fontWeight: '600',
          textTransform: 'none'
        }}
      >
        Contact
      </Button>

      <img style={{ width: 100, height: 80, left: 12, top: 3, position: 'absolute', borderRadius: 10 }} src="/img/logo.png" alt="Logo" />

      <Button 
        onClick={() => handleClick('account')}
        style={{
          width: 155, 
          height: 57, 
          left: 1300, 
          top: 12, 
          position: 'absolute', 
          background: 'rgba(217, 217, 217, 0)', 
          borderRadius: 15, 
          border: '2px rgba(100.04, 176.47, 223.98, 0.80) solid',
          color: '#64B0E0', 
          fontSize: 23, 
          fontFamily: 'Inter', 
          fontWeight: '600',
          textTransform: 'none'
        }}
      >
        Account
      </Button>
    </div>
  );
};

export default Header;