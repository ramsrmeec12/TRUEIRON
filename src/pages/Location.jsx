export default function Location() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Visit Our Store</h1>

      {/* Embedded Google Map */}
      <div className="w-full h-64 mb-6 shadow-lg rounded overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9211.65691931359!2d80.18800848354034!3d13.02823551749613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5260d5b4f309af%3A0x27d76f9eb46c8ca!2sIron%20Life%20gym!5e1!3m2!1sen!2sin!4v1747324394404!5m2!1sen!2sin"          width="100%"
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
        <div className="flex flex-wrap gap-3 ">
          <a href="" className="border border-gray-500 rounded-md p-2">18, NSE Bose Nagar, Puthapedu, Porur, Chennai-116</a>

          <p className="border border-gray-500 rounded-md p-2">30, Loha Market Main Rd, near DCP Office, New Silampur Phase III, New Seelampur, Shahdara, Delhi, 110053
          </p>
        </div>


        <p className="text-lg font-medium mt-4">📞 Phone:</p>
        <a href="tel:+916385706756" >
          +91 63857 06756
        </a>

        <p className="text-lg font-medium mt-4">🕒 Store Hours:</p>
        <p>Mon–Sat: 11 AM – 5 PM</p>
      </div>
    </div>
  );
}
