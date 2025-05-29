import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { generateQuotationPDF } from './generatePDF';
import auth from '../config';

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const whatsappNumber = '916385706756';
  const [admin, setAdmin] = useState(false);
  const [editableItems, setEditableItems] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user && user.uid === 'W8mdeLQYrZfbugze4YTIgdyuFPY2') {
        setAdmin(true);
        setEditableItems(
          cartItems.map(item => ({
            ...item,
            quantity: item.quantity || 1,
            price: item.price || 0,
          }))
        );
      } else {
        setAdmin(false);
      }
    });
  }, [cartItems]);

  const handleQuantityChange = (id, value) => {
    setEditableItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: parseInt(value) || 1 } : item
      )
    );
  };

  const handlePriceChange = (id, value) => {
    setEditableItems(items =>
      items.map(item =>
        item.id === id ? { ...item, price: parseFloat(value) || 0 } : item
      )
    );
  };

  const message =
    `Hi, I would like to enquire about the following products:\n\n` +
    cartItems
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} (SKU: ${item.sku}). (Color: ${item.selectedColor})`
      )
      .join('\n');

  const handleSubmit = () => {
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  const [removingId, setRemovingId] = useState(null);

  const handleRemove = id => {
    setRemovingId(id);
    setTimeout(() => {
      removeFromCart(id);
      setRemovingId(null);
    }, 300);
  };

  const dataSource = admin ? editableItems : cartItems;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4 font-bold animate-fade-in">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">No items added.</p>
      ) : (
        <div className="space-y-4">
          {dataSource.map(item => (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row justify-between items-start border p-4 rounded transition-all duration-300 ease-in-out transform 
                ${removingId === item.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
                bg-white shadow hover:shadow-md`}
            >
              
              <Link
                to={`/product/${item.id}`}
                className="flex items-center space-x-4 hover:bg-gray-50 rounded p-2 transition"
              >
                <img src={item.image} alt={item.name} className="h-16 rounded" />
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                </div>
              </Link>

              <div className="mt-2 flex flex-col gap-1 ml-4">
                <p>Color: {item.selectedColor}</p>
                <p className="text-green-700 font-medium">Customisable as per requirement</p>

                {admin && (
                  <div className="flex gap-4 mt-2">
                    <label className="text-sm">
                      Qty:
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => handleQuantityChange(item.id, e.target.value)}
                        className="ml-1 border p-1 w-16"
                      />
                    </label>
                    <label className="text-sm">
                      Price:
                      <input
                        type="number"
                        value={item.price}
                        onChange={e => handlePriceChange(item.id, e.target.value)}
                        className="ml-1 border p-1 w-24"
                      />
                    </label>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-500 mt-2 md:mt-0 md:ml-4 hover:text-red-700 transition"
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

          {admin && (
            <button
              onClick={() => generateQuotationPDF(editableItems)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Download Quotation PDF
            </button>
          )}
        </div>
      )}
    </div>
  );
}
