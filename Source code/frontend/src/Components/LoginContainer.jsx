import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
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

function Login() {
  // Form states
  const [email, setEmail] = useState('phbtoan9185@gmail.com');
  const [password, setPassword] = useState('caniskip');
  
  // Error states
  const [errors, setErrors] = useState({
    email: '',
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
      email: '',
      password: '',
      general: ''
    });

    // Validate form
    let hasError = false;
    if (!email) {
      setErrors(prev => ({...prev, email: 'Email là bắt buộc'}));
      hasError = true;
    } else if (!validateEmail(email)) {
      setErrors(prev => ({...prev, email: 'Email không hợp lệ'}));
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
  
    try {
     
      const response = await fetch('http://localhost:5173/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          info: email, 
          password: password 
        })
      });
      console.log('21312312313as');
      console.log(response.status); // In mã trạng thái HTTP
      const data = await response.text();
      console.log(data); // Hiển thị dữ liệu trong console để kiểm tra
     
      if (!response.ok) {
        // Handle different types of errors
        switch (response.status) {
          case 401:
            setErrors(prev => ({
              ...prev,
              general: 'Email hoặc mật khẩu không chính xác'
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
      const token = data;
      const decoded = jwtDecode(token);

console.log(decoded); // In thông tin giải mã
      localStorage.setItem('token', data);
      localStorage.setItem('user', JSON.stringify(data.user));
      
    
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card style={{ 
      width: 350, 
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
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                // Clear error when typing
                if (errors.email) {
                  setErrors(prev => ({...prev, email: ''}));
                }
              }}
              error={Boolean(errors.email)}
              helperText={errors.email}
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