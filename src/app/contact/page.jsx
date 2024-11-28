"use client";
import { useState } from 'react';
import Layout from '../../components/Layout';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Thank you for your message. We will get back to you soon!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg my-8">
        <h1 className="text-3xl font-bold text-purple-600 mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6 text-gray-700">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
              <p>We'd love to hear from you. Please fill out this form and we will get in touch with you shortly.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p>support@wigiart.com</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Office Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM (PST)</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
