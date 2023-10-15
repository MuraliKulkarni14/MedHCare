import React from 'react';

import "./styles/Slider.css"

const CarouselImage = ({ text }) => {
  return (
    <img
      src={`/images/${text}.jpg`}
      alt={text}
      className='image-container'
    />
  );
}

export default CarouselImage;
