import React from 'react';
import { Card, CardHeader, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const { service, doctor } = location.state || {};

  // Mock data (replace with actual data from location.state)
  const orderDetails = {
    format: "trực tuyến",
    service: service?.name || "Tư vấn trực tuyến",
    doctor: doctor?.name || "Nguyễn Văn A",
    appointmentTime: "9:00-10:00 08/10/2024",
    serviceFee: 1000,
    totalAmount: 1000
  };

  return (
    <Card sx={{ maxWidth: 900, margin: 'auto', mt: 4, position: 'relative' , borderRadius: 5,}}>
      <CardHeader
        title="Xác nhận thông tin đơn hàng"
        sx={{
        background: 'linear-gradient(90deg, #69B0E0 25%, rgba(50, 200, 254, 0.75) 75%)',
        color: 'white',
          '& .MuiCardHeader-title': {
            fontSize: '1.25rem',
            fontWeight: 'bold',
          },
        }}
      />
      <CardContent>
        <TableContainer>
          <Table sx={{ 
            '& .MuiTableCell-root': { 
              border: 'none',
              padding: '8px 16px 8px 0',
            },
            '& .MuiTableRow-root': { 
              '&:last-child td, &:last-child th': { border: 0 } 
            },
          }}>
            <TableHead>
              <TableRow>
                <TableCell>Hình thức</TableCell>
                <TableCell>Dịch vụ</TableCell>
                <TableCell>Bác sĩ</TableCell>
                <TableCell>Thời gian đặt lịch</TableCell>
                <TableCell>Phí dịch vụ</TableCell>
                <TableCell>Tổng tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{orderDetails.format}</TableCell>
                <TableCell>{orderDetails.service}</TableCell>
                <TableCell>{orderDetails.doctor}</TableCell>
                <TableCell>{orderDetails.appointmentTime}</TableCell>
                <TableCell>{orderDetails.serviceFee}</TableCell>
                <TableCell>{orderDetails.totalAmount}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="caption" sx={{ display: 'block', marginTop:1, pl: 1 ,color:'gray'}}>
          **Lưu ý: tiền dịch vụ tính trên 1 con, chưa bao gồm chi phí phát sinh khác
        </Typography>
      </CardContent>
      
      {/* Horizontal line */}
      <Box
        sx={{
          position: 'absolute',
          left: '10px',
          right: '10px',
         
          height: '2px',
          backgroundColor: 'black',
          top: 'calc(64px + 48px)', // Adjust based on CardHeader height and TableHead height
        }}
      />
    </Card>
  );
};

export default OrderConfirmation;