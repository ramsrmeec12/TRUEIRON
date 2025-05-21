import ProductCard from './ProductCard';

export default function ProductGrid({ products }) {
  return (
    <div className="grid justify-center grid-cols-1 sm:grid-cols-2 w-3/4:grid-cols-3 lg:grid-cols-4 gap-6 p-6 lg:gap-14">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

