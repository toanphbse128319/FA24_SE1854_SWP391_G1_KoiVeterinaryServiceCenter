import React from 'react';
import { Card, CardHeader, CardContent, Typography, Button } from '@mui/material'; // Import từ MUI

const CustomerSummary = ({ name, phone, address }) => {
  return (
    <div className="max-w-md w-full mx-auto relative">
      {/* Main Card */}
      <Card elevation={3} className="rounded-2xl overflow-hidden">
        {/* Header */}
        <CardHeader
          style={{
            background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)',
            color: 'white',
          }}
          title={<Typography variant="h6" component="div">Thông tin khách đặt hẹn</Typography>}
        />
        
        {/* Content */}
        <CardContent>
          <div className="space-y-2">
            <div className="flex">
              <span className="font-semibold">Tên: </span>
              <span className="ml-2">{name}</span>
            </div>
            <div className="flex">
              <span className="font-semibold">Số điện thoại: </span>
              <span className="ml-2">{phone}</span>
            </div>
            <div className="flex">
              <span className="font-semibold">Địa chỉ: </span>
              <span className="ml-2">{address}</span>
            </div>
          </div>
        </CardContent>

        {/* Change Info Button */}
        <div className="flex justify-end p-4">
          <Button 
            variant="outlined" 
            style={{ color: '#64B0E0', borderColor: '#64B0E0' }}
            onClick={() => { /* Handle button click here */ }}
          >
            Thay đổi thông tin<br />liên lạc
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CustomerSummary;