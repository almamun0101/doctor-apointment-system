import React from "react";
import Slider from "react-slick";

// Import slick styles (very important)
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";



function Responsive( {items}) {
  const companies =items;
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {companies.map((c, i) => (
          <div
            key={i}
            className="flex items-center justify-center p-4"
          >
            <img
              src={`${c.name}.png`}
              alt={c.name}
              className="h-12 object-contain"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Responsive;
