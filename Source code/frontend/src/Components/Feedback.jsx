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

const Toast = ({ message, isVisible, onHide }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onHide();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onHide]);

  if (!isVisible) return null;

  return (
    <>
      <style>{toastAnimation}</style>
      <div
        style={{
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
        {message}
      </div>
    </>
  );
};



const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    width: '90%',
    maxWidth: '500px',
    position: 'relative',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '10px',
    borderBottom: '1px solid #eee',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666',
  },
  ratingSection: {
    marginBottom: '20px',
  },
  ratingTitle: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#333',
  },
  starContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '15px',
  },
  star: {
    fontSize: '28px',
    cursor: 'pointer',
    color: '#ddd',
    transition: 'color 0.2s ease',
    userSelect: 'none',
  },
  starActive: {
    color: '#FFD700',
  },
  textarea: {
    width: '100%',
    minHeight: '100px',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    marginBottom: '20px',
    fontSize: '16px',
    resize: 'vertical',
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(90deg, #64B0E0 25%, rgba(35, 200, 254, 0.75) 75%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
  },
  submitButtonDisabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    fontSize: '14px',
  },
  modalContent: {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    zIndex: 1100,
  },
  closeIcon: {
    cursor: 'pointer',
    fontSize: '24px',
    position: 'absolute',
    right: '20px',
    top: '20px',
    background: 'none',
    border: 'none',
    color: '#666',
    transition: 'color 0.2s ease',
    '&:hover': {
      color: '#333',
    }
  }

};

const FeedbackModal = ({ bookingId, onClose }) => {
    const [serviceRating, setServiceRating] = useState(0);
    const [vetRating, setVetRating] = useState(0);
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const status = 'active';
  

    useEffect(() => {
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
  
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }, [onClose]);
  
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
  
    const handleSubmit = async () => {
      if (serviceRating === 0 || vetRating === 0) {
        setError('Vui lòng đánh giá cả dịch vụ và bác sĩ');
        return;
      }
  
      try {
        setIsLoading(true);
        setError('');
  
        const response = await fetch('http://localhost:5145/api/Feedback', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },body: JSON.stringify({
            ServiceRating: serviceRating,
            VetRating: vetRating,
            Description: description,
            Status: 'Active'
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to change booking status');
        }
        const data = await response.text();  
        
        setToastMessage('Đánh giá đã được gửi thành công!');
        setShowToast(true);
        
        // Delay closing the modal until after the toast appears
        setTimeout(() => {
          onClose();
        }, 2000);
      } catch (error) {
        console.error('Error changing status:'+ error);
      } finally {
        setIsLoading(false);
      }
    };


    const handleFinalSubmit = async () => {
      try {
       
        const response = await fetch('http://localhost:5145/api/BookingDetail/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            
            BookingDetailID: bookingDetail.BookingDetailID,
            BookingID: bookingId,
            ServiceID: selectedService.ServiceID,
            UnitPrice: selectedService.Price,
            Incidental: true,
            NoteResult: formData.NoteResult,
            AnimalStatusDescription: formData.AnimalStatusDescription,
            ConsultDoctor: formData.ConsultDoctor,
            DrugList: formData.DrugList,
            PoolStatusDescription: formData.PoolStatusDescription,
            ConsultTechnician: formData.ConsultTechnician,
            MaterialList: formData.MaterialList,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to change booking status');
        }
  
        const data = await response.text();
        console.log('Status changed successfully:'+ data);
  
        // Xử lý sau khi gọi API thành công
        setShowConfirmation(false);
        setIsIncidental(true);
        onClose();
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
  
      } catch (error) {
        console.error('Error changing status:'+ error);
      }
    };



  
    const renderStars = (rating, setRating) => {
      return Array(5).fill(0).map((_, index) => (
        <span
          key={index}
          style={{
            ...styles.star,
            ...(index < rating && styles.starActive)
          }}
          onClick={() => setRating(index + 1)}
        >
          ★
        </span>
      ));
    };
  
    return (
      <>
        <Toast 
          message={toastMessage}
          isVisible={showToast}
          onHide={() => setShowToast(false)}
        />
        <div style={styles.overlay} onClick={handleOverlayClick}>
          <div style={styles.modalContent}>
            {isLoading && (
              <div style={styles.loadingOverlay}>
                <div>Đang gửi đánh giá...</div>
              </div>
            )}
  
            <div style={styles.header}>
              <h2 style={styles.title}>Đánh giá đơn đặt</h2>
              <button 
                style={styles.closeIcon}
                onClick={onClose}
                aria-label="Đóng"
              >
                ×
              </button>
            </div>
  
            <div style={styles.ratingSection}>
              <div style={styles.ratingTitle}>Đánh giá dịch vụ</div>
              <div style={styles.starContainer}>
                {renderStars(serviceRating, setServiceRating)}
              </div>
            </div>
  
            <div style={styles.ratingSection}>
              <div style={styles.ratingTitle}>Đánh giá bác sĩ</div>
              <div style={styles.starContainer}>
                {renderStars(vetRating, setVetRating)}
              </div>
            </div>
  
            <div style={styles.ratingSection}>
              <div style={styles.ratingTitle}>Mô tả:</div>
              <textarea
                style={styles.textarea}
                placeholder="Nhập đánh giá của bạn (không bắt buộc)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
  
            {error && <div style={styles.error}>{error}</div>}
  
            <button
              style={{
                ...styles.submitButton,
                ...(serviceRating === 0 || vetRating === 0 ? styles.submitButtonDisabled : {})
              }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Đang gửi...' : 'Gửi'}
            </button>
          </div>
        </div>
      </>
    );
  };
  
  export default FeedbackModal;