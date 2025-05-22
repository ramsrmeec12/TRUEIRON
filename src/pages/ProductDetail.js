import { useParams } from 'react-router-dom';
import { products } from '../data';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import ReactImageMagnify from 'react-image-magnify';


export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id.toString() === id);
  const { cartItems, addToCart } = useCart();
  const navigate = useNavigate();

  // Check if the product is already in the cart
  const isInCart = cartItems.some(item => item.id === product?.id);

  if (!product) return <div className="p-6 text-center">Product not found.</div>;

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2 flex justify-center">
        <ReactImageMagnify
  {...{
    smallImage: {
      alt: product.name,
      isFluidWidth: true,
      src: product.image,
    },
    largeImage: {
      src: product.image,
      width: 1200,
      height: 1800,
    },
    enlargedImageContainerDimensions: {
      width: '200%',
      height: '100%',
    },
    isHintEnabled: true,
    shouldUsePositiveSpaceLens: true,
  }}
/>

      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-1">Category: {product.category}</p>
        <p className="text-gray-700 mb-4">Subcategory: {product.subcategory}</p>
        <p className="text-gray-600 mb-4">{product.description || 'No description available.'}</p>
        <p className="text-gray-600 mb-4">SKU: {product.sku || 'N/A'}</p>

        <button
          onClick={() => addToCart(product)}
          disabled={isInCart}
          className={`px-6 py-2 rounded transition ${
            isInCart
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isInCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
