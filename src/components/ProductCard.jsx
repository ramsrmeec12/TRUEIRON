import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart(); // ✅ use addToCart from context

  return (
    <div className="border rounded p-4 shadow">
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2" />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.category} - {product.subcategory}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-green-500 text-white p-2 mt-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
