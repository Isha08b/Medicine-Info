import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, Clock, Pill, Play, Stethoscope, Star, Shield, CheckCircle, Info, Heart } from 'lucide-react';
// Assuming the path to your drug database utility is correct
import { getDrugById } from '../data/drugsDatabase'; 

// --- Interface for Drug Data (Highly Recommended for Type Safety) ---
// Since we don't have the drugsDatabase.ts file, I'll define a robust interface.
// You should ensure your actual drug objects match this structure.
interface Drug {
  id: string;
  name: string;
  genericName: string;
  category: string;
  description: string;
  dosage: string;
  sideEffects: string[];
  precautions: string[];
  manufacturer: string;
  expiryDate: string;
  strength: string;
  form: string;
  videoUrl: string; // The full YouTube URL
}

// --- Utility Function: More Robust YouTube ID Extraction ---
// Improved to handle null/undefined inputs and be more explicit about return type.
const getYouTubeVideoId = (url: string | null | undefined): string => {
  if (!url) return '';
  
  // Use a temporary variable for the URL to ensure it has a protocol for the URL constructor
  const fullUrl = url.startsWith('http') || url.startsWith('https') ? url : `https://${url}`;

  try {
    const parsedUrl = new URL(fullUrl);
    
    // 1. Standard search parameter: ?v=ID
    const id = parsedUrl.searchParams.get('v');
    if (id) return id;
    
    // 2. Shortened YouTube URL: youtu.be/ID
    if (parsedUrl.hostname === 'youtu.be') {
      // path starts with '/', so we slice from 1 to get the ID
      return parsedUrl.pathname.substring(1); 
    }
    
    // 3. Embedded URL: /embed/ID
    if (parsedUrl.pathname.includes('/embed/')) {
      // Split and take the part after '/embed/'
      const parts = parsedUrl.pathname.split('/embed/');
      return parts[parts.length - 1] || '';
    }

  } catch (e) {
    // URL parsing failed (e.g., malformed URL)
    console.error("Error parsing YouTube URL:", e);
    return ''; 
  }
  return '';
};

const DrugInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // --- ⚠️ Improved Drug Fetching Logic ⚠️ ---
  // 1. Get the drug by the actual ID from the URL.
  // 2. If the ID is missing or the drug is not found, fall back to default IDs.
  // 3. Use 'as unknown as Drug' to assert the type from the database utility, 
  //    or ideally, update getDrugById to be typed.
  const drug: Drug | null = (getDrugById(id || '') || getDrugById('levothyroxine') || getDrugById('aspirin')) as unknown as Drug;

  // Handle case where drug is still null (e.g., if all fallbacks fail)
  if (!drug) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Drug Information Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The requested drug ID **"{id}"** could not be located in the database.
        </p>
        <Link
          to="/scan"
          className="inline-flex items-center space-x-3 text-primary-600 hover:text-primary-700 group bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-2 transition-transform duration-300" />
          <span className="font-semibold">Go Back to Scanner</span>
        </Link>
      </div>
    );
  }

  const videoId = getYouTubeVideoId(drug.videoUrl);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50/30 py-8 relative overflow-hidden">
      {/* Background elements (kept for visual flair) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/scan"
          className="inline-flex items-center space-x-3 text-primary-600 hover:text-primary-700 mb-8 group bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-primary-100"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-2 transition-transform duration-300" />
          <span className="font-semibold">Back to Scanner</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            
            {/* --- Header/Main Info Block --- */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-primary-100">
              <div className="flex items-start space-x-6">
                <div className="relative">
                  {/* Icon with effect */}
                  <div className="absolute inset-0 bg-primary-400 rounded-full blur-xl opacity-30"></div>
                  <div className="relative bg-gradient-to-br from-primary-100 to-primary-200 p-6 rounded-2xl shadow-lg">
                    <Pill className="h-12 w-12 text-primary-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4 flex-wrap">
                    <h1 className="text-4xl font-bold text-gray-900 break-words max-w-full">{drug.name}</h1>
                    <div className="flex items-center space-x-1 bg-primary-100 px-3 py-1 rounded-full mt-2 sm:mt-0">
                      <Star className="h-4 w-4 text-primary-600" />
                      <span className="text-sm font-semibold text-primary-700">Verified</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-blue-100 px-3 py-1 rounded-full mt-2 sm:mt-0">
                      <span className="text-sm font-semibold text-blue-700">{drug.category}</span>
                    </div>
                  </div>
                  <p className="text-xl text-gray-600 mb-4 font-medium">{drug.genericName}</p>
                  <p className="text-gray-700 text-lg leading-relaxed">{drug.description}</p>
                  
                  <div className="flex items-center space-x-4 mt-6 flex-wrap">
                    <div className="flex items-center space-x-2 text-primary-600">
                      <Shield className="h-5 w-5" />
                      <span className="font-semibold">FDA Approved</span>
                    </div>
                    <div className="flex items-center space-x-2 text-primary-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">Quality Assured</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- Dosage Information Block --- */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-primary-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Dosage Information</h2>
              </div>

              <div className="bg-gradient-to-r from-primary-50 to-primary-100/50 p-6 rounded-2xl border border-primary-200">
                <p className="text-gray-800 font-semibold text-lg">{drug.dosage}</p>

                <div className="mt-4 flex items-center space-x-2 text-primary-700">
                  <Info className="h-5 w-5" />
                  <span className="text-sm font-medium">Always follow your doctor's prescription</span>
                </div>
              </div>
            </div>

            {/* --- Possible Side Effects Block --- */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-primary-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-3 rounded-xl">
                  <AlertTriangle className="h-8 w-8 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Possible Side Effects</h2>
              </div>
              <ul className="grid sm:grid-cols-2 gap-4">
                {/* Check for empty array to avoid rendering an empty list */}
                {drug.sideEffects && drug.sideEffects.length > 0 ? (
                  drug.sideEffects.map((effect, index) => (
                    <li key={index} className="flex items-center space-x-3 bg-amber-50 p-3 rounded-xl">
                      <div className="w-3 h-3 bg-amber-400 rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 font-medium">{effect}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 italic sm:col-span-2">No common side effects listed.</p>
                )}
              </ul>
            </div>

            {/* --- Important Precautions Block --- */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-primary-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-red-100 to-red-200 p-3 rounded-xl">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Important Precautions</h2>
              </div>
              <ul className="space-y-4">
                {/* Check for empty array to avoid rendering an empty list */}
                {drug.precautions && drug.precautions.length > 0 ? (
                  drug.precautions.map((precaution, index) => (
                    <li key={index} className="flex items-start space-x-4 bg-red-50 p-4 rounded-xl">
                      <div className="w-3 h-3 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 font-medium leading-relaxed">{precaution}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No specific precautions listed beyond general use.</p>
                )}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            
            {/* --- Educational Video Block --- */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-primary-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-br from-red-100 to-red-200 p-3 rounded-xl">
                  <Play className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Educational Video</h3>
              </div>
              {videoId ? (
                <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    width="100%"
                    height="100%"
                    // Using the cleaned videoId is correct
                    src={`https://www.youtube.com/embed/${videoId}`} 
                    title={`${drug.name} Educational Video`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-2xl"
                  ></iframe>
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center p-6 text-center">
                  <p className="text-gray-500">No educational video link provided for this drug.</p>
                </div>
              )}
              <p className="text-gray-600 mt-4 leading-relaxed">
                Learn more about <span className="font-semibold text-primary-600">{drug.name}</span>, its uses, and proper administration from medical experts.
              </p>
            </div>

            {/* --- Consultation Block (Kept as is) --- */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl shadow-2xl p-8 border border-primary-200">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-primary-400 rounded-full blur-xl opacity-30"></div>
                  <div className="relative bg-white p-4 rounded-2xl shadow-lg">
                    <Stethoscope className="h-12 w-12 text-primary-600 mx-auto" />
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
                  className="group bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 inline-flex items-center justify-center space-x-2 w-full shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <Heart className="h-5 w-5 group-hover:text-red-200 transition-colors duration-300" />
                  <span>Consult Doctor</span>
                </Link>
              </div>
            </div>

            {/* --- Drug Details Block (Kept as is) --- */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-primary-100">
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