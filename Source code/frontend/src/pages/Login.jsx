import React, { useState } from 'react'; 
import LoginContainer from "../Components/LoginContainer";
import BackButton from "../buttonComponents/BackButton";
import SignUp from "../Components/SignUpContainer";

function Login({ setToken }) {
  const [isLogin, setIsLogin] = useState(true); 

  const handleSwitchPage = () => {
    setIsLogin(prevState => !prevState); 
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
      overflow: 'hidden',
    }}>
      <div style={{
        width: '50vw',
        height: '100vh',
        right: 0,
        position: 'absolute',
        clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
        background: 'linear-gradient(227deg, rgba(100, 176, 224, 0.88) 0%, rgba(101.84, 176.75, 224.12, 0.44) 26%, rgba(105.44, 178.20, 224.36, 0.18) 78%, rgba(113.50, 180.62, 222.91, 0.88) 97%)'
      }}></div>
      
      <div style={{
        width: '30vw',
        height: '50vh',
        right: '10vw',
        top: "20vh",
        position: 'absolute',
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
        top: isLogin ? '30vh' : '10vh', 
        position: 'fixed'
      }}>
        {isLogin ? (
          <>
            <LoginContainer onLoginSuccess={handleLoginSuccess} />
            <div onClick={handleSwitchPage} style={{ cursor: 'pointer', marginTop: '20px' }}>
              Chưa có tài khoản? <strong>Đăng ký ngay</strong>
            </div>
          </>
        ) : (
          <>
            <SignUp />
            <div onClick={handleSwitchPage} style={{ cursor: 'pointer', marginTop: '20px' }}>
              Đã có tài khoản? <strong>Đăng nhập ngay</strong>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
