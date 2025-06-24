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
  const [customOriginalPrice, setCustomOriginalPrice] = useState(0);
  const [customDiscountedPrice, setCustomDiscountedPrice] = useState(0);
  const [customImage, setCustomImage] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user && user.uid === 'W8mdeLQYrZfbugze4YTIgdyuFPY2') {
        setAdmin(true);

        const savedCustomItems = localStorage.getItem('customItems');
        const parsed = savedCustomItems ? JSON.parse(savedCustomItems) : [];

        const combinedItems = cartItems.map(item => {
          const saved = parsed.find(savedItem => savedItem.id === item.id);
          return {
            ...item,
            quantity: saved?.quantity ?? item.quantity ?? 1,
            originalPrice: saved?.originalPrice ?? item.originalPrice ?? item.price ?? 0,
            discountedPrice: saved?.discountedPrice ?? item.discountedPrice ?? item.price ?? 0,
            name: saved?.name ?? item.name,
            image: saved?.image ?? item.image,
          };
        });

        const customOnly = parsed.filter(item =>
          !cartItems.some(cartItem => cartItem.id === item.id)
        );

        setEditableItems([...combinedItems, ...customOnly]);
      } else {
        setAdmin(false);
      }
    });
  }, [cartItems]);

  useEffect(() => {
    if (admin) {
      try {
        localStorage.setItem('customItems', JSON.stringify(editableItems));
      } catch (err) {
        console.error('Could not save custom items:', err);
      }
    }
  }, [editableItems, admin]);

  const handleQuantityChange = (id, value) => {
    setEditableItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: parseInt(value) || 1 } : item
      )
    );
  };

  const handleOriginalPriceChange = (id, value) => {
    setEditableItems(items =>
      items.map(item =>
        item.id === id ? { ...item, originalPrice: parseFloat(value) || 0 } : item
      )
    );
  };

  const handleDiscountedPriceChange = (id, value) => {
    setEditableItems(items =>
      items.map(item =>
        item.id === id ? { ...item, discountedPrice: parseFloat(value) || 0 } : item
      )
    );
  };

  const handleNameChange = (id, value) => {
    setEditableItems(items =>
      items.map(item =>
        item.id === id ? { ...item, name: value } : item
      )
    );
  };

  const handleImageChange = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditableItems(items =>
        items.map(item =>
          item.id === id ? { ...item, image: reader.result } : item
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      alert('Please upload an image less than 5MB. Compress it here: https://imageresizer.com/image-compressor');
      return;
    }
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
      originalPrice: customOriginalPrice,
      discountedPrice: customDiscountedPrice,
      image: customImage || '/default-custom.webp',
      selectedColor: 'N/A',
    };

    setEditableItems(prev => [...prev, newCustomItem]);
    setCustomName('');
    setCustomSku('');
    setCustomQty(1);
    setCustomOriginalPrice(0);
    setCustomDiscountedPrice(0);
    setCustomImage(null);
  };

  const handleSubmit = () => {
    const message = `Hi, I would like to enquire about the following products:\n\n` +
      editableItems
        .map((item, i) => `${i + 1}. ${item.name} (SKU: ${item.sku}). Color: ${item.selectedColor}`)
        .join('\n');

    const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(link, '_blank');
  };

  const [removingId, setRemovingId] = useState(null);
  const handleRemove = id => {
    setRemovingId(id);
    setTimeout(() => {
      setEditableItems(prev => prev.filter(item => item.id !== id));
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
                  src={item.image || '/default-custom.webp'}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded"
                />
                <div>
                  {admin ? (
                    <input
                      type="text"
                      value={item.name}
                      onChange={e => handleNameChange(item.id, e.target.value)}
                      className="font-semibold border-b focus:outline-none"
                    />
                  ) : (
                    <p className="font-semibold">{item.name}</p>
                  )}
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
                      Original:
                      <input
                        type="number"
                        value={item.originalPrice}
                        onChange={e => handleOriginalPriceChange(item.id, e.target.value)}
                        className="ml-1 border p-1 w-20"
                      />
                    </label>
                    <label>
                      Discounted:
                      <input
                        type="number"
                        value={item.discountedPrice}
                        onChange={e => handleDiscountedPriceChange(item.id, e.target.value)}
                        className="ml-1 border p-1 w-20"
                      />
                    </label>
                    <label>
                      Change Image:
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleImageChange(item.id, e)}
                        className="ml-1"
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
                  <input type="text" placeholder="Product Name" value={customName} onChange={e => setCustomName(e.target.value)} className="border px-3 py-2 rounded w-full md:w-1/4" />
                  <input type="text" placeholder="SKU (Optional)" value={customSku} onChange={e => setCustomSku(e.target.value)} className="border px-3 py-2 rounded w-full md:w-1/4" />
                  <input type="number" placeholder="Qty" min="1" value={customQty} onChange={e => setCustomQty(Number(e.target.value))} className="border px-3 py-2 rounded w-full md:w-1/6" />
                  <input type="number" placeholder="Original Price" min="0" value={customOriginalPrice} onChange={e => setCustomOriginalPrice(Number(e.target.value))} className="border px-3 py-2 rounded w-full md:w-1/6" />
                  <input type="number" placeholder="Discounted Price" min="0" value={customDiscountedPrice} onChange={e => setCustomDiscountedPrice(Number(e.target.value))} className="border px-3 py-2 rounded w-full md:w-1/6" />
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="border px-3 py-2 rounded w-full md:w-1/4" />
                  <button onClick={handleAddCustomProduct} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add</button>
                </div>
              </div>

              <button onClick={() => generateQuotationPDF(editableItems)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
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
