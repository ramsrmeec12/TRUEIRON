import { useParams } from 'react-router-dom';
import { products } from '../data';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id.toString() === id);
  const { cartItems, addToCart } = useCart();

  const [isVisible, setIsVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    setIsVisible(false);
    setSelectedColor(null); // reset color on product change
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 50);
    return () => clearTimeout(timeout);
  }, [id]);

  const isInCart = cartItems.some(item => item.id === product?.id);

  if (!product) return <div className="p-6 text-center">Product not found.</div>;

  return (
    <div
      className={`p-6 flex flex-col md:flex-row gap-6
        rounded-lg border shadow-md
        transition-shadow duration-300
        hover:shadow-xl
        `}
    >
      <div
        className={`w-full md:w-1/2 flex justify-center
          transition-all duration-700 ease-in-out
          transform
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
        `}
      >
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-[400px] object-contain rounded"
        />
      </div>

      <div
        className={`w-full md:w-1/2
          transition-all duration-700 ease-in-out
          transform
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
        `}
      >
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-1">Category: {product.category}</p>
        <p className="text-gray-700 mb-4">Subcategory: {product.subcategory}</p>
        <p className="text-gray-600 mb-4">{product.description || 'No description available.'}</p>
        <p className="text-gray-600 mb-4">SKU: {product.sku || 'N/A'}</p>
        <p className="text-gray-600 mb-4">Specification: {product.specification}</p>
        <p className="text-gray-600 mb-4">Muscles Worked: {product.muscle}</p>

        {/* Color selection - show only if colorOptions exist */}
        {product.colorOptions?.length > 0 && (
          <div className="mb-4">
            <p className="font-medium mb-2">Color Options Available:</p>
            <div className="flex gap-3">
              {product.colorOptions.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 border-gray-400 
                    ${selectedColor === color ? 'ring-2 ring-black' : ''}
                  `}
                  style={{
                    background: color === 'Choose Own Color'
                      ? 'linear-gradient(45deg, red, yellow, gray)'
                      : color
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => addToCart({ ...product, selectedColor: selectedColor || 'nil' })}
          disabled={isInCart}
          className={`px-6 py-2 rounded transition transform
            ${
              isInCart
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white hover:scale-105'
            }
            duration-300 ease-in-out
          `}
        >
          {isInCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
