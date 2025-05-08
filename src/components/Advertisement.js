import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import adimg1 from "../assets/adimg/adimg1.jpg";
import adimg2 from "../assets/adimg/adimg2.jpg";
import adimg3 from '../assets/adimg/adimg3.jpg'

const images = [adimg1, adimg2, adimg3];

function Advertisement() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        src={images[currentIndex]}
        alt="Advertisement"
        className="w-full h-auto object-cover transition-all duration-500"
      />
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
      >
        <FaArrowRight />
      </button>
    </div>
  );
}

export default Advertisement;
