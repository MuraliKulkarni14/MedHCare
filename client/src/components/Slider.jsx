import React, {useState} from "react";
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImage';

const Slider = ({ images, captions }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
    <div className='slider'>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {images.map((image, i) => (
        <Carousel.Item key={i}>
          <CarouselImage text={image.text} />
          <Carousel.Caption>
            <h1>{captions[i].title}</h1>
            <h3>{captions[i].description}</h3>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
    </div>
    </>
  );
}

export default Slider;
