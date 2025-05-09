import { useState } from 'react';

export default function SupportComplaint() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const whatsappMessage = `*URGENT SUPPORT REQUEST*%0A%0AName: ${name}%0AEmail: ${email}%0A%0AMessage:%0A${message}`;
    const phoneNumber = '919025416751'; // Replace with your WhatsApp number
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Support & Complaint</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="message"
          placeholder="Describe your issue"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded h-32"
        ></textarea>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Submit to WhatsApp
        </button>
      </form>
    </div>
  );
}
