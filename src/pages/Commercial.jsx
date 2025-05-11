import { useState } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data';
import { useCart } from '../context/CartContext'; // ✅ Import useCart
import { ShoppingCart } from 'lucide-react'; // ✅ Import icon
import { useNavigate } from 'react-router-dom'; // ✅ Import navigation

const initialFilters = {
  Strength: ['Back', 'Shoulder', 'Leg', 'Biceps', 'Chest', 'Triceps'],
  Cardio: ['Treadmill', 'Cycle'],
  Accessories: ['Fan', 'Belt']
};

export default function Commercial() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const { cart } = useCart(); // ✅ If needed to show cart count or info
  const navigate = useNavigate(); // ✅ Setup navigation

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
    for (let [category, values] of Object.entries(selectedFilters)) {
      if (values.length && !values.includes(p.subcategory)) return false;
    }
    return true;
  });

  return (
    <div className="flex relative">
      <FilterSidebar filters={initialFilters} onFilterChange={handleFilterChange} />
      <ProductGrid products={filteredProducts} />

      {/* ✅ Cart Icon */}
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