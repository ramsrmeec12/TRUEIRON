import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // <-- Import Link
import cardio1 from '../assets/commercial/cardio/Treadmills/Treadmill1.jpg'
import Chest1 from '../assets/commercial/Strength/Chest/Chest1.jpg'


const products = [
  { id: 1, img: cardio1, desc: 'Treadmill', sku: 'SKU001' },
  { id: 1, img: Chest1, desc: 'Chest', sku: 'SKU001' },
  { id: 1, img: cardio1, desc: 'Product 1', sku: 'SKU001' },
  { id: 1, img: Chest1, desc: 'Product 1', sku: 'SKU001' },
  { id: 1, img: cardio1, desc: 'Product 1', sku: 'SKU001' },
  { id: 1, img: Chest1, desc: 'Product 1', sku: 'SKU001' },]
  

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
            to={'/commercial'} // <-- Navigate to commercial detail page
            className="border rounded shadow p-4 flex flex-col items-center hover:shadow-lg transition cursor-pointer"
          >
            <img src={product.img} alt={product.desc} className="h-40 object-cover mb-4" />
            <p className="font-medium">{product.desc}</p>
            <p className="text-sm text-gray-500 mb-2">SKU: {product.sku}</p>
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
