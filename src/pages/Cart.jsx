import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const whatsappNumber = '919025416751';

  const message = cartItems.map(item =>
    `✅ ${item.name} (SKU: ${item.sku}) - ₹${item.price}`
  ).join('\n');

  const handleSubmit = () => {
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 font-bold">🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items added.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center border p-2 rounded">
              {/* Wrap in Link */}
              <Link to={`/product/${item.id}`} className='flex flex-1 items-center space-x-4 hover:bg-gray-100 rounded p-2 transition'>
                <img src={item.image} alt={item.name} className='h-16' />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm">SKU: {item.sku}</p>
                  <p>₹{item.price}</p>
                </div>
              </Link>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 ml-4"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="mt-6 bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit Order via WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
