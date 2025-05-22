import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();

  // Check if the item is already in the cart
  const isInCart = cartItems.some(item => item.id === product.id);

  return (
    <div className="w-80 h-96 border rounded-lg shadow p-4 flex flex-col items-center bg-white hover:shadow-md transition">
      <Link to={`/product/${product.id}`} className="w-full">
        <div className="w-72 h-56 flex justify-center items-center rounded mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <h2 className="text-lg font-semibold text-center">{product.name}</h2>
        <p className="text-sm text-gray-600 text-center">
          {product.category} - {product.subcategory}
        </p>
      </Link>

      <button
        onClick={() => addToCart(product)}
        className={`px-4 py-2 mt-3 rounded transition  ${
          isInCart
            ? 'bg-gray-400 cursor-not-allowed text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
        disabled={isInCart}
      >
        {isInCart ? 'Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}
