import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const initialFilters = {
  Strength: ['Back', 'Shoulder', 'Leg', 'Biceps', 'Chest', 'Triceps'],
  Cardio: ['Treadmill', 'Cycle'],
  Accessories: ['Fan', 'Belt']
};

export default function Commercial() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const { cart } = useCart();
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

      {/* Cart Button */}
      <button
        onClick={() => navigate('/cart')}
        className="fixed top-10 right-12 md:top-12 md:right-4 z-50 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
        title="Go to Cart"
      >
        <ShoppingCart />
      </button>
    </div>
  );
}
