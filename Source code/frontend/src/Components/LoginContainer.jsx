import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import { 
  Button, 
  TextField, 
  Card, 
  CardContent, 
  CardActions, 
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { Navigate } from 'react-router-dom';
import { FetchAPI } from '../Helper/Utilities';

async function CheckLogin({ info, password ,setErrors }) {
    try {
        const response = await FetchAPI( {endpoint: '/api/Login', method: 'Post', body: {
                info: info, 
                password: password 
            }}  );

        if (!response.ok) {
            // Handle different types of errors
            switch (response.status) {
                case 401:
                    setErrors(prev => ({
                        ...prev,
                        general: 'Thông tin đăng nhập hoặc mật khẩu không chính xác'
                    }));
                    break;
                default:
                    setErrors(prev => ({
                        ...prev,
                        general:'Đã có lỗi xảy ra khi đăng nhập'
                    }));
            }
            return;
        }
        const data = await response.text();
        const decoded = jwtDecode(data);
        console.log(decoded); // In thông tin giải mã
        window.sessionStorage.setItem('token', data); // Store token in session storage
        window.sessionStorage.setItem('firstname', (decoded.FirstName)); // Store first name in session storage
        window.sessionStorage.setItem('lastname', (decoded.LastName)); // Store last name in session storage
        window.sessionStorage.setItem('address', (decoded.Address));
        window.sessionStorage.setItem('phonenumber', (decoded.PhoneNumber));
        return 'success';
    } catch( error ) {
        console.error( error );
        return 'failed';
    }
}

function Login() {
    let navigate = useNavigate();
  // Form states
  const [info, setInfo] = useState('');
  const [password, setPassword] = useState('');
  
  // Error states
  const [errors, setErrors] = useState({
    info: '',
    password: '',
    general: ''
  });
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Validate email function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({
      info: '',
      password: '',
      general: ''
    });

    let hasError = false;
    if (!info) {
      setErrors(prev => ({...prev, info: 'Email/số điện thoại là bắt buộc'}));
      hasError = true;
    } else if (!validateEmail(info)) {
      setErrors(prev => ({...prev, info: 'Email/só điện thoại không hợp lệ'}));
      hasError = true;
    }

    if (!password) {
      setErrors(prev => ({...prev, password: 'Mật khẩu là bắt buộc'}));
      hasError = true;
    } else if (password.length < 6) {
      setErrors(prev => ({...prev, password: 'Mật khẩu phải có ít nhất 6 ký tự'}));
      hasError = true;
    }

    if (hasError) return;

    setIsLoading(true);
      CheckLogin( { info: info, password: password, setErrors: setErrors } ).then( result => {
        if( result == "success" )
            navigate("/");
          else if( result == "pending" )
              setIsLoading( true );
        else 
          setIsLoading(false);
      }
      );
  };

  return (
    <Card style={{ 
      width: "25vw", 
      background: 'linear-gradient(136deg, rgba(100.04, 176.47, 223.98, 0.50) 25%, rgba(25, 200, 254, 0.38) 75%)'
    }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Đăng nhập
        </Typography>

        {errors.general && (
          <Alert severity="error" style={{ marginBottom: 16 }}>
            {errors.general}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{
            height: "55px", 
            marginBottom: 16,
            backgroundColor: "white",
            borderRadius: "4px"
          }}>
            <TextField
              id="email"
              label="Thông tin đăng nhập"
              type="email"
              placeholder="your@email.com"
              value={info}
              onChange={(e) => {
                setInfo(e.target.value);
                // Clear error when typing
                if (errors.info) {
                  setErrors(prev => ({...prev, info: ''}));
                }
              }}
              error={Boolean(errors.info)}
              helperText={errors.info}
              fullWidth
              required
            />
          </div>

          <div style={{ 
            marginBottom: 16,
            backgroundColor: "white",
            borderRadius: "4px"
          }}>
            <TextField
              id="password"
              label="Mật khẩu"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                // Clear error when typing
                if (errors.password) {
                  setErrors(prev => ({...prev, password: ''}));
                }
              }}
              error={Boolean(errors.password)}
              helperText={errors.password}
              fullWidth
              required
            />
          </div>

          <CardActions>
            <Button 
              type="submit" 
              variant="contained" 
              fullWidth
              disabled={isLoading}
              style={{
                position: 'relative'
              }}
            >
              {isLoading ? (
                <>
                  <CircularProgress 
                    size={24} 
                    style={{
                      position: 'absolute',
                      left: '50%',
                      marginLeft: -12
                    }}
                  />
                  Đang xử lý...
                </>
              ) : 'Đăng nhập'}
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
}

export default Login;
