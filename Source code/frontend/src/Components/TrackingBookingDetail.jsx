import React from 'react';
import { Card, CardHeader, CardContent, Typography, Box } from '@mui/material';

// Dữ liệu bác sĩ
const doctors = [
    {
        name: "Dr. Nguyễn Văn A",
        schedule: [
            { day: "Thứ Ba" },
            { day: "Thứ Tư" }
        ]
    },
    {
        name: "Dr. Trần Thị B",
        schedule: [
            { day: "Thứ Ba" },
            { day: "Thứ Năm" }
        ]
    },
    {
        name: "Dr. Lê Văn C",
        schedule: [
            { day: "Thứ Sáu" },
            { day: "Thứ Bảy" }
        ]
    }
];

const DoctorSchedule = () => {
    return (
        <div>
            {doctors.map((doctor, index) => {
             
                const days = doctor.schedule.map(s => s.day).join(', ');

                return (
                    <Card key={index} sx={{ display: 'flex', marginBottom: 2 , background: 'linear-gradient(136deg, rgba(100.04, 176.47, 223.98, 0.50) 25%, rgba(25, 200, 254, 0.38) 75%)'}}>
                        <Box sx={{ width: '50px', height: '50px', marginRight: 2,border:"Background" }}>
                            <img 
                                src="path/to/image.jpg" // Thay đổi đường dẫn tới ảnh bác sĩ
                                alt={doctor.name}
                                style={{ width: '100%', height: '100%', borderRadius: '50%' }} 
                            />
                        </Box>
                        <CardContent>
                            <CardHeader title={doctor.name} />
                            <Typography variant="body2">Lịch khám: {days}</Typography>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};

export default DoctorSchedule;