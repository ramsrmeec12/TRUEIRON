import { useState } from 'react';
import prod1 from '../assets/Ourproducts/prod1.png';
import prod2 from '../assets/Ourproducts/prod2.png';
import prod3 from '../assets/Ourproducts/prod3.png';
import prod4 from '../assets/Ourproducts/prod4.png';
import prod5 from '../assets/Ourproducts/prod5.jpg';

const products = [
  { img: prod1, name: 'Treadmill', link: '' },
  { img: prod2, name: 'Treadmill', link: '' },
  { img: prod3, name: 'Cycle Machine', link: '' },
  { img: prod4, name: 'Dumbbell', link: '' },
  { img: prod5, name: 'Strength', link: '' },
];

function Ourproducts() {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = () => {
    if (isTransitioning || index + 3 >= products.length) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setIndex(prev => prev + 3);
      setIsTransitioning(false);
    }, 1000);
  };

  const handlePrev = () => {
    if (isTransitioning || index === 0) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setIndex(prev => Math.max(0, prev - 3));
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Our Products</h1>

      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrev} disabled={index === 0 || isTransitioning} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
          ←
        </button>
        <button onClick={handleNext} disabled={index + 3 >= products.length || isTransitioning} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">
          →
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 transition-opacity duration-500">
        {products.slice(index, index + 3).map((product, i) => (
          <a key={i} href={product.link} className="text-center block">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-auto rounded shadow hover:scale-105 transition-transform duration-300"
            />
            <p className="mt-4 text-lg font-medium">{product.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Ourproducts;
