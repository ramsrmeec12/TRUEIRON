import { useParams } from 'react-router-dom';
import { products } from '../data';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id.toString() === id);
  const { cartItems, addToCart } = useCart(); // Access cartItems
  const navigate = useNavigate();

  if (!product) return <div className="p-6 text-center">Product not found.</div>;

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-[400px] object-contain rounded"
        />
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-1">Category: {product.category}</p>
        <p className="text-gray-700 mb-4">Subcategory: {product.subcategory}</p>
        <p className="text-gray-600 mb-4">{product.description || 'No description available.'}</p>

        <button
          onClick={() => addToCart(product)}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Add to Cart
        </button>
      </div>

      {/* Cart Button with Item Count */}
      <button
        onClick={() => navigate('/cart')}
        className="fixed top-10 right-12 md:top-12 md:right-4 z-50 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
        title="Go to Cart"
      >
        <ShoppingCart />
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 text-xs font-bold text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>
    </div>
  );
}
