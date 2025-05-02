import React, { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-cover bg-center rounded-xl p-8 text-white mb-8" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2070")' }}>
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="mb-6">
          Have questions or feedback? We'd love to hear from you!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Get In Touch
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-300">+91 1234567890</p>
                  <p className="text-gray-600 dark:text-gray-300">Mon-Fri, 9am-5pm IST</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">info@krishiguide.com</p>
                  <p className="text-gray-600 dark:text-gray-300">support@krishiguide.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">Address</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    123 Agricultural Tech Park<br />
                    Narsinghpur, Madhya Pradesh,487555<br />
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Follow Us
            </h2>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-100 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900 p-3 rounded-full transition-colors">
                <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="bg-gray-100 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900 p-3 rounded-full transition-colors">
                <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="bg-gray-100 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900 p-3 rounded-full transition-colors">
                <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a href="#" className="bg-gray-100 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900 p-3 rounded-full transition-colors">
                <svg className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
              Send Us a Message
            </h2>
            
            {submitSuccess ? (
              <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-green-500 dark:text-green-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-green-800 dark:text-green-200 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-green-700 dark:text-green-300">
                  Thank you for contacting us. We will get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1 text-sm">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Enter your message here..."
                    required
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  ></textarea>
                </div>
                
                {submitError && (
                  <div className="bg-red-50 dark:bg-red-900 p-3 rounded-lg">
                    <p className="text-red-700 dark:text-red-300 text-sm">{submitError}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${
                    isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                  } text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-2">How accurate are the crop recommendations?</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Our recommendations are based on scientific data and agricultural best practices. While we strive for high accuracy, local factors and specific field conditions may influence actual results.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Is KrishiGuide available in my region?</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Currently, KrishiGuide is optimized for farming conditions in India, with particular focus on major agricultural states. We're continuously expanding our coverage to more regions.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
            <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-2">How can I provide feedback about the application?</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              We welcome your feedback! You can use the contact form on this page, or send us an email directly at feedback@krishiguide.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 