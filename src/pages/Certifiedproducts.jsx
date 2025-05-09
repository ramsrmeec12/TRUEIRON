export default function CertifiedProducts() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Certified Products</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        All our gym equipment is manufactured with premium quality materials and certified to meet the highest industry standards for safety, durability, and performance.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Certificate 1 */}
        <div className="border rounded shadow p-4 text-center">
          <img
            src="/certificates/iso9001.jpg" // Replace with actual image path
            alt="ISO 9001 Certification"
            className="w-full h-64 object-contain mb-4"
          />
          <h3 className="text-xl font-semibold">ISO 9001:2015 Certified</h3>
          <p className="text-gray-600">
            Certified for quality management systems in the design and manufacturing of gym equipment.
          </p>
        </div>

        {/* Certificate 2 */}
        <div className="border rounded shadow p-4 text-center">
          <img
            src="/certificates/safety.jpg" // Replace with actual image path
            alt="Safety Compliance Certificate"
            className="w-full h-64 object-contain mb-4"
          />
          <h3 className="text-xl font-semibold">Safety Compliance</h3>
          <p className="text-gray-600">
            Our products are compliant with national safety standards ensuring user safety during workouts.
          </p>
        </div>

        {/* Add more certificates as needed */}
      </div>
    </div>
  );
}
