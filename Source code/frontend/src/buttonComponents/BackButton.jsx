// BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Quay lại trang trước trong lịch sử
  };

  return (
    <button onClick={handleBack}>
      Quay Lại
    </button>
  );
};

export default BackButton;