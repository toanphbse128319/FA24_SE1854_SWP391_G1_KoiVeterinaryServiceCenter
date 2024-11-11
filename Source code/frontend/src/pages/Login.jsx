import React, { useState, useRef } from 'react';
import BackButton from '../buttonComponents/BackButton'; // Adjust the import according to your file structure
import LoginContainer from '../Components/LoginContainer'; // Adjust the import according to your file structure
import SignUp from '../Components/SignUpContainer'; // Adjust the import according to your file structure
import OTPForm from '../Components/OTPContainer'; // Import the OTPForm component
import { FetchAPI } from '../Helper/Utilities';
import { Send } from 'lucide-react';

function Login({ setToken }) {
  const [currentForm, setCurrentForm] = useState('login'); // Possible values: 'login', 'signup', 'otp'
   const info = useRef("");

    async function SendOTP({ email }) {
        if( email == null || email.Lenght == 0 )
            return "email is empty"
      try {
        const response = await FetchAPI({
          endpoint: "/Signup/otp/send?info=" + email,
        });

        if (!response.ok) {
          // Handle different types of errors
          switch (response.status) {
            case 406:
                  return await response.text();
            default:
                  return await response.text();
          }
        }
        return "success";
      } catch (error) {
        console.error(error);
        return "failed";
      }
    }

  const handleSwitchPage = () => {
    setCurrentForm((prev) => (prev === 'login' ? 'signup' : 'login'));
  };

  const handleShowOTP = ({ email }) => {
    setCurrentForm('otp');
      info.current = email;
  };

  const handleLoginSuccess = () => {
    setToken(true);
    console.log('LoginSuccess');
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      position: 'relative',
      background: '#E8F2F7',
      overflowY: 'auto',
      overflowX: 'hidden',
    justifyContent: 'center',
     alignItems: 'flex-start', 
    }}>
      <div style={{
        width: '50vw',
        height: '100%',
        right: 0,
        position: 'fixed',
        top: 0,
        clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
        background: 'linear-gradient(227deg, rgba(100, 176, 224, 0.88) 0%, rgba(101.84, 176.75, 224.12, 0.44) 26%, rgba(105.44, 178.20, 224.36, 0.18) 78%, rgba(113.50, 180.62, 222.91, 0.88) 97%)'
      }}></div>
      
      <div style={{
        width: '30vw',
        height: '50vh',
        right: '10vw',
        top: "20vh",
        position: 'fixed',
        zIndex: 1000,
        display: 'flex',
      }}>
        <img
          src='\img\sloganLogin.png'
          alt="Slogan"
          style={{ cursor: 'pointer' }}
          onClick={handleSwitchPage}
        />
      </div>
      
      <BackButton />
      
      <div style={{
        left: '15vw',
        top: currentForm === 'login' ? '30vh' : currentForm === 'signup' ? '10vh' : '35vh',
        position: 'relative',
        paddingBottom: '20px',
        zIndex: 1,
      }}>
        {currentForm === 'login' && (
          <>
            <LoginContainer onLoginSuccess={handleLoginSuccess} onShowOTP={handleShowOTP} />
            <div onClick={handleSwitchPage} style={{ cursor: 'pointer', marginTop: '20px' }}>
              Chưa có tài khoản? <strong>Đăng ký ngay</strong>
            </div>
          </>
        )}
        {currentForm === 'signup' && (
          <>
            <SignUp onShowOTP={handleShowOTP} onSendOTP={SendOTP} onSwitchLogin={handleSwitchPage}/>
            <div onClick={handleSwitchPage} style={{ cursor: 'pointer', marginTop: '20px' }}>
              Đã có tài khoản? <strong>Đăng nhập ngay</strong>
            </div>
          </>
        )}
        {currentForm === 'otp' && (
          <>
            <OTPForm email={ info.current } onSendOTP={SendOTP} onSwitchLogin={handleSwitchPage}/>
            <div onClick={handleSwitchPage} style={{ cursor: 'pointer', marginTop: '20px' }}>
              Quay lại <strong>Đăng nhập</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
