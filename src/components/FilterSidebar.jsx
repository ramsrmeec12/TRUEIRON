export default function FilterSidebar({ filters, onFilterChange }) {
  return (
    <aside className="w-36 md:w-44 lg:w-64 p-4 border-r bg-gray-100">
      {Object.entries(filters).map(([category, options]) => (
        <div key={category} className="mb-6">
          <h3 className="font-bold mb-2">{category}</h3>
          {options.map((option) => (
            <label key={option} className="block">
              <input
                type="checkbox"
                value={option}
                onChange={(e) => onFilterChange(category, e.target.value, e.target.checked)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      ))}
    </aside>
  );
}
