import { Truck, Phone, Mail, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-5xl font-bold mb-6">Professional Transport Services</h1>
              <p className="text-xl mb-8">Reliable logistics solutions for your business needs</p>
              <a href="#contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Get Started
              </a>
            </div>
            <div className="md:w-1/2">
              <Truck size={300} className="text-white/90" />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Freight Transport",
                description: "Efficient and reliable freight transportation across the country"
              },
              {
                title: "Express Delivery",
                description: "Time-sensitive deliveries with guaranteed arrival times"
              },
              {
                title: "Specialized Transport",
                description: "Custom solutions for unique transportation needs"
              }
            ].map((service, index) => (
              <div key={index} className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="mr-4 text-blue-600" />
                  <span>+1 234 567 890</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-4 text-blue-600" />
                  <span>contact@transport.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-4 text-blue-600" />
                  <span>123 Transport Street, City, Country</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}