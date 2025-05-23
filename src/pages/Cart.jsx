import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const whatsappNumber = '919025416751';

  const message =
  `Hi, I would like to enquire about the following products:\n\n` +
  cartItems
    .map(item => `✅ ${item.name} (SKU: ${item.sku}) - ₹${item.price}`)
    .join('\n');

  const handleSubmit = () => {
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  const [removingId, setRemovingId] = useState(null);

  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
    }, 300); // Match this with the transition duration
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 font-bold animate-fade-in">🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">No items added.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div
              key={item.id}
              className={`flex justify-between items-center border p-2 rounded transition-all duration-300 ease-in-out transform 
                ${removingId === item.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
                bg-white shadow hover:shadow-md`}
            >
              <Link
                to={`/product/${item.id}`}
                className="flex flex-1 items-center space-x-4 hover:bg-gray-50 rounded p-2 transition"
              >
                <img src={item.image} alt={item.name} className="h-16 rounded" />
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                  <p className="text-green-700 font-medium">Customisable as per requirement</p>
                </div>
              </Link>

              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 ml-4 hover:text-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="mt-6 bg-black hover:bg-red-600 text-white px-6 py-3 rounded shadow-md transition-transform transform hover:scale-105"
          >
            Submit Order via WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
