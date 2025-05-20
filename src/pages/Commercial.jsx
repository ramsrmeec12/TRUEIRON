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
  const [activeCategory, setActiveCategory] = useState(null); // Category view
  const [activeSubcategory, setActiveSubcategory] = useState(null); // Subcategory filter
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search')?.toLowerCase() || '';

  const handleFilterChange = (category, option, checked) => {
    setActiveCategory(null);
    setActiveSubcategory(null);
    setSelectedFilters((prev) => {
      const current = prev[category] || [];
      const updated = checked
        ? [...current, option]
        : current.filter((item) => item !== option);
      return { ...prev, [category]: updated };
    });
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedFilters({});
    setActiveCategory(null);
    setActiveSubcategory(subcategory);
  };

  const filteredProducts = products.filter((p) => {
    if (p.type !== 'Commercial') return false;

    if (activeSubcategory && p.subcategory !== activeSubcategory) return false;

    for (let [category, values] of Object.entries(selectedFilters)) {
      if (values.length && !values.includes(p.subcategory)) return false;
    }

    if (searchTerm) {
      const combined = `${p.name} ${p.category} ${p.subcategory}`.toLowerCase();
      if (!combined.includes(searchTerm)) return false;
    }

    return true;
  });

  return (
    <div className="flex relative">
      <FilterSidebar filters={initialFilters} onFilterChange={handleFilterChange} />

      <div className="flex-1 px-4 py-6">
        {/* Category Buttons with Hover Dropdown */}
        <div className="flex gap-6 mb-6 relative">
          {Object.entries(initialFilters).map(([category, subcategories]) => (
            <div key={category} className="relative group">
              <button
                className={`px-4 py-2 rounded border ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-black border-gray-300'
                } hover:bg-blue-500 hover:text-white transition`}
              >
                {category}
              </button>

              {/* Dropdown on Hover */}
              <div className="absolute hidden group-hover:flex flex-col bg-white border shadow-md mt-2 z-10 w-48">
                {subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => handleSubcategoryClick(sub)}
                    className="px-4 py-2 text-left hover:bg-gray-100"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} />
      </div>

      {/* Cart Button */}
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
