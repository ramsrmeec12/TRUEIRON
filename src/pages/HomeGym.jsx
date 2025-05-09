import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data';

const homeFilters = {
  Category: ['Dumbbells', 'Treadmill', 'Bench'],
  Type: ['Strength', 'Cardio'],
  Budget: ['₹5k–₹20k', '₹20k–₹50k', '₹50k+']
};

export default function HomeGym() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const navigate = useNavigate();
  const { cart } = useCart(); // optional: can be used to show cart count

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
    if (p.type !== 'Home') return false;

    for (let [category, values] of Object.entries(selectedFilters)) {
      if (values.length === 0) continue;

      if (category === 'Category' && !values.includes(p.subcategory)) return false;
      if (category === 'Type' && !values.includes(p.category)) return false;
      if (category === 'Budget' && !values.some(budget => checkBudgetMatch(p.price, budget))) return false;
    }

    return true;
  });

  return (
    <div className="flex">
      <FilterSidebar filters={homeFilters} onFilterChange={handleFilterChange} />
      <ProductGrid products={filteredProducts} />

      {/* ✅ Floating Cart Button */}
      <button
        onClick={() => navigate('/cart')}
        className="fixed top-10 right-12 md:top-12 md:right-4 z-50 p-2 bg-white rounded-full shadow-md"
        aria-label="Go to Cart"
      >
        <ShoppingCart />
      </button>
    </div>
  );
}

// ✅ Budget Helper
function checkBudgetMatch(price, range) {
  if (!price) return false;
  const [min, max] = range.replace(/[₹k]/g, '').split('–').map(Number);
  return price >= min * 1000 && price <= max * 1000;
}
