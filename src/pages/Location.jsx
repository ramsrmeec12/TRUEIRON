export default function Location() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Visit Our Store</h1>

      {/* Embedded Google Map */}
      <div className="w-full h-64 mb-6 shadow-lg rounded overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.938048862028!2d80.20522697414552!3d12.824942118218193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f63103b3a29%3A0x1c5c7f6cd3a62778!2sIron%20Life%20Gym!5e0!3m2!1sen!2sin!4v1715249236784!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Iron Life Gym Location"
        ></iframe>
      </div>

      {/* Contact Information */}
      <div className="space-y-2">
        <p className="text-lg font-medium">📍 Address:</p>
        <p>4/25 A, 5/44 Valluvar Salai, Ramapuram, Chennai – 600089</p>

        <p className="text-lg font-medium mt-4">📞 Phone:</p>
        <p>+91 91765 04728</p>

        <p className="text-lg font-medium mt-4">🕒 Store Hours:</p>
        <p>Mon–Sat: 6 AM – 10 PM</p>
        <p>Sunday: 8 AM – 1 PM</p>
      </div>
    </div>
  );
}
