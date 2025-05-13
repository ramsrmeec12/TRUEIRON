// src/pages/ProductDetail.js
import { useParams } from 'react-router-dom';
import { products } from '../data';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id.toString() === id);
  const { addToCart } = useCart();

  if (!product) return <div className="p-6 text-center">Product not found.</div>;

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2 flex justify-center">
        <img src={product.image} alt={product.name} className="max-w-full max-h-[400px] object-contain rounded" />
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
    </div>
  );
}
