// Banner.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import './Banner.css'; 
// Custom styles

const Banner = () => {
  const cards = Array.from({ length: 12 }, (_, i) => `Card ${i + 1}`);

  return (
    <div className="bg-black py-10">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={4}
        slidesPerGroup={4}
        loop={true}
        navigation={true}
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1, slidesPerGroup: 1 },
          640: { slidesPerView: 2, slidesPerGroup: 2 },
          1024: { slidesPerView: 3, slidesPerGroup: 3 },
          1280: { slidesPerView: 4, slidesPerGroup: 4 },
        }}
        className="max-w-7xl mx-auto"
      >
        {cards.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="h-64 bg-gradient-to-br from-red-700 to-yellow-500 text-white flex items-center justify-center rounded-xl text-2xl font-bold shadow-lg hover:scale-105 duration-300">
              {card}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
