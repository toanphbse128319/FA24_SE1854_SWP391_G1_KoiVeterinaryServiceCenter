import React from 'react';
import Button from '@mui/material/Button';
// import { styled } from '@emotion/styled';
import styled from '@emotion/styled';

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

const AboutButton = () => {
  return (
    <StyledButton variant="outlined">
      About us
    </StyledButton>
  );
};

export default AboutButton;