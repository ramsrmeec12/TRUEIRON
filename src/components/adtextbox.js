import { FaCertificate, FaTools, FaRunning, FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SupportComplaint from '../pages/Support';
function Adtextbox() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
      {/* Box 1 */}
      <Link to={'/commercial'} className="flex items-center gap-4 bg-black text-white px-6 py-6
                transition transform duration-300 hover:scale-105 hover:shadow-lg">
        <FaCertificate size={40} />
        <span className="text-lg font-semibold">CERTIFIED PRODUCTS</span>
      </Link>

      {/* Box 2 */}
      <Link to={'/commercial'} className="flex items-center gap-4 bg-red-700 text-white px-6 py-6
                transition transform duration-300 hover:scale-105 hover:shadow-lg">
        <FaRunning size={40} />
        <span className="text-lg font-semibold">COMMERCIAL GYM SETUP</span>
      </Link>

      {/* Box 3 */}
      <Link to={'/support'} className="flex items-center gap-4 bg-black text-white px-6 py-6
                transition transform duration-300 hover:scale-105 hover:shadow-lg">
        <FaTools size={40} />
        <span className="text-lg font-semibold">SERVICE AND SUPPORT</span>
      </Link>

      {/* Box 4 */}
      <a
        href="/catalogue.pdf"
        download="True_Iron_Catalogue"
        className="flex items-center gap-4 bg-red-700 text-white px-6 py-6
             transition transform duration-300 hover:scale-105 hover:shadow-lg"
      >
        <FaBookOpen size={40} />
        <span className="text-lg font-semibold">DOWNLOAD CATALOGUE</span>
      </a>

    </div>
  );
}

export default Adtextbox;
