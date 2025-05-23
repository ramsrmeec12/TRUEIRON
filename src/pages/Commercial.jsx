// src/pages/Commercial.jsx
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const categories = {
  Cardio: ['Treadmills', 'Ellipticals', 'Upright Bikes', 'Recumbent Bikes', 'Spinning Bikes'],
  Strength: ['Chest', 'Back', 'Shoulder', 'Arms', 'Legs', 'Abdominal', 'Multiopurpose'],
  Accessories: ['Fan', 'Belt'],
};

export default function Commercial() {
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search')?.toLowerCase() || '';

  const handleSubcategoryClick = (subcategory) => {
    setActiveSubcategory(subcategory);
    setOpenCategory(null);

    const newParams = new URLSearchParams(location.search);
    newParams.delete('search');
    navigate({
      pathname: location.pathname,
      search: newParams.toString(),
    });
  };

  const filteredProducts = products.filter((p) => {
    if (p.type !== 'Commercial') return false;
    if (activeSubcategory && p.subcategory !== activeSubcategory) return false;
    if (searchTerm) {
      const combined = `${p.name} ${p.category} ${p.subcategory}`.toLowerCase();
      if (!combined.includes(searchTerm)) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Navigation Filter */}
      <div className="bg-white shadow p-4">
        <div className="flex flex-wrap gap-6 justify-center">
          {Object.entries(categories).map(([category, subcategories]) => (
            <div key={category} className="relative">
              <button
                className="text-base font-medium px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transform transition duration-200 hover:scale-105"
                onClick={() =>
                  setOpenCategory(openCategory === category ? null : category)
                }
              >
                {category}
              </button>
              {openCategory === category && (
                <div className="absolute left-0 mt-1 flex flex-col bg-white border rounded shadow-md z-10 min-w-48 animate-slideDown fade-in">
                  {subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => handleSubcategoryClick(sub)}
                      className={`px-4 py-2 text-left hover:bg-gray-100 transition duration-150 ${
                        activeSubcategory === sub ? 'bg-blue-100 font-semibold' : ''
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 px-4 py-6 mx-auto animate-fadeUp">
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
