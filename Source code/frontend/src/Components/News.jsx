import React from 'react';

function News() {
  const newsItems = [
    {
      title: 'Quá trình chăm sóc những chú cá',
      image: 'img/tin-1.png', // Replace with the correct image path
    },
    {
      title: 'Cuộc thi sắc đẹp cá koi do trung tâm tổ chức',
      image: 'img/tin-1-2.png', // Replace with the correct image path
    },
    {
      title: 'Cùng chiêm ngưỡng những ca bệnh đã chữa khỏi tại trung tâm',
      image: 'img/image.png', // Replace with the correct image path
    },
    {
      title: 'Cơ sở mới của trung tâm mới khai trương nhiều ưu đãi hấp dẫn',
      image: 'img/group-25.png', // Replace with the correct image path
    },
  ];

  return (
    <div id="news" className="bg-blue-50 py-8">
      <h2 className="text-center text-3xl font-bold mb-8">TIN TỨC</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {newsItems.map((item, index) => (
          <div key={index} className="relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-60 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-end p-4">
              <span className="text-white text-lg font-semibold">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default  News;
