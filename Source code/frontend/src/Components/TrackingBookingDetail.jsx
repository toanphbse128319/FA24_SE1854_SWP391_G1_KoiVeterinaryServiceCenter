import React from 'react';
import { Card, CardHeader, CardContent, Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

const InfoCard = ({ serviceDeliveryMethod, service, employee }) => {
   

    const hasData = serviceDeliveryMethod || service || employee;

    if (!hasData) return null;
    console.log(employee);

    return (

        <Card sx={{ maxWidth: '250px', width: '30vw', marginTop:'0vh',borderRadius: "10px",  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', }}>

            <CardHeader
                title="Thông tin"
                titleTypographyProps={{ fontWeight: 700 }}
                sx={{
                    textAlign: 'center',
                    fontWeight: '700',
                    background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)',
                    color: 'white',
                }}
            />
            <CardContent>
                {serviceDeliveryMethod && (
                    <Box sx={{ display: 'flex', marginBottom: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: '700', width: 100, flexShrink: 0 }}>
                            Nơi khám:
                        </Typography>
                        <Typography variant="body1">{serviceDeliveryMethod}</Typography>
                    </Box>
                )}
                {service && (
                    <Box sx={{ display: 'flex', marginBottom: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', width: 100, flexShrink: 0 }}>
                            Dịch vụ:
                        </Typography>
                        <Typography variant="body1">{service}</Typography>
                    </Box>
                )}
                {employee && (
                    <Box sx={{ display: 'flex', marginBottom: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', width: 100, flexShrink: 0 }}>
                            Bác sĩ:
                        </Typography>
                        <Typography variant="body1">{employee}</Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};





const TrackingBookingDetail = ({ service, employee, serviceDeliveryMethod }) => {
    return (
        <InfoCard
            serviceDeliveryMethod={serviceDeliveryMethod}
            service={service}
            employee={employee}
        />
    );
};


// const handleBack = () => {
   
//     navigate('/booking', { state:  state: { 
//         employee: 'Dr. Nguyễn Văn A', 
//         serviceDeliveryMethod: 'Trực tuyến',
//         service: 'Tư vấn trực tuyến'
//       } });
//   };

export default TrackingBookingDetail;
