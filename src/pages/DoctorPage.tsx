import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Stethoscope, Phone, Mail, Calendar, User, MessageSquare, Send } from 'lucide-react';

const DoctorPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    symptoms: '',
    currentMedications: '',
    urgency: 'normal'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Consultation Request Submitted:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-olive-50 to-white py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Stethoscope className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your request. A qualified healthcare professional will review your information 
              and contact you within 24 hours.
            </p>
            <div className="space-y-4">
              <Link
                to="/"
                className="bg-olive-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-olive-700 transition-colors duration-200 inline-block"
              >
                Return to Home
              </Link>
              <Link
                to="/scan"
                className="block text-olive-600 hover:text-olive-700"
              >
                Scan Another Medicine
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-olive-600 hover:text-olive-700 mb-6 group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Home</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
 
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">

              <div className="flex items-center space-x-3 mb-6">
                <Stethoscope className="h-8 w-8 text-olive-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Doctor Consultation Request</h1>
                  <p className="text-gray-600">Get professional medical advice from qualified healthcare providers</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                      Age *
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      required
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                      placeholder="Enter your age"
                      min="1"
                      max="120"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Symptoms or Concerns *
                  </label>
                  <textarea
                    id="symptoms"
                    name="symptoms"
                    required
                    rows={4}
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                    placeholder="Describe your symptoms, health concerns, or questions about medications..."
                  />
                </div>

                <div>
                  <label htmlFor="currentMedications" className="block text-sm font-medium text-gray-700 mb-2">
                    Current Medications
                  </label>
                  <textarea
                    id="currentMedications"
                    name="currentMedications"
                    rows={3}
                    value={formData.currentMedications}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                    placeholder="List any medications you're currently taking..."
                  />
                </div>

                <div>
                  <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level *
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    required
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-olive-500 focus:border-olive-500"
                  >
                    <option value="low">Low - General consultation</option>
                    <option value="normal">Normal - Within 24 hours</option>
                    <option value="high">High - Within 12 hours</option>
                    <option value="urgent">Urgent - Within 6 hours</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-olive-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-olive-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Submit Consultation Request</span>
                </button>
              </form>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-olive-600" />
                <span>What to Expect</span>
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-olive-400 rounded-full mt-2"></div>
                  <span>Response within 24 hours for normal consultations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-olive-400 rounded-full mt-2"></div>
                  <span>Licensed healthcare professionals only</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-olive-400 rounded-full mt-2"></div>
                  <span>Secure and confidential consultation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-olive-400 rounded-full mt-2"></div>
                  <span>Follow-up support available</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Emergency Notice</h3>
              <p className="text-sm text-red-700">
                For medical emergencies, please call your local emergency number or visit the nearest hospital immediately. 
                This service is for non-emergency consultations only.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-olive-600" />
                <span>Need Help?</span>
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                If you have questions about the consultation process, our support team is here to help.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-olive-600" />
                  <span>support@mediscan.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-olive-600" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;