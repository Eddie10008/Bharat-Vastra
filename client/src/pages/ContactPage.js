import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { AUSTRALIA_CONFIG } from '../config/australia';
import GaneshaLogo from '../components/common/GaneshaLogo';
import DecorativePattern from '../components/common/DecorativePattern';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const storeLocations = [
    {
      city: 'Sydney',
      address: '123 George Street, Sydney NSW 2000',
      phone: '+61 2 9123 4567',
      email: 'sydney@bharatvastra.com.au',
      hours: 'Mon-Sat: 10AM-7PM, Sun: 11AM-6PM',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      city: 'Melbourne',
      address: '456 Collins Street, Melbourne VIC 3000',
      phone: '+61 3 9123 4567',
      email: 'melbourne@bharatvastra.com.au',
      hours: 'Mon-Sat: 10AM-7PM, Sun: 11AM-6PM',
      image: 'https://images.unsplash.com/photo-1544919987-31d97bfef063?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      city: 'Brisbane',
      address: '789 Queen Street, Brisbane QLD 4000',
      phone: '+61 7 9123 4567',
      email: 'brisbane@bharatvastra.com.au',
      hours: 'Mon-Sat: 10AM-7PM, Sun: 11AM-6PM',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, Afterpay, and bank transfers. All payments are processed securely.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we ship within Australia only. We offer free shipping on orders above $150 and express shipping options.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for all unused items in their original packaging. Custom or personalized items are non-returnable.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you will receive a tracking number via email. You can also track your order through your account dashboard.'
    },
    {
      question: 'Do you offer wholesale pricing?',
      answer: 'Yes, we offer wholesale pricing for bulk orders. Please contact us directly for wholesale inquiries and pricing.'
    },
    {
      question: 'Can I customize or alter my order?',
      answer: 'We offer basic alterations and some customization options. Please contact us before placing your order for custom requirements.'
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      details: AUSTRALIA_CONFIG.contact.phone,
      description: 'Speak with our customer service team'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: AUSTRALIA_CONFIG.contact.email,
      description: 'Send us an email anytime'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: `${AUSTRALIA_CONFIG.contact.address.street}, ${AUSTRALIA_CONFIG.contact.address.suburb}`,
      description: 'Visit our flagship store in Sydney'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Sat: 10AM-7PM, Sun: 11AM-6PM',
      description: 'We\'re here to help during these hours'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
        <div className="absolute inset-0 ganesha-pattern opacity-30"></div>
        <div className="absolute top-10 left-10 opacity-10">
          <DecorativePattern variant="mandala" size="xl" opacity={0.3} />
        </div>
        <div className="relative container-max px-4 py-20 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <GaneshaLogo size="2xl" showText={true} />
            </div>
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-black mb-6">
              Get in{' '}
              <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              We're here to help you find the perfect Indian attire and jewelry. 
              Whether you have questions about our products, need assistance with your order, 
              or want to visit our stores, we're just a message away.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 spiritual-border">
                  <method.icon size={24} className="text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{method.title}</h3>
                <p className="text-gray-700 font-medium mb-1">{method.details}</p>
                <p className="text-gray-600 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-black mb-6">
                Send Us a Message
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Have a question or need assistance? Fill out the form below and we'll get back to you as soon as possible. 
                Our customer service team is dedicated to providing you with the best experience.
              </p>
              
              {isSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-green-700">Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2 ganesha-border"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
            
            <div className="relative">
              <div className="spiritual-border rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Customer Service"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gray-200 rounded-full animate-float cosmic-dots">
                <DecorativePattern variant="minimal" size="full" opacity={0.2} />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gray-300 rounded-full animate-float-delayed geometric-grid">
                <DecorativePattern variant="minimal" size="full" opacity={0.2} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Store Locations Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-black mb-4">
              Visit Our Stores
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Experience our collection in person at our beautiful stores across Australia.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {storeLocations.map((store, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-xl shadow-soft group-hover:shadow-medium transition-all duration-300 spiritual-border">
                  <img
                    src={store.image}
                    alt={`${store.city} Store`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">{store.city}</h3>
                    <p className="text-sm text-gray-200">{store.address}</p>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone size={16} className="text-gray-500" />
                      <span className="text-gray-700">{store.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail size={16} className="text-gray-500" />
                      <span className="text-gray-700">{store.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock size={16} className="text-gray-500" />
                      <span className="text-gray-700">{store.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Find answers to common questions about our products, services, and policies.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-soft p-6 spiritual-border">
                  <h3 className="text-lg font-semibold text-black mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding spiritual-gradient text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Explore our collection of authentic Indian attire and jewelry, or visit one of our stores for a personalized experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-white text-black hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Shop Online
            </a>
            <a
              href="tel:+611300123456"
              className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
