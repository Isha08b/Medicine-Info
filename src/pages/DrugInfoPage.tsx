import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Clock, Pill, Play, Stethoscope, Star, Shield, CheckCircle, Info, Heart } from 'lucide-react';
import { getDrugById } from '../data/drugsDatabase';

const getYouTubeVideoId = (url: string): string => {
  if (!url) return '';
  try {
    const parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
    const id = parsedUrl.searchParams.get('v');
    if (id) return id;
    if (parsedUrl.hostname === 'youtu.be') {
      return parsedUrl.pathname.substring(1);
    }
    if (parsedUrl.pathname.includes('/embed/')) {
        return parsedUrl.pathname.split('/embed/')[1];
    }

  } catch (e) {
    return ''; 
  }
  return '';
};

const DrugInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const drug = getDrugById(id || '') || getDrugById('levothyroxine') || getDrugById('aspirin')!;
  const videoId = getYouTubeVideoId(drug.videoUrl);

  return (
    <div className="min-h-screen bg-gradient-to-br from-olive-50 via-white to-olive-50/30 py-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-olive-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-olive-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/scan"
          className="inline-flex items-center space-x-3 text-olive-600 hover:text-olive-700 mb-8 group bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-olive-100"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-2 transition-transform duration-300" />
          <span className="font-semibold">Back to Scanner</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-olive-100">
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-olive-400 rounded-full blur-xl opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-olive-100 to-olive-200 p-6 rounded-2xl shadow-lg">
                    <Pill className="h-12 w-12 text-olive-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <h1 className="text-4xl font-bold text-gray-900">{drug.name}</h1>
                    <div className="flex items-center space-x-1 bg-olive-100 px-3 py-1 rounded-full">
                      <Star className="h-4 w-4 text-olive-600" />
                      <span className="text-sm font-semibold text-olive-700">Verified</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-blue-100 px-3 py-1 rounded-full">
                      <span className="text-sm font-semibold text-blue-700">{drug.category}</span>
                    </div>
                  </div>
                  <p className="text-xl text-gray-600 mb-4 font-medium">{drug.genericName}</p>
                  <p className="text-gray-700 text-lg leading-relaxed">{drug.description}</p>
                  
                  <div className="flex items-center space-x-4 mt-6">

                    <div className="flex items-center space-x-2 text-olive-600">
                      <Shield className="h-5 w-5" />
                      <span className="font-semibold">FDA Approved</span>
                    </div>

                    <div className="flex items-center space-x-2 text-olive-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">Quality Assured</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-olive-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Dosage Information</h2>
              </div>

              <div className="bg-gradient-to-r from-olive-50 to-olive-100/50 p-6 rounded-2xl border border-olive-200">
                <p className="text-gray-800 font-semibold text-lg">{drug.dosage}</p>

                <div className="mt-4 flex items-center space-x-2 text-olive-700">
                  <Info className="h-5 w-5" />
                  <span className="text-sm font-medium">Always follow your doctor's prescription</span>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-olive-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-3 rounded-xl">
                  <AlertTriangle className="h-8 w-8 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Possible Side Effects</h2>
              </div>
              <ul className="grid sm:grid-cols-2 gap-4">
                {drug.sideEffects.map((effect, index) => (
                  <li key={index} className="flex items-center space-x-3 bg-amber-50 p-3 rounded-xl">
                    <div className="w-3 h-3 bg-amber-400 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{effect}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-olive-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-red-100 to-red-200 p-3 rounded-xl">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Important Precautions</h2>
              </div>
              <ul className="space-y-4">
                {drug.precautions.map((precaution, index) => (
                  <li key={index} className="flex items-start space-x-4 bg-red-50 p-4 rounded-xl">
                    <div className="w-3 h-3 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium leading-relaxed">{precaution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-olive-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-red-100 to-red-200 p-3 rounded-xl">
                  <Play className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Educational Video</h3>
              </div>
              <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}`} 
                  title={`${drug.name} Educational Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-2xl"
                ></iframe>
              </div>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Learn more about <span className="font-semibold text-olive-600">{drug.name}</span>, its uses, and proper administration from medical experts.
              </p>
            </div>

            <div className="bg-gradient-to-br from-olive-50 to-olive-100 rounded-3xl shadow-2xl p-8 border border-olive-200">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-olive-400 rounded-full blur-xl opacity-30"></div>
                  <div className="relative bg-white p-4 rounded-2xl shadow-lg">
                    <Stethoscope className="h-12 w-12 text-olive-600 mx-auto" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Need Medical Advice?
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Get personalized recommendations from qualified healthcare professionals.
                </p>
                <Link
                  to="/doctor-recommendation"
                  className="group bg-gradient-to-r from-olive-500 to-olive-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-olive-600 hover:to-olive-700 transition-all duration-300 inline-flex items-center justify-center space-x-2 w-full shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <Heart className="h-5 w-5 group-hover:text-red-200 transition-colors duration-300" />
                  <span>Consult Doctor</span>
                </Link>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-olive-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Drug Details</h3>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Manufacturer</span>
                  <p className="text-gray-900 font-semibold text-lg mt-1">{drug.manufacturer}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Expiry Date</span>
                  <p className="text-gray-900 font-semibold text-lg mt-1">{drug.expiryDate}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Strength</span>
                  <p className="text-gray-900 font-semibold text-lg mt-1">{drug.strength}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Form</span>
                  <p className="text-gray-900 font-semibold text-lg mt-1">{drug.form}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugInfoPage;