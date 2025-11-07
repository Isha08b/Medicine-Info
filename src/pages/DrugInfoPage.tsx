import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, AlertTriangle, Clock, Pill, Play,
  Stethoscope, Star, Shield, CheckCircle, Info, Heart
} from 'lucide-react';

// --- MOCK Drug Database ---
const DRUGS_DATA = {
  'levothyroxine': {
    id: 'levothyroxine',
    name: 'Levothyroxine Sodium',
    genericName: 'Levothyroxine (T4 Hormone)',
    category: 'Thyroid Hormone',
    description: 'Used to treat hypothyroidism and to suppress TSH...',
    dosage: 'Typical starting dose is 25-50 mcg daily...',
    sideEffects: ['Hair loss', 'Palpitations', 'Sweating'],
    precautions: ['Do not stop without consulting a doctor.'],
    manufacturer: 'Pfizer Inc.',
    expiryDate: '2026-10-01',
    strength: '100 mcg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://www.youtube.com/watch?v=kY0w5Dk_W-k'
  },
  'aspirin': {
    id: 'aspirin',
    name: 'Aspirin',
    genericName: 'Acetylsalicylic Acid (ASA)',
    category: 'NSAID / Antiplatelet',
    description: 'Used for fever, pain, and cardiovascular protection.',
    dosage: '325 mg every 4-6 hours or 81 mg daily.',
    sideEffects: ['Upset stomach', 'Nausea'],
    precautions: ['Avoid alcohol and use cautiously with ulcers.'],
    manufacturer: 'Bayer AG',
    expiryDate: '2025-05-15',
    strength: '81 mg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://youtu.be/zD7i6w8X_z4'
  },
};

// --- Helper functions ---
const getDrugById = (id) => DRUGS_DATA[id?.toLowerCase()];

const getYouTubeVideoId = (url) => {
  try {
    const u = new URL(url);
    return u.searchParams.get('v') || u.pathname.split('/').pop();
  } catch {
    return '';
  }
};

// --- Main Component ---
const DrugInfoPage = () => {
  const { id } = useParams();
  const drug = getDrugById(id) || null;

  if (!drug) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Drug Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          The drug ID "{id}" could not be found.
        </p>
        <Link
          to="/scan"
          className="inline-flex items-center space-x-3 text-primary-600 hover:text-primary-700 bg-white/80 px-6 py-3 rounded-2xl shadow-lg border border-primary-100"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-semibold">Back to Scanner</span>
        </Link>
      </div>
    );
  }

  const videoId = getYouTubeVideoId(drug.videoUrl);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50/30 py-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/scan"
          className="inline-flex items-center space-x-3 text-primary-600 hover:text-primary-700 mb-8 bg-white/80 px-6 py-3 rounded-2xl shadow-lg border border-primary-100"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-semibold">Back to Scanner</span>
        </Link>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Drug Info */}
            <div className="bg-white p-10 rounded-3xl shadow-2xl">
              <h1 className="text-4xl font-bold text-gray-900">{drug.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{drug.genericName}</p>
              <p className="text-gray-700">{drug.description}</p>
            </div>

            {/* Dosage */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl">
              <h2 className="text-2xl font-bold mb-4">Dosage Information</h2>
              <p>{drug.dosage}</p>
            </div>

            {/* Side Effects */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl">
              <h2 className="text-2xl font-bold mb-4">Side Effects</h2>
              <ul className="list-disc pl-5">
                {drug.sideEffects.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Video */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl">
              <h3 className="text-xl font-bold mb-4">Educational Video</h3>
              {videoId ? (
                <iframe
                  width="100%"
                  height="250"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={drug.name}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              ) : (
                <p>No video available</p>
              )}
            </div>

            {/* Drug Details */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl">
              <h3 className="text-xl font-bold mb-4">Drug Details</h3>
              <p><strong>Manufacturer:</strong> {drug.manufacturer}</p>
              <p><strong>Expiry:</strong> {drug.expiryDate}</p>
              <p><strong>Strength:</strong> {drug.strength}</p>
              <p><strong>Form:</strong> {drug.form}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugInfoPage;
