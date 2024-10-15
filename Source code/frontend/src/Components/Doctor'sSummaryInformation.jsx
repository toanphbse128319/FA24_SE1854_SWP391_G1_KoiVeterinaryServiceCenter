import React from 'react';
import { Card, CardContent, Avatar } from '@mui/material';

const doctors = [
  {
    name: "Nguyễn Văn A",
    degree: "Thạc sĩ",
    schedule: "Thứ 2, 5"
  },
  {
    name: "Nguyễn Văn B",
    degree: "Thạc sĩ",
    schedule: "Thứ 2, 5"
  },
  {
    name: "Nguyễn Văn C",
    degree: "Thạc sĩ",
    schedule: "Thứ 2, 5"
  }
];

const DoctorSchedule = () => {
  return (
    <div style={{width:'30vw'}}>
      {doctors.map((doctor, index) => (
        <Card key={index} style={{
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
        borderRadius: 10
        }}>
          <Avatar style={{background: 'linear-gradient(136deg, rgba(100.04, 176.47, 223.98, 0.50) 25%, rgba(25, 200, 254, 0.38) 75%)',
                         margin:"20px"}} />
                    <CardContent style={{ flexGrow: 1, padding: '16px' }}>
                        <h3 style={{ fontWeight: '600' ,fontSize:24}}>{doctor.name}</h3>
                            <p style={{ fontSize: '1.3vw' }}>Lịch khám: {doctor.schedule}</p>
                    </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DoctorSchedule;