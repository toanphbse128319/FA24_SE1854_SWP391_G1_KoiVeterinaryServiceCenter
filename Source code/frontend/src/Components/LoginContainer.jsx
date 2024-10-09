import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, CardActions, Typography } from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập ở đây
    console.log('Đăng nhập với:', { email, password });
  };

  return (
   
      <Card style={{ width: 350 ,background: 'linear-gradient(136deg, rgba(100.04, 176.47, 223.98, 0.50) 25%, rgba(25, 200, 254, 0.38) 75%)'}}>
        <CardContent style={{}}>
          <Typography variant="h5" component="h2" gutterBottom>
            Đăng nhập
          </Typography>
          <form onSubmit={handleSubmit}>
            <div style={{height:"55px", marginBottom: 16,backgroundColor:"white",borderRadius:"4px" }}>
              <TextField
                id="email"
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
            </div>
            <div style={{ marginBottom: 16,backgroundColor:"white",borderRadius:"4px" }}>
              <TextField
                id="password"
                label="Mật khẩu"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
            </div>
            <CardActions>
             
              <Button type="submit" variant="contained" fullWidth>
                Đăng nhập
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
  );
}
// // <Button variant="outlined" onClick={() => console.log('Đăng ký')}>
// Đăng ký
// </Button>
export default Login;