import React, { useState } from "react";
import { MapPin, Mail, Phone, Clock, Info } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-36">
      <h1 className="text-4xl font-semibold mb-4">Contact us</h1>
      <p className="text-gray-600 mb-8">
        Reach out to us if you have any further questions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-4">
          <div className="flex items-start border border-transparent p-4 border-b-black/30 space-x-3">
            <Mail className="w-6 h-6 text-gray-600" />
            <div className="text-sm">
              <h3 className="text-sm text-gray-600">Email</h3>
              <a
                href="mailto:mail@alpinecabins.com"
                className="text-blue-600 hover:underline"
              >
                devcook@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start border border-transparent p-4 border-b-black/30 space-x-3">
            <Phone className="w-6 h-6 text-gray-600" />
            <div className="text-sm">
              <h3 className="text-gray-600">Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>

          <div className="flex items-start border border-transparent p-4 border-b-black/30 space-x-3">
            <MapPin className="w-6 h-6 text-gray-600" />
            <div className="text-sm">
              <h3 className="text-sm text-gray-600">Address</h3>
              <p>Ventos Chalets Headquarters,</p>
              <p>Nairobi, Kenya</p>
            </div>
          </div>

          <div className="flex items-start border border-transparent p-4 border-b-black/30 space-x-3">
            <Clock className="w-6 h-6 text-gray-600" />
            <div className="text-sm">
              <h3 className="text-sm text-gray-600">Customer Support Hours</h3>
              <p>Monday to Friday, 9:00 AM to 5:00 PM (GMT+3)</p>
            </div>
          </div>

          <div className="flex items-start p-4 space-x-3">
            <Info className="w-6 h-6 text-gray-600" />
            <p className="text-sm text-gray-600">
              For urgent inquiries outside of business hours, use the form on
              the right and we will reply as soon as possible.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#f3f2ff] p-10 rounded-2xl">
          <h2 className="text-lg mb-4">Fill out the form below to reach out</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#0a0026] focus:border-[#0a0026] outline-none"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#0a0026] focus:border-[#0a0026] outline-none"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows={6}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#0a0026] focus:border-[#0a0026] outline-none resize-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#0a0026] text-white py-3 px-4 rounded-md hover:bg-[#0a0026]/80 transition-colors text-sm font-semibold"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
