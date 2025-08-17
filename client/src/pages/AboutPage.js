import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Award, Users, Globe, Star, ArrowRight } from 'lucide-react';
import { AUSTRALIA_CONFIG } from '../config/australia';
import GaneshaLogo from '../components/common/GaneshaLogo';
import DecorativePattern from '../components/common/DecorativePattern';

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: 'Spiritual Heritage',
      description: 'We honor and preserve the spiritual significance of Indian attire and jewelry, connecting customers to their cultural roots.'
    },
    {
      icon: Award,
      title: 'Divine Craftsmanship',
      description: 'Every piece is carefully selected for its quality, authenticity, and the divine craftsmanship that goes into its creation.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We build lasting relationships with our customers, artisans, and the broader Indian community in Australia.'
    },
    {
      icon: Globe,
      title: 'Cultural Bridge',
      description: 'We serve as a bridge between traditional Indian culture and modern Australian lifestyle.'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'Bharat Vastra was founded with a vision to bring authentic Indian fashion to Australia.'
    },
    {
      year: '2021',
      title: 'First Store',
      description: 'Opened our first physical store in Sydney, serving the local Indian community.'
    },
    {
      year: '2022',
      title: 'Online Platform',
      description: 'Launched our e-commerce platform to reach customers across Australia.'
    },
    {
      year: '2023',
      title: 'Expansion',
      description: 'Expanded our collection and opened additional locations in Melbourne and Brisbane.'
    },
    {
      year: '2024',
      title: 'Innovation',
      description: 'Introduced wholesale services and enhanced our digital experience.'
    }
  ];

  const team = [
    {
      name: 'Priya Sharma',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'With over 15 years in the fashion industry, Priya brings her passion for Indian culture and business acumen to lead Bharat Vastra.'
    },
    {
      name: 'Raj Patel',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Raj ensures smooth operations and maintains the highest standards of customer service across all our locations.'
    },
    {
      name: 'Anjali Desai',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Anjali curates our collections, ensuring each piece reflects the beauty and authenticity of Indian fashion.'
    },
    {
      name: 'Amit Singh',
      role: 'Technology Lead',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Amit leads our digital transformation, creating seamless online experiences for our customers.'
    }
  ];

  const stats = [
    { number: '5000+', label: 'Happy Customers' },
    { number: '1000+', label: 'Products' },
    { number: '50+', label: 'Artisan Partners' },
    { number: '4', label: 'Cities Served' }
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-8">
                <GaneshaLogo size="2xl" showText={true} />
              </div>
              <h1 className="text-4xl lg:text-6xl font-serif font-bold text-black mb-6">
                Our Story of{' '}
                <span className="gradient-text">Cultural Heritage</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Bharat Vastra was born from a deep passion to preserve and celebrate the rich cultural heritage 
                of India through authentic fashion. We believe that every piece of clothing and jewelry tells a story 
                of tradition, spirituality, and divine craftsmanship.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/products"
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2 ganesha-border"
                >
                  <span>Explore Our Collection</span>
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/contact"
                  className="btn-outline text-lg px-8 py-4 ganesha-border"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 spiritual-border rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Indian Fashion Heritage"
                  className="rounded-2xl shadow-2xl"
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

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-black mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-black mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At Bharat Vastra, our mission is to bridge the gap between traditional Indian culture and modern 
                Australian lifestyle. We strive to provide authentic, high-quality Indian attire and jewelry that 
                not only looks beautiful but also carries the spiritual significance and cultural heritage of India.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We work directly with skilled artisans and trusted suppliers to ensure that every product in our 
                collection meets the highest standards of quality and authenticity. Our commitment to preserving 
                traditional craftsmanship while embracing modern design makes us the preferred choice for Indian 
                fashion in Australia.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-400 fill-current" size={20} />
                  <span className="text-gray-700 font-medium">Authentic Products</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="text-yellow-400 fill-current" size={20} />
                  <span className="text-gray-700 font-medium">Divine Craftsmanship</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="spiritual-border rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Traditional Indian Craftsmanship"
                  className="w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-black mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              These values guide everything we do, from product selection to customer service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 spiritual-border">
                  <value.icon size={24} className="text-gray-700" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-black mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              From humble beginnings to becoming a trusted name in Indian fashion across Australia.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-300"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 px-8">
                    <div className="bg-white p-6 rounded-lg shadow-soft spiritual-border">
                      <div className="text-2xl font-bold text-black mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-black mb-2">{milestone.title}</h3>
                      <p className="text-gray-700">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-white border-4 border-gray-300 rounded-full z-10"></div>
                  <div className="w-1/2 px-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-black mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The passionate individuals behind Bharat Vastra who work tirelessly to bring you the best Indian fashion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4">
                  <div className="spiritual-border rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-black mb-1">{member.name}</h3>
                <p className="text-gray-600 mb-3">{member.role}</p>
                <p className="text-gray-700 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding spiritual-gradient text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
            Join Our Cultural Journey
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Experience the beauty of Indian fashion and become part of our growing community of cultural enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-white text-black hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Explore Collection
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
