import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import auth from '../config';

export default function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some(item => item.id === product.id);

  const [admin, setAdmin] = useState(false);
  const [clients, setClients] = useState([]);
  const [showClientMenu, setShowClientMenu] = useState(false);

  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    ); 
    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user && user.uid === 'W8mdeLQYrZfbugze4YTIgdyuFPY2') {
        setAdmin(true);
        const storedClients = JSON.parse(localStorage.getItem('clients') || '[]');
        setClients(storedClients);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAddToClient = (clientId) => {
    const storedClients = JSON.parse(localStorage.getItem('clients') || '[]');
    const updatedClients = storedClients.map(client => {
      if (client.id === clientId) {
        const alreadyInCart = client.items.some(item => item.id === product.id);
        if (!alreadyInCart) {
          return {
            ...client,
            items: [
              ...client.items,
              {
                id: product.id,
                name: product.name,
                sku: product.sku || 'N/A',
                quantity: 1,
                originalPrice: product.originalPrice || product.price || 0,
                discountedPrice: product.discountedPrice || product.price || 0,
                image: product.image || '/default-custom.webp',
                selectedColor: selectedColor || 'N/A'
              }
            ]
          };
        }
      }
      return client;
    });
    localStorage.setItem('clients', JSON.stringify(updatedClients));
    setClients(updatedClients);
    setShowClientMenu(false);
  };

  const getColorClass = (color) => {
    const base = 'h-5 w-5 rounded-full border-2 cursor-pointer';
    const colorMap = {
      red: 'bg-red-500 border-red-700',
      yellow: 'bg-yellow-400 border-yellow-600',
      gray: 'bg-gray-500 border-gray-700',
      multicolor: 'bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 border-gray-600'
    };
    return `${base} ${colorMap[color] || 'bg-gray-300 border-gray-400'}`;
  };

  return (
    <div
      ref={cardRef}
      className={`w-80 border rounded-lg shadow p-4 flex flex-col items-center bg-white transition-transform transition-opacity duration-700 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        hover:scale-105 hover:shadow-2xl hover:z-10 cursor-pointer
      `}
      style={{ willChange: 'transform, opacity' }}
    >
      <Link to={`/product/${product.id}`} className="w-full">
        <div className="w-72 h-56 flex justify-center items-center rounded mb-3 relative">
          {!imageLoaded && !imageError && (
            <span className="text-gray-500 text-sm absolute">Loading image...</span>
          )}
          {imageError && (
            <img
              src="/fallback.jpg"
              alt="Fallback"
              className="max-h-full max-w-full object-contain"
            />
          )}
          {!imageError && (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`max-h-full max-w-full object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
        </div>

        <h2 className="text-lg font-semibold text-center">{product.name}</h2>
        <p className="text-sm text-gray-600 text-center">
          {product.category} - {product.subcategory}
        </p>
      </Link>

      {product.colorOptions?.length > 0 && (
        <div className="flex gap-2 mt-3">
          {product.colorOptions.map((color, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedColor(color)}
              className={`${getColorClass(color)} ${selectedColor === color ? 'ring-2 ring-offset-1 ring-black' : ''}`}
              title={color}
            ></div>
          ))}
        </div>
      )}

      {!admin ? (
        <button
          onClick={() => addToCart({ ...product, selectedColor: selectedColor || 'nil' })}
          className={`px-4 py-2 mt-4 rounded transition ${isInCart
            ? 'bg-gray-400 cursor-not-allowed text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
          disabled={isInCart}
        >
          {isInCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      ) : (
        <div className="relative mt-4 w-full flex flex-col items-center">
          <button
            onClick={() => setShowClientMenu(prev => !prev)}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 w-full"
          >
            Add to Client
          </button>
          {showClientMenu && (
            <div className="absolute top-12 w-full z-20 bg-white border shadow-lg rounded">
              {clients.length === 0 ? (
                <div className="p-2 text-center text-sm text-gray-500">No clients</div>
              ) : (
                clients.map((client, index) => (
                  <button
                    key={client.id}
                    onClick={() => handleAddToClient(client.id)}
                    disabled={client.items.some(i => i.id === product.id)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${client.items.some(i => i.id === product.id) ? 'text-gray-400 cursor-not-allowed' : 'text-black'}`}
                  >
                    Client {index + 1} - {client.name || 'Unnamed'}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
