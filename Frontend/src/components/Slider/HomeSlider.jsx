import React from "react";
import "../../styles/components/HomeSlider.scss";

import img1 from '../../assets/SliderImg/img1.jpg'
import img2 from '../../assets/SliderImg/img2.jpg'
import img3 from '../../assets/SliderImg/img3.jpg'
import img4 from '../../assets/SliderImg/img4.jpg'
import img5 from '../../assets/SliderImg/img5.jpg'
import img6 from '../../assets/SliderImg/img6.jpg'
import img7 from '../../assets/SliderImg/img7.jpg'
import img8 from '../../assets/SliderImg/img8.jpg'
import img9 from '../../assets/SliderImg/img9.jpg'
import img10 from '../../assets/SliderImg/img10.jpg'

// const images = [
//   "/images/img1.jpg",
//   "/images/img2.jpg",
//   "/images/img3.jpg",
//   "/images/img4.jpg",
//   "/images/img5.jpg",
//   "/images/img6.jpg",
// ];

export default function HomeSlider() {
  return (
    <div className="slider">
        <p>Popular Movies & TV Shows</p>
      <div className="slider-track">
        {/* {images.concat(images).map((img, index) => (
          <img key={index} src={img} alt={`Slide ${index + 1}`} />
        ))} */}
        <img src={img1} alt="Slide 1"/>
        <img src={img2} alt="Slide 2" />
        <img src={img3} alt="Slide 3" />
        <img src={img4} alt="Slide 4" />
        <img src={img5} alt="Slide 5" />
        <img src={img6} alt="Slide 6" />
        <img src={img7} alt="Slide 7" />
        <img src={img8} alt="Slide 8" />
        <img src={img9} alt="Slide 9" />
        <img src={img10} alt="Slide 10" />
      </div>
    </div>
  );
}
