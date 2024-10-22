import React from 'react';
import { Card, CardHeader, CardContent, Typography, Button } from '@mui/material';

const CustomerSummary = ({ name, phone, address }) => {
  return (
    <div style={{ maxWidth: '450px', width: '100%' }}>
      {/* Main Card */}
      <Card elevation={3} style={{ borderRadius: '15px', overflow: 'hidden' }}>
        {/* Header */}
        <CardHeader
          style={{
            background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)',
            color: 'white',
          }}
          title={
            <Typography variant="h6" component="div" style={{ fontWeight: '700' }}>
              Thông tin khách đặt hẹn
            </Typography>
          }
        />
        
        {/* Content */}
        <CardContent>
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold',fontSize: '20px'  }}>Tên: </span>
            <span style={{ marginLeft: '8px', fontSize: '20px' }}>{name}</span>
          </div>
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold',fontSize: '20px'  }}>Số điện thoại: </span>
            <span style={{ marginLeft: '8px', fontSize: '20px' }}>{phone}</span>
          </div>
          <div style={{ marginBottom: '0px', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold',fontSize: '20px'  }}>Địa chỉ: </span>
            <span style={{ marginLeft: '8px', fontSize: '20px' }}>{address}</span>
          </div>
        </CardContent>

        {/* Change Info Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '15px' }}>
          <Button 
            variant="outlined" 
            style={{ color: 'white',
              padding:'12px',
               background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)',
               fontWeight: 'bold',
               border:'none',
               borderRadius: '10px'
               }}
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