import client1 from '../assets/Ourclients/client1.jpg';
import client2 from '../assets/Ourclients/client2.jpg';
import client3 from '../assets/Ourclients/client3.jpg';
import client4 from '../assets/Ourclients/client4.jpg';
import client5 from '../assets/Ourclients/client5.jpg';
import client6 from '../assets/Ourclients/client6.jpg';

const products = [
  { id: 1, img: client1, desc: 'Client 1', sku: 'SKU001' },
  { id: 2, img: client2, desc: 'Client 2', sku: 'SKU002' },
  { id: 3, img: client3, desc: 'Client 3', sku: 'SKU003' },
  { id: 4, img: client4, desc: 'Client 4', sku: 'SKU004' },
  { id: 5, img: client5, desc: 'Client 5', sku: 'SKU005' },
  { id: 6, img: client6, desc: 'Client 6', sku: 'SKU006' },
];

function Ourclients() {
  return (
    <div className="w-full bg-black text-white py-12 px-4 overflow-hidden">
      <h2 className="text-4xl font-bold mb-8 text-center">Our Clients</h2>
      
      {/* Scrolling container */}
      <div className="relative w-full">
        <div className="flex gap-6 animate-scroll whitespace-nowrap">
          {/* Duplicate for seamless loop */}
          {[...products, ...products].map((product, index) => (
            <div
              key={index}
              className="w-40 flex-shrink-0 border rounded shadow p-4 bg-white text-black flex flex-col items-center transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={product.img}
                alt={product.desc}
                className="h-24 object-cover mb-2 rounded"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ourclients;
