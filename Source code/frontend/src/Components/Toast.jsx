import React, { useState, useEffect } from 'react';

const toastAnimation = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Toast = ({ time = 2000 }) => {
  const [toastData, setToastData] = useState({
    show: false,
    message: ''
  });

  useEffect(() => {
    if (toastData.show) {
      const timer = setTimeout(() => {
        setToastData(prev => ({ ...prev, show: false }));
      }, time);

      return () => clearTimeout(timer);
    }
  }, [toastData.show, time]);

  useEffect(() => {
    window.showToast = (message) => {
      setToastData({ show: true, message });
    };

    return () => {
      delete window.showToast;
    };
  }, []);

  if (!toastData.show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none flex items-start justify-center" style={{ zIndex: 9999 }}>
      <div
        className="mt-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg pointer-events-auto"
        style={{
          animation: 'fadeIn 0.3s ease-in-out',     
          zIndex: 9999,
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 2000,
          animation: 'fadeIn 0.3s ease-in-out',
        }}
      >
        <style>{toastAnimation}</style>
        {toastData.message}
      </div>
    </div>
  );
};

export default Toast;