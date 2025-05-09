import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, message } = form;

    const whatsappMessage = `Hi, I'm ${name} (Email: ${email}) ${message}`;

    // Replace with your actual WhatsApp number (with country code, no `+` or spaces)
    const phoneNumber = "919025416751"; 

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className=" p-6 bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Your Email"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            placeholder="Your Message"
            rows={5}
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Send on WhatsApp
          </button>
        </form>

        {/* Business Info & Map */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">IronLife Gym Headquarters</h2>
            <p>123 Iron Street, Chennai, Tamil Nadu</p>
            <p>Email: support@ironlife.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Hours: Mon–Sat, 9am – 6pm</p>
          </div>

          {/* Google Maps Embed */}
          <div className="rounded overflow-hidden shadow">
            <iframe
              title="IronLife Gym Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.767801129395!2d80.2094431750792!3d13.051978087279043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266f02ee28cd7%3A0x8a5145199c59ae0e!2sIronLife%20Gym!5e0!3m2!1sen!2sin!4v1715250501562!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
