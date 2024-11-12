import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, CardActions, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { FetchAPI } from '../Helper/Utilities';

function SignUp({onShowOTP, onSendOTP}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [sex, setSex] = useState(true); // Default to true (Nam)
  const [birthday, setBirthday] = useState(''); // Trường birthday

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare the payload according to the API
    const payload = {
      email: email,
      phoneNumber: phone,
      avatar: "string", // You can replace this with an actual avatar value
      password: password,
      firstname: firstName,
      lastname: lastName,
      sex: sex, // true for Nam, false for Nữ
      birthday: birthday, // Ngày sinh nhập từ người dùng
      address: address
    };
    
    try {
      // Make API call using FetchAPI
      const response = await FetchAPI({
        endpoint: "/Signup",
        method: "POST",
        body: payload,
      });

      // Handle the API response
      const contentType = response.headers.get("Content-Type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (response.ok) {
          onSendOTP({email: email}).then(result => {
            if( result != "success" )
              alert("Không thể gửi mail chứa mã OTP");
            else 
              onShowOTP({email: email});
          });
        alert("Đăng ký thành công!");
          
        console.log('Signup response:', data);
      } else {
        alert("Đăng ký thất bại.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Không thể kết nối tới server.");
    }
  };

  return (
    <Card style={{ width: 350, background: 'linear-gradient(136deg, rgba(100.04, 176.47, 223.98, 0.50) 25%, rgba(25, 200, 254, 0.38) 75%)' }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Đăng ký tài khoản
        </Typography>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16, backgroundColor: "white", borderRadius: "4px" }}>
            <TextField
              id="firstName"
              label="Tên"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div style={{ marginBottom: 16, backgroundColor: "white", borderRadius: "4px" }}>
            <TextField
              id="lastName"
              label="Họ"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div style={{ marginBottom: 16, backgroundColor: "white", borderRadius: "4px" }}>
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
          <div style={{ marginBottom: 16, backgroundColor: "white", borderRadius: "4px" }}>
            <TextField
              id="address"
              label="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div style={{ marginBottom: 16, backgroundColor: "white", borderRadius: "4px" }}>
            <TextField
              id="phone"
              label="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div style={{ marginBottom: 16, backgroundColor: "white", borderRadius: "4px" }}>
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
          <div style={{ marginBottom: 16, backgroundColor: "white", borderRadius: "4px" }}>
            <TextField
              id="birthday"
              label="Ngày sinh"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div style={{ marginBottom: 16, backgroundColor: "white", borderRadius: "4px" }}>
            <Typography variant="subtitle1">Giới tính</Typography>
            <RadioGroup
              row
              value={sex}
              onChange={(e) => setSex(e.target.value === 'true')} // Convert to boolean
            >
              <FormControlLabel value={true} control={<Radio />} label="Nam" />
              <FormControlLabel value={false} control={<Radio />} label="Nữ" />
            </RadioGroup>
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
