import { FaCertificate, FaTools, FaRunning, FaBookOpen } from 'react-icons/fa';

function Adtextbox() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
      {/* Box 1 */}
      <div className="flex items-center gap-4 bg-black text-white px-6 py-6">
        <FaCertificate size={40} />
        <span className="text-lg font-semibold">CERTIFIED PRODUCTS</span>
      </div>

      {/* Box 2 */}
      <div className="flex items-center gap-4 bg-red-700 text-white px-6 py-6">
        <FaRunning size={40} />
        <span className="text-lg font-semibold">COMMERCIAL GYM SETUP</span>
      </div>

      {/* Box 3 */}
      <div className="flex items-center gap-4 bg-black text-white px-6 py-6">
        <FaTools size={40} />
        <span className="text-lg font-semibold">SERVICE AND SUPPORT</span>
      </div>

      {/* Box 4 */}
      <div className="flex items-center gap-4 bg-red-700 text-white px-6 py-6">
        <FaBookOpen size={40} />
        <span className="text-lg font-semibold">DOWNLOAD CATALOGUE</span>
      </div>
    </div>
  );
}

export default Adtextbox;
