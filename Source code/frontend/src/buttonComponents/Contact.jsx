import React from 'react';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom'; // Nhập khẩu useNavigate

const StyledButton = styled(Button)`
  width: 10vw;
  height: 10vh;
  text-align: center;
  color: #64B0E0;
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  letter-spacing: 0.24px;
  word-wrap: break-word;
  border: none;
`;

const ContactButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/'); 
  };

  return (
    <StyledButton variant="outlined" onClick={handleClick}> 
      About us
    </StyledButton>
  );
};

export default ContactButton;