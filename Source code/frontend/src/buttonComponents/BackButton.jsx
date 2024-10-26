// BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      style={{
        position: 'fixed',    // Định vị cố định
        top: '12vh',          // Cách từ đỉnh 20px
        left: '5vw',         // Cách từ bên trái 20px
        border: 'none',       // Xóa viền nút
        background: 'none',   // Xóa nền nút
        cursor: 'pointer',    // Chỉ thị con trỏ chuột khi hover
        zIndex: 1000          // Đảm bảo nút luôn nằm trên các phần tử khác
      }}
    >
      <img src='\img\backButton.png' alt="Back" />
    </button>
  );
};

export default BackButton;