import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // <-- Import Link

import prod1 from '../assets/commercial/cardio/Treadmills/Treadmill1.jpg'
import prod2 from '../assets/commercial/Strength/Chest/Chest1.jpg'
import prod3 from '../assets/commercial/Strength/Back/Back18.png'
import prod4 from '../assets/commercial/Strength/Shoulder/Shoulder1.png'
import prod5 from '../assets/commercial/Strength/Legs/Leg2.png'
import prod6 from '../assets/commercial/Strength/Arms/Arms8.png'

const products = [
  { id: 1, img: prod1, desc: 'Treadmill', sku: 'SKU001', subcategory: 'Treadmills' },
  { id: 2, img: prod2, desc: 'Chest', sku: 'SKU002', subcategory: 'Chest' },
  { id: 3, img: prod3, desc: 'Back', sku: 'SKU003', subcategory: 'Back' },
  { id: 4, img: prod4, desc: 'Shoulder', sku: 'SKU004', subcategory: 'Shoulder' },
  { id: 5, img: prod5, desc: 'Leg', sku: 'SKU005', subcategory: 'Legs' },
  { id: 6, img: prod6, desc: 'Arms', sku: 'SKU006', subcategory: 'Arms' },
];


function Newarrival() {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 3) % products.length);
  };

  const prevSlide = () => {
    setStartIndex((prev) => (prev - 3 + products.length) % products.length);
  };

  const visibleProducts =
    products.slice(startIndex, startIndex + 3).length === 3
      ? products.slice(startIndex, startIndex + 3)
      : [...products.slice(startIndex), ...products.slice(0, (startIndex + 3) % products.length)];

  return (
    <div className="w-full max-w-6xl mx-auto py-8 relative">
      <h2 className="text-4xl font-bold mb-6 text-center">Our Products</h2>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow hover:bg-gray-700 z-10"
      >
        <FaArrowLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow hover:bg-gray-700 z-10"
      >
        <FaArrowRight />
      </button>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 transition-all duration-500">
        {visibleProducts.map((product) => (
          <Link
            key={product.id}
            to={`/commercial?subcategory=${encodeURIComponent(product.subcategory)}`}
            className="border rounded shadow p-4 flex flex-col items-center hover:shadow-lg transition cursor-pointer animate-fadeIn"
          >
            <img src={product.img} alt={product.desc} className="h-40 object-cover mb-4" />
            <p className="text-xl text-black mb-2">{product.desc}</p>
            
            <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
              View Product
            </button>
          </Link>


        ))}
      </div>
    </div>
  );
}

export default Newarrival;
