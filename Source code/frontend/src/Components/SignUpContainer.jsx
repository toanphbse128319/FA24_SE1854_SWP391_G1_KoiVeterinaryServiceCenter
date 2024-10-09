import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, CardActions, Typography } from '@mui/material';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng ký ở đây
    console.log('Đăng ký với:', { firstName, lastName, email, address, phone, password });
  };

  return (
    <Card style={{ width: 350, background: 'linear-gradient(136deg, rgba(100.04, 176.47, 223.98, 0.50) 25%, rgba(25, 200, 254, 0.38) 75%)' }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Đăng ký tài khoản
        </Typography>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 ,backgroundColor:"white",borderRadius:"4px"}}>
            <TextField
              id="firstName"
              label="Tên"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div style={{ marginBottom: 16,backgroundColor:"white",borderRadius:"4px" }}>
            <TextField
              id="lastName"
              label="Họ"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div style={{ marginBottom: 16 ,backgroundColor:"white",borderRadius:"4px"}}>
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
          <div style={{ marginBottom: 16 ,backgroundColor:"white",borderRadius:"4px"}}>
            <TextField
              id="address"
              label="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div style={{ marginBottom: 16 ,backgroundColor:"white",borderRadius:"4px"}}>
            <TextField
              id="phone"
              label="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div style={{ marginBottom: 16 ,backgroundColor:"white",borderRadius:"4px"}}>
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
              Đăng ký
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignUp;