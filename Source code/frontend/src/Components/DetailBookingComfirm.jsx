import React from 'react';
import { Card, CardHeader, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';

const OrderConfirmationFunction = ({ service, employee, ServiceDeliveryMethodID,numberOfFish,appointmentTime,priceService,movingCost,totalPrice }) => {
    

    return (
        <Card sx={{ maxWidth: '50vw', position: 'relative', borderRadius: '5px' }}>
            <CardHeader
                title="Xác nhận thông tin đơn hàng"
                sx={{
                    background: 'linear-gradient(90deg, #64B0E0 25%, rgba(35, 200, 254, 0.75) 75%)',
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
                                <TableCell>{serviceDeliveryMethod}</TableCell>
                                <TableCell>{service}</TableCell>
                                <TableCell>{employee}</TableCell>
                                <TableCell>{appointmentTime}</TableCell>
                                <TableCell>{priceService}</TableCell>
                                if(movingCost!=0 || movingCost != null)<TableCell>{movingCost}</TableCell> 
                                <TableCell>{orderDetails.totalAmount}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography variant="caption" sx={{ display: 'block', mt: 1, pl: 1, color: 'gray' }}>
                    **Lưu ý: tiền dịch vụ tính trên 1 con, chưa bao gồm chi phí phát sinh khác
                </Typography>
            </CardContent>


            <Box
                sx={{
                    position: 'absolute',
                    left: '20px',
                    right: '20px',
                    height: '1px',
                    backgroundColor: 'black',
                    top: 'calc(64px + 48px)', // Adjust based on CardHeader height and TableHead height
                }}
            />
        </Card>
    );
};


const orderDetails = {
    format: "trực tuyến",
    service: service?.name || "Tư vấn trực tuyến",
    doctor: doctor?.name || "Nguyễn Văn A",
    appointmentTime: "9:00-10:00 08/10/2024",
    serviceFee: 1000,
    totalAmount: 1000
};
OrderConfirmation
const OrderConfirmation = ({ service, employee, serviceDeliveryMethod,numberOfFish,appointmentTime,priceService,movingCost }) => {
    return (


        <OrderConfirmation 
            serviceDeliveryMethod={serviceDeliveryMethod}
            service={service}
            employee={employee}
            numberOfFish={numberOfFish}
            appointmentTime={appointmentTime}
            priceService={priceService}
            movingCost={movingCost}
        />


    );
};

    



export default OrderConfirmation;