import React, { useState, memo, useCallback, useMemo } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter, FaPaperPlane } from 'react-icons/fa';

const Contact = memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiUrl = useMemo(() => 
    import.meta.env.VITE_API_URL 
      ? `${import.meta.env.VITE_API_URL}/contact`
      : 'http://localhost:5000/api/contact',
    []
  );

  const handleChange = useCallback((e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');
   
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus(data.message);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus(data.message || 'Failed to send message. Please try again.');
      }
    } catch {
      setStatus('Failed to send message. Please try emailing directly.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(''), 5000);
    }
  }, [apiUrl, formData]);

  return (
    <section id="contact" className="min-h-screen py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-4xl font-bold text-white mb-4">
            Get In <span className="text-green-400">Touch</span>
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-green-400 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-8">
            <div className="bg-gray-800 p-6 sm:p-8 rounded-2xl">
              <h3 className="text-2xl sm:text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="bg-green-500 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <FaEnvelope className="text-2xl text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 text-lg">Email</h4>
                    <a href="mailto: meharahmad6599197@gmail.com" className="text-gray-400 hover:text-green-400 transition-colors">
                      meharahmad6599197@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-blue-500 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <FaPhone className="text-2xl text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 text-lg">Phone</h4>
                    <a href="tel:+923704556744" className="text-gray-400 hover:text-green-400 transition-colors">
                      +923704556744
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-purple-500 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <FaMapMarkerAlt className="text-2xl text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1 text-lg">Location</h4>
                    <p className="text-gray-400">Lahore, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 sm:p-8 rounded-2xl">
              <h4 className="font-semibold text-white mb-6 text-xl">Follow Me</h4>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.linkedin.com/in/ahmad-nawaz-b97b85327/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 bg-gray-700 rounded-lg hover:bg-blue-600 text-white transition-all duration-300 transform hover:scale-105"
                >
                  <FaLinkedin className="text-2xl" />
                  <span className="font-medium">LinkedIn</span>
                </a>
                <a
                  href="https://github.com/mehar99197"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 text-white transition-all duration-300 transform hover:scale-105"
                >
                  <FaGithub className="text-2xl" />
                  <span className="font-medium">GitHub</span>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl text-white">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                <span className="text-lg font-semibold">Available for freelance projects</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 sm:p-8 rounded-2xl">
            <h3 className="text-2xl  font-bold text-white mb-6">
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  placeholder="Your Email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold px-6 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-lg" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              {status && (
                <div className="bg-green-500 text-white px-4 py-3 rounded-lg text-center font-medium animate-fade-in">
                  {status}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Contact;
