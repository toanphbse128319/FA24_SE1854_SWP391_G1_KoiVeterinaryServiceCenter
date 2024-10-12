import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@emotion/styled';

const StyledButton = styled(Button)`
  width: 100%;
  height: 100%;
  text-align: center;
  color: #64B0E0;
  font-size: 24px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  letter-spacing: 0.24px;
  word-wrap: break-word;
`;

const AboutButton = () => {
  return (
    <StyledButton variant="outlined">
      About us
    </StyledButton>
  );
};

export default AboutButton;