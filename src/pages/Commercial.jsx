import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data';
import { useCart } from '../context/CartContext';

const categories = {
  Cardio: ['Treadmills', 'Ellipticals', 'Upright Bikes', 'Recumbent Bikes', 'Spinning Bikes', 'Ladder Master', 'Air Rower', 'Ski Machine'],
  Strength: ['Chest', 'Back', 'Shoulder', 'Arms', 'Legs', 'Abdominal', 'Multipurpose', 'Dumbells & Plates', 'Benches & Racks'],
  Accessories: ['Accessories'],
  Utilities: ['Utilities'],
  Unique_Equipments: ['Unique Equipments']
};

export default function Commercial() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search')?.toLowerCase() || '';
  const subcategoryParam = queryParams.get('subcategory') || null;

  const [activeSubcategory, setActiveSubcategory] = useState(subcategoryParam);
  const [openCategory, setOpenCategory] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    setActiveSubcategory(subcategoryParam);
  }, [subcategoryParam]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenCategory(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubcategoryClick = (subcategory) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set('subcategory', subcategory);
    newParams.delete('search'); // Reset search on subcategory change
    navigate({
      pathname: location.pathname,
      search: newParams.toString(),
    });
    setOpenCategory(null); // Close dropdown
  };

  const filteredProducts = products.filter((p) => {
    if (p.type !== 'Commercial') return false;
    if (activeSubcategory && p.subcategory !== activeSubcategory) return false;

    if (searchTerm) {
      const combined = `${p.name} ${p.category} ${p.subcategory} ${p.sku || ''}`.toLowerCase();
      if (!combined.includes(searchTerm)) return false;
    }

    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Navigation Filter */}
      <div className="bg-white shadow p-4">
        <div className="flex flex-wrap gap-6 justify-center" ref={dropdownRef}>
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
                      className={`px-4 py-2 text-left hover:bg-gray-100 transition duration-150 ${activeSubcategory === sub ? 'bg-blue-100 font-semibold' : ''
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
