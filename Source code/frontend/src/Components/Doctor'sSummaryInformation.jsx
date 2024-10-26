import React from 'react';
import { Card, CardContent, Avatar,Button } from '@mui/material';
// useEffect(() => {
//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get('/api/doctors');
//       setDoctors(response.data);
//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//     }
//   };

//   fetchDoctors();
// }, []); 


const DoctorList = ({ onSelectDoctor  , doctors}) => {

  return (
    <div style={{ width: '55vw', maxHeight: '400px', overflowY: 'auto',boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: 10 }}>
      {doctors.map((doctor, index) => (
        <Card key={index} style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '5px',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.25)',
          borderRadius: 10
        }}>
          <Avatar style={{
            background: 'linear-gradient(136deg, rgba(100, 176, 223, 0.50) 25%, rgba(25, 200, 254, 0.38) 75%)',
            margin: "20px"
          }} />
          <CardContent style={{ flexGrow: 1, padding: '16px' }}>
            <h3 style={{ fontWeight: '600', fontSize: '24px' }}>{doctor.firstName + " " + doctor.lastName}</h3>
            <p style={{ fontSize: '1.3vw' }}>Lịch khám: {doctor.schedule}</p>
          </CardContent>
          <Button 
            onClick={() => onSelectDoctor(doctor)} 
            style={{
              marginRight: '16px',
              backgroundColor: '#3b82f6',
              color: '#fff',
              fontWeight: 'bold',
              padding: '8px 16px',
              borderRadius: '5px',
            }}
          >
            Chọn
          </Button>

        </Card>
      ))}
    </div>
  );
};


export default DoctorList;

