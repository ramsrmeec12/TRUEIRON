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

  const [customName, setCustomName] = useState('');
  const [customSku, setCustomSku] = useState('');
  const [customQty, setCustomQty] = useState(1);
  const [customPrice, setCustomPrice] = useState(0);
  const [customImage, setCustomImage] = useState(null);

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

  const handleImageUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCustomImage(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleAddCustomProduct = () => {
    if (!customName || customQty < 1) {
      alert('Please enter at least a name and valid quantity');
      return;
    }

    const newCustomItem = {
      id: Date.now().toString(),
      name: customName,
      sku: customSku || 'N/A',
      quantity: customQty,
      price: customPrice,
      image: customImage || '/default-custom.webp',
      selectedColor: 'N/A',
    };

    setEditableItems(prev => [...prev, newCustomItem]);

    // Clear inputs
    setCustomName('');
    setCustomSku('');
    setCustomQty(1);
    setCustomPrice(0);
    setCustomImage(null);
  };

  const handleSubmit = () => {
    const message = `Hi, I would like to enquire about the following products:\n\n` +
      cartItems
        .map((item, i) => `${i + 1}. ${item.name} (SKU: ${item.sku}). Color: ${item.selectedColor}`)
        .join('\n');

    const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(link, '_blank');
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
      <h2 className="text-2xl mb-4 font-bold">🛒 Your Cart</h2>

      {dataSource.length === 0 ? (
        <p className="text-gray-500">No items added.</p>
      ) : (
        <div className="space-y-4">
          {dataSource.map(item => (
            <div
              key={item.id}
              className={`flex flex-col md:flex-row justify-between items-start border p-4 rounded transition-all duration-300 ease-in-out transform 
              ${removingId === item.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} 
              bg-white shadow`}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                </div>
              </div>

              <div className="mt-2 flex flex-col gap-1 ml-4">
                <p>Color: {item.selectedColor}</p>

                {admin && (
                  <div className="flex gap-4 mt-2">
                    <label>
                      Qty:
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={e => handleQuantityChange(item.id, e.target.value)}
                        className="ml-1 border p-1 w-16"
                      />
                    </label>
                    <label>
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
                className="text-red-500 mt-2 md:mt-0 md:ml-4 hover:text-red-700"
              >
                Remove
              </button>

            </div>
          ))}

          {admin && (
            <>
              <div className="mt-8 border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Add Custom Product</h3>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={customName}
                    onChange={e => setCustomName(e.target.value)}
                    className="border px-3 py-2 rounded w-full md:w-1/4"
                  />
                  <input
                    type="text"
                    placeholder="SKU (Optional)"
                    value={customSku}
                    onChange={e => setCustomSku(e.target.value)}
                    className="border px-3 py-2 rounded w-full md:w-1/4"
                  />
                  <input
                    type="number"
                    placeholder="Qty"
                    min="1"
                    value={customQty}
                    onChange={e => setCustomQty(Number(e.target.value))}
                    className="border px-3 py-2 rounded w-full md:w-1/6"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    min="0"
                    step="0.01"
                    value={customPrice}
                    onChange={e => setCustomPrice(Number(e.target.value))}
                    className="border px-3 py-2 rounded w-full md:w-1/6"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="border px-3 py-2 rounded w-full md:w-1/4"
                  />
                  <button
                    onClick={handleAddCustomProduct}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </div>

              <button
                onClick={() => generateQuotationPDF(editableItems)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Download Quotation PDF
              </button>
            </>
          )}

          <button
            onClick={handleSubmit}
            className="mt-6 bg-black hover:bg-red-600 text-white px-6 py-3 rounded shadow-md"
          >
            Submit Order via WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
