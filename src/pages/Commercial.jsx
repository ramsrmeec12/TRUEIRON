import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const initialFilters = {
  Cardio: ['Treadmills','Ellipticals','Upright Bikes','Recumbent Bikes','Spinning Bikes'],
  Strength: ['Chest','Back','Shoulder','Arms','Legs','Abdominal','Multiopurpose'],
  Accessories: ['Fan', 'Belt'],
};

export default function Commercial() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const { cartItems } = useCart(); // Use cartItems from context
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search')?.toLowerCase() || '';

  const handleFilterChange = (category, option, checked) => {
    setSelectedFilters((prev) => {
      const current = prev[category] || [];
      const updated = checked
        ? [...current, option]
        : current.filter((item) => item !== option);
      return { ...prev, [category]: updated };
    });
  };

  const filteredProducts = products.filter((p) => {
    if (p.type !== 'Commercial') return false;

    // Filter by selected category/subcategory filters
    for (let [category, values] of Object.entries(selectedFilters)) {
      if (values.length && !values.includes(p.subcategory)) return false;
    }

    // Filter by search term
    if (searchTerm) {
      const combined = `${p.name} ${p.category} ${p.subcategory}`.toLowerCase();
      if (!combined.includes(searchTerm)) return false;
    }

    return true;
  });

  return (
    <div className="flex relative">
      <FilterSidebar filters={initialFilters} onFilterChange={handleFilterChange} />
      <ProductGrid products={filteredProducts} />

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
