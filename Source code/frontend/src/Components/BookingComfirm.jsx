import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const OrderConfirmation = ({ service, doctor, time, scheduleId, fishCount, movingCost }) => {
  // Kiểm tra service trước khi sử dụng
  if (!service) {
    return (
      <Card className="max-w-4xl mt-4">
        <CardContent>
          <Typography>Không tìm thấy thông tin dịch vụ</Typography>
        </CardContent>
      </Card>
    );
  }

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [timeSlot, dateStr] = timeString.split(' ');
    return (
      <div className="flex flex-col">
        <span>{timeSlot}</span>
        <span>{dateStr}</span>
      </div>
    );
  };

  const calculateTotal = () => {
    const servicePrice = service?.price || 0;
    const moving = movingCost || 0;
    return servicePrice + moving;
  };

  const getColumns = () => {
    // Khởi tạo columns với các giá trị mặc định và kiểm tra null safety
    const columns = [
      { 
        key: 'format', 
        label: 'Hình thức', 
        value: service?.serviceDeliveryMethod || 'Chưa xác định'
      },
      { 
        key: 'service', 
        label: 'Dịch vụ', 
        value: service?.name || 'Chưa xác định'
      },
      { 
        key: 'fishCount', 
        label: 'Số cá', 
        value: fishCount || 0
      }, 
    ];

    if (doctor) {
        console.log( doctor );
      columns.push({ 
        key: 'doctor', 
        label: 'Bác sĩ', 
        value: doctor.FirstName + " " + doctor.LastName 
      });
    }

    if (time) {
      columns.push({ 
        key: 'time', 
        label: 'Thời gian', 
        value: time,
        isTime: true 
      });
    }

    if (movingCost) {
      columns.push({ 
        key: 'movingCost', 
        label: 'Phí di chuyển', 
        value: movingCost 
      });
    }

    // Thêm các cột tính tiền với kiểm tra null safety
    columns.push(
      { 
        key: 'service-fee', 
        label: 'Phí dịch vụ', 
        value: service?.price || 0
      },
      { 
        key: 'total', 
        label: 'Tổng tiền', 
        value: calculateTotal()
      }
    );

    return columns;
  };

  return (
    <Card 
    
      style={{
        width:'60vw',
        fontWeight: '625',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
      }}
    >
      <CardHeader 
        style={{
          background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)',
          color: 'white',
        }}
        title={
          <Typography variant="h6" component="div" color="inherit" fontWeight='700'>
            Xác nhận thông tin đơn hàng
          </Typography>
        }
      />
      <CardContent>
        <div>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {getColumns().map((column) => (
                  <th key={column.key} className="text-left p-2">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {getColumns().map((column) => (
                  <td key={column.key} className="p-2">
                    {column.isTime ? (
                      formatTime(column.value)
                    ) : column.key.includes('fee') || column.key === 'total' || column.key === 'movingCost' ? (
                      `${Number(column.value).toLocaleString()} đ`
                    ) : (
                      column.value
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        
        <Typography variant="body2" className="text-gray-500 mt-4 pl-2">
          **Lưu ý: tiền dịch vụ tính trên 1 con, chưa bao gồm chi phí phát sinh khác
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrderConfirmation;
