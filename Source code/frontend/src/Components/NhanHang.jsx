import React from 'react';
import { useNavigate } from 'react-router-dom';

function NhanHang() {
  
  const brands = [
    { name: 'My Koi', image: 'img/screenshot-2024-09-29-174738-1.png' },
    { name: 'Tetra', image: 'img/screenshot-2024-09-29-174659-1.png' },
    { name: 'Hikari', image: 'img/screenshot-2024-09-29-174413-1.png' },
    { name: 'API', image: 'img/screenshot-2024-09-29-174543-1.png' },
    { name: 'Microbe-Lift', image: 'img/screenshot-2024-09-29-174622-1.png' }
  ];

  return (
    <div className="bg-blue-50 py-10 " style={{ backgroundImage: "url('img/Slice3.png')" }}>
      <h2 className="text-center text-xl font-semibold mb-6 text-blue-600">
        Được tin tưởng hợp tác và đồng hành
      </h2>
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        {brands.map((brand, index) => (
          <div key={index} className="flex items-center justify-center">
            <img
              src={brand.image}
              alt={brand.name}
              className="h-20 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NhanHang;
