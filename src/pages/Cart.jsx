import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { generateQuotationPDF } from './generatePDF';
import { generateOrderPDF } from './generateOrderPDF';
import auth from '../config';

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const [admin, setAdmin] = useState(false);
  const [clients, setClients] = useState([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const whatsappNumber = '916385706756';

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user && user.uid === 'W8mdeLQYrZfbugze4YTIgdyuFPY2') {
        setAdmin(true);
        const savedClients = JSON.parse(localStorage.getItem('clients')) || [];
        setClients(savedClients);
      } else {
        setAdmin(false);
        setClients([{ id: 'default', name: '', phone: '', address: '', items: cartItems }]);
      }
    });
  }, [cartItems]);

  useEffect(() => {
    if (admin) {
      localStorage.setItem('clients', JSON.stringify(clients));
    }
  }, [clients, admin]);

  const handleAddClient = () => {
    const newClient = {
      id: Date.now().toString(),
      name: '',
      phone: '',
      address: '',
      items: []
    };
    setClients(prev => [...prev, newClient]);
  };

  const removeClient = (clientId, idx) => {
    if (window.confirm(`Are you sure you want to remove Client ${idx + 1}?`)) {
      setClients(prev => prev.filter(c => c.id !== clientId));
    }
  };

  const updateClient = (id, data) => {
    setClients(prev => prev.map(client => client.id === id ? { ...client, ...data } : client));
  };

  const updateClientItems = (id, items) => {
    setClients(prev => prev.map(client => client.id === id ? { ...client, items } : client));
  };

  const handleImageUpload = (e, clientId, itemId = null) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Image too large. Max 5MB.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setClients(prev => prev.map(client => {
        if (client.id !== clientId) return client;
        const items = client.items.map(item => item.id === itemId ? { ...item, image: reader.result } : item);
        return { ...client, items };
      }));
    };
    reader.readAsDataURL(file);
  };

  const addCustomProduct = (clientId, newItem) => {
    setClients(prev => prev.map(client => {
      if (client.id !== clientId) return client;
      return { ...client, items: [...client.items, newItem] };
    }));
  };

  const removeItem = (clientId, itemId) => {
    setClients(prev => prev.map(client => {
      if (client.id !== clientId) return client;
      return { ...client, items: client.items.filter(i => i.id !== itemId) };
    }));
    removeFromCart(itemId);
  };

  const sendWhatsApp = (client) => {
    const message = `Hi, I would like to enquire about the following products for ${client.name}:
\n` +
      client.items.map((item, i) => `${i + 1}. ${item.name} (SKU: ${item.sku || 'N/A'}), Qty: ${item.quantity}, Color: ${item.selectedColor}`).join('\n');
    const link = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(link, '_blank');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">🛒 Your Cart</h2>
        {admin && <button onClick={handleAddClient} className="bg-blue-600 text-white px-4 py-2 rounded">+ Add Client</button>}
      </div>

      {clients.length === 0 ? (
        <p className="text-gray-500">No clients added.</p>
      ) : (
        clients.map((client, idx) => (
          <div key={client.id} className="mb-8 border rounded p-4 shadow">
            <details open>
              <summary className="cursor-pointer font-semibold text-lg mb-2">
                {client.name ? `${client.name} (Client ${idx + 1})` : `Client ${idx + 1}`}
              </summary>

              {!admin ? (
                <div className="space-y-4">
                  {client.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center border p-4 rounded bg-white shadow">
                      <div className="flex items-center space-x-4">
                        <img src={item.image || '/default-custom.webp'} alt={item.name} className="h-16 w-16 object-cover rounded" />
                        <p className="font-semibold">{item.name}</p>
                        <p></p>
                      </div>
                      <button onClick={() => removeItem(client.id, item.id)} className="text-red-500 hover:text-red-700">Remove</button>
                    </div>
                  ))}
                  <button onClick={() => sendWhatsApp(client)} className="ml-4 bg-black hover:bg-red-600 text-white px-6 py-2 rounded shadow-md">Submit Order via WhatsApp</button>
                </div>
              ) : (
                <>
                  <button onClick={() => removeClient(client.id, idx)} className="text-red-500 mb-4 hover:text-red-700 text-sm underline">Remove Client</button>

                  <div className="mb-4 space-y-2">
                    <input type="text" placeholder="Client Name" value={client.name} onChange={e => updateClient(client.id, { name: e.target.value })} className="border px-3 py-2 rounded w-full md:w-1/2" />
                    <input type="text" placeholder="Phone" value={client.phone} onChange={e => updateClient(client.id, { phone: e.target.value })} className="border px-3 py-2 rounded w-full md:w-1/2" />
                    <textarea placeholder="Address" value={client.address} onChange={e => updateClient(client.id, { address: e.target.value })} className="border px-3 py-2 rounded w-full md:w-2/3"></textarea>
                  </div>

                  <div className="space-y-4">
                    {client.items.map(item => (
                      <div key={item.id} className="flex flex-col md:flex-row justify-between items-start border p-4 rounded bg-white shadow">
                        <div className="flex items-center space-x-4">
                          <img src={item.image || '/default-custom.webp'} alt={item.name} className="h-16 w-16 object-cover rounded" />
                          <div>
                            <input type="text" value={item.name} onChange={e => updateClientItems(client.id, client.items.map(i => i.id === item.id ? { ...i, name: e.target.value } : i))} className="font-semibold border p-1 rounded" />
                            <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-col gap-1 ml-4">
                          <p>Color: {item.selectedColor}</p>
                          <div className="flex gap-4 mt-2 flex-wrap">
                            <label>Qty:<input type="number" min="1" value={item.quantity} onChange={e => updateClientItems(client.id, client.items.map(i => i.id === item.id ? { ...i, quantity: parseInt(e.target.value) || 1 } : i))} className="ml-1 border p-1 w-16" /></label>
                            <label>Original:<input type="number" value={item.originalPrice} onChange={e => updateClientItems(client.id, client.items.map(i => i.id === item.id ? { ...i, originalPrice: parseFloat(e.target.value) || 0 } : i))} className="ml-1 border p-1 w-20" /></label>
                            <label>Discounted:<input type="number" value={item.discountedPrice} onChange={e => updateClientItems(client.id, client.items.map(i => i.id === item.id ? { ...i, discountedPrice: parseFloat(e.target.value) || 0 } : i))} className="ml-1 border p-1 w-20" /></label>
                            <input type="file" accept="image/*" onChange={e => handleImageUpload(e, client.id, item.id)} className="border px-3 py-2 rounded w-1/4" />
                          </div>
                        </div>
                        <button onClick={() => removeItem(client.id, item.id)} className="text-red-500 mt-2 md:mt-0 md:ml-4 hover:text-red-700">Remove</button>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 border-t pt-4">
                    <h3 className="text-lg font-semibold mb-2">Add Custom Product</h3>
                    <CustomProductForm onAdd={item => addCustomProduct(client.id, item)} />
                  </div>

                  <div className="mt-4">
                    <button onClick={() => generateQuotationPDF(client.items, client)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Download Quotation PDF</button>
                    <button onClick={() => generateOrderPDF(client.items, client)} className="ml-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">Download Order PDF</button>
                    <button onClick={() => sendWhatsApp(client)} className="ml-4 bg-black hover:bg-red-600 text-white px-6 py-2 rounded shadow-md">Submit Order via WhatsApp</button>
                  </div>
                </>
              )}
            </details>
          </div>
        ))
      )}
    </div>
  );
}

function CustomProductForm({ onAdd }) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [qty, setQty] = useState(1);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [image, setImage] = useState(null);

  const handleAdd = () => {
    if (!name || qty < 1) return;
    const newItem = {
      id: Date.now().toString(),
      name,
      sku: sku || 'N/A',
      quantity: qty,
      originalPrice,
      discountedPrice,
      image: image || '/default-custom.webp',
      selectedColor: 'N/A'
    };
    onAdd(newItem);
    setName('');
    setSku('');
    setQty(1);
    setOriginalPrice(0);
    setDiscountedPrice(0);
    setImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mt-2">
      <input type="text" placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} className="border px-3 py-2 rounded w-full md:w-1/4" />
      <input type="text" placeholder="SKU (Optional)" value={sku} onChange={e => setSku(e.target.value)} className="border px-3 py-2 rounded w-full md:w-1/4" />
      <input type="number" placeholder="Qty" min="1" value={qty} onChange={e => setQty(Number(e.target.value))} className="border px-3 py-2 rounded w-full md:w-1/6" />
      <input type="number" placeholder="Original Price" value={originalPrice} onChange={e => setOriginalPrice(Number(e.target.value))} className="border px-3 py-2 rounded w-full md:w-1/6" />
      <input type="number" placeholder="Discounted Price" value={discountedPrice} onChange={e => setDiscountedPrice(Number(e.target.value))} className="border px-3 py-2 rounded w-full md:w-1/6" />
      <input type="file" accept="image/*" onChange={handleImageChange} className="border px-3 py-2 rounded w-full md:w-1/4" />
      <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add</button>
    </div>
  );
}
