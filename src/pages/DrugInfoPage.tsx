import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, AlertTriangle, Clock, Pill, Play,
  Stethoscope, Star, Shield, CheckCircle, Info, Heart
} from 'lucide-react';

// --- MOCK Drug Database (22 Drugs) ---

export const DRUGS_DATA = {
  'metformin': {
    id: 'metformin',
    name: 'Metformin',
    genericName: 'Metformin',
    category: 'Biguanide (Anti-hyperglycemic)',
    description: 'Used as first-line treatment for type 2 diabetes and also in PCOS and metabolic syndrome. Lowers hepatic glucose production and increases insulin sensitivity.',
    dosage: '500–850 mg once or twice daily; max ~2000–2500 mg/day.',
    sideEffects: ['Diarrhea', 'Nausea', 'Abdominal pain'],
    precautions: ['Avoid if renal impairment', 'Monitor kidney function'],
    manufacturer: 'Bristol-Myers Squibb',
    expiryDate: '2027-03-10',
    strength: '500 mg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://youtu.be/MqcoLC74pEU'
  },
  'amlodipine': {
    id: 'amlodipine',
    name: 'Amlodipine',
    genericName: 'Amlodipine',
    category: 'Calcium Channel Blocker',
    description: 'Used for hypertension, angina, and coronary artery disease. Causes vasodilation by inhibiting L-type calcium channels.',
    dosage: '5–10 mg once daily.',
    sideEffects: ['Swelling', 'Fatigue', 'Nausea'],
    precautions: ['Use cautiously in elderly or hepatic impairment'],
    manufacturer: 'Pfizer Ltd.',
    expiryDate: '2026-11-05',
    strength: '5 mg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://youtu.be/ITmicTr2wBU'
  },
  'levothyroxine': {
    id: 'levothyroxine',
    name: 'Levothyroxine',
    genericName: 'Levothyroxine (T4 Hormone)',
    category: 'Thyroid Hormone Replacement',
    description: 'Used to treat hypothyroidism and suppress TSH. Provides synthetic T₄ converted to T₃ in the body.',
    dosage: 'Typically ~1.6 µg/kg/day on an empty stomach.',
    sideEffects: ['Palpitations', 'Tremor', 'Weight loss'],
    precautions: ['Avoid overdose', 'Take on empty stomach', 'Monitor TSH regularly'],
    manufacturer: 'Pfizer Inc.',
    expiryDate: '2026-10-01',
    strength: '100 mcg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://youtu.be/YQVM1c-4wH0'
  },
  'metoprolol': {
    id: 'metoprolol',
    name: 'Metoprolol',
    genericName: 'Metoprolol',
    category: 'Beta-1 Selective Beta Blocker',
    description: 'Used in hypertension, angina, and heart failure. Reduces heart rate and contractility.',
    dosage: 'Individualized; typical 25–100 mg twice daily.',
    sideEffects: ['Fatigue', 'Nausea', 'Dizziness'],
    precautions: ['Taper gradually', 'Avoid abrupt withdrawal'],
    manufacturer: 'AstraZeneca',
    expiryDate: '2026-09-10',
    strength: '50 mg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://www.youtube.com/watch?v=xMtEQaQPoFc'
  },
  'ibuprofen': {
    id: 'ibuprofen',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    category: 'NSAID (Pain Reliever)',
    description: 'Used to reduce pain, fever, and inflammation by inhibiting COX enzymes.',
    dosage: '200–400 mg every 6 hours as needed; max 1200 mg/day (OTC).',
    sideEffects: ['Nausea', 'Heartburn', 'Headache'],
    precautions: ['Avoid prolonged use', 'Take with food'],
    manufacturer: 'Reckitt Benckiser',
    expiryDate: '2027-01-15',
    strength: '400 mg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://www.youtube.com/watch?v=ZbB6rAod51M'
  },
  'paracetamol': {
    id: 'paracetamol',
    name: 'Paracetamol',
    genericName: 'Acetaminophen',
    category: 'Analgesic / Antipyretic',
    description: 'Used for relief of mild to moderate pain and fever.',
    dosage: '500–1000 mg every 4–6 hours; max 3250 mg/day.',
    sideEffects: ['Rash (rare)', 'Nausea'],
    precautions: ['Avoid overdose', 'Avoid alcohol'],
    manufacturer: 'GlaxoSmithKline',
    expiryDate: '2026-11-15',
    strength: '500 mg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://www.youtube.com/watch?v=VHgcEvckjtM'
  },
  'aspirin': {
    id: 'aspirin',
    name: 'Aspirin (Low-dose)',
    genericName: 'Acetylsalicylic Acid',
    category: 'NSAID / Antiplatelet',
    description: 'Used for prevention of heart attack or stroke; mild pain or fever.',
    dosage: '75–100 mg once daily.',
    sideEffects: ['Heartburn', 'Stomach upset'],
    precautions: ['Avoid in bleeding disorders', 'Not for children (Reye’s syndrome risk)'],
    manufacturer: 'Bayer AG',
    expiryDate: '2025-05-15',
    strength: '81 mg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://www.youtube.com/watch?v=-9uoB4Cx128&t=87s'
  },
  'losartan': {
    id: 'losartan',
    name: 'Losartan',
    genericName: 'Losartan',
    category: 'Angiotensin II Receptor Blocker (ARB)',
    description: 'Used for hypertension and kidney protection in diabetics.',
    dosage: '25–100 mg once daily.',
    sideEffects: ['Dizziness', 'High potassium'],
    precautions: ['Avoid in pregnancy', 'Monitor potassium and renal function'],
    manufacturer: 'Merck & Co.',
    expiryDate: '2026-04-01',
    strength: '50 mg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://www.youtube.com/watch?v=zPw7JP3BNpc'
  },
  'simvastatin': {
    id: 'simvastatin',
    name: 'Simvastatin',
    genericName: 'Simvastatin',
    category: 'Statin (HMG-CoA Reductase Inhibitor)',
    description: 'Used to lower cholesterol and reduce cardiovascular risk.',
    dosage: '10–40 mg once daily in the evening.',
    sideEffects: ['Muscle pain', 'Headache', 'Nausea'],
    precautions: ['Avoid grapefruit juice', 'Monitor liver enzymes'],
    manufacturer: 'Merck & Co.',
    expiryDate: '2026-07-20',
    strength: '20 mg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://www.youtube.com/watch?v=d0boNoubPk0'
  },
  'omeprazole': {
    id: 'omeprazole',
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    category: 'Proton Pump Inhibitor (PPI)',
    description: 'Used to treat acid reflux, ulcers, and GERD.',
    dosage: '20–40 mg once daily before food.',
    sideEffects: ['Headache', 'Nausea', 'Abdominal pain'],
    precautions: ['Avoid long-term use unless prescribed', 'May cause low magnesium'],
    manufacturer: 'AstraZeneca',
    expiryDate: '2026-08-11',
    strength: '20 mg Capsule',
    form: 'Capsule',
    videoUrl: 'https://www.youtube.com/watch?v=one0S1ZhFl0'
  },
  'furosemide': {
    id: 'furosemide',
    name: 'Furosemide',
    genericName: 'Furosemide',
    category: 'Loop Diuretic',
    description: 'Used for edema and hypertension by increasing urine output.',
    dosage: '20–80 mg daily (individualized).',
    sideEffects: ['Frequent urination', 'Dizziness', 'Dehydration'],
    precautions: ['Monitor electrolytes', 'Avoid dehydration'],
    manufacturer: 'Sanofi',
    expiryDate: '2026-12-20',
    strength: '40 mg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://www.youtube.com/watch?v=hGWJmwMnii4&t=225s'
  },
  'prednisone': {
    id: 'prednisone',
    name: 'Prednisone',
    genericName: 'Prednisone',
    category: 'Corticosteroid',
    description: 'Used to reduce inflammation in autoimmune and allergic diseases.',
    dosage: '5–60 mg daily depending on condition.',
    sideEffects: ['Weight gain', 'Mood changes', 'Insomnia'],
    precautions: ['Do not stop abruptly', 'Monitor blood sugar and bone health'],
    manufacturer: 'Roche Pharmaceuticals',
    expiryDate: '2026-06-14',
    strength: '10 mg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://www.youtube.com/watch?v=fT9GerQ7AuM'
  },
  'clopidogrel': {
    id: 'clopidogrel',
    name: 'Clopidogrel',
    genericName: 'Clopidogrel',
    category: 'Antiplatelet (P2Y12 Inhibitor)',
    description: 'Used to prevent clotting post-stent or in heart disease.',
    dosage: '75 mg once daily.',
    sideEffects: ['Bleeding', 'Rash', 'Diarrhea'],
    precautions: ['Avoid combining with NSAIDs or omeprazole'],
    manufacturer: 'Sanofi',
    expiryDate: '2026-10-19',
    strength: '75 mg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://www.youtube.com/watch?v=hp5BQ0aUsyg'
  },
  'hydrochlorothiazide': {
    id: 'hydrochlorothiazide',
    name: 'Hydrochlorothiazide',
    genericName: 'HCTZ',
    category: 'Thiazide Diuretic',
    description: 'Used for hypertension and edema by increasing urine output.',
    dosage: '12.5–50 mg daily.',
    sideEffects: ['Low potassium', 'Dizziness', 'Increased urination'],
    precautions: ['Monitor electrolytes', 'Avoid dehydration'],
    manufacturer: 'Teva Pharmaceuticals',
    expiryDate: '2027-02-17',
    strength: '25 mg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://www.youtube.com/watch?v=JyfR2Wcaa2w'
  },
  'lisinopril': {
    id: 'lisinopril',
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    category: 'ACE Inhibitor',
    description: 'Used for hypertension and heart failure.',
    dosage: '10–40 mg daily.',
    sideEffects: ['Cough', 'Dizziness', 'Fatigue'],
    precautions: ['Avoid in pregnancy', 'Monitor potassium'],
    manufacturer: 'Merck',
    expiryDate: '2026-05-10',
    strength: '20 mg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://www.youtube.com/watch?v=VDNc6Ty-xvE'
  },
  'warfarin': {
    id: 'warfarin',
    name: 'Warfarin',
    genericName: 'Warfarin',
    category: 'Anticoagulant (Vitamin K Antagonist)',
    description: 'Prevents and treats blood clots in atrial fibrillation or prosthetic valves.',
    dosage: 'Individualized to INR 2.0–3.0.',
    sideEffects: ['Bleeding', 'Nausea'],
    precautions: ['Requires INR monitoring', 'Avoid large vitamin K intake changes'],
    manufacturer: 'Bristol-Myers Squibb',
    expiryDate: '2027-03-21',
    strength: '5 mg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://www.youtube.com/watch?v=_R4oU5Rlrzo'
  },
  'albuterol': {
    id: 'albuterol',
    name: 'Albuterol (Salbutamol)',
    genericName: 'Salbutamol',
    category: 'Short-Acting Beta Agonist (SABA)',
    description: 'Used for quick relief of asthma and COPD symptoms.',
    dosage: '1–2 puffs every 4–6 hours as needed.',
    sideEffects: ['Tremor', 'Nervousness', 'Palpitations'],
    precautions: ['Avoid overuse', 'Monitor for paradoxical bronchospasm'],
    manufacturer: 'GlaxoSmithKline',
    expiryDate: '2026-09-09',
    strength: '100 mcg Inhaler',
    form: 'Inhaler',
    videoUrl: 'https://www.youtube.com/watch?v=seoaruka26g'
  },
  'montelukast': {
    id: 'montelukast',
    name: 'Montelukast',
    genericName: 'Montelukast',
    category: 'Leukotriene Receptor Antagonist',
    description: 'Used for asthma maintenance and allergic rhinitis.',
    dosage: '10 mg once daily.',
    sideEffects: ['Headache', 'Abdominal pain'],
    precautions: ['Monitor for mood changes or depression'],
    manufacturer: 'Merck',
    expiryDate: '2026-12-10',
    strength: '10 mg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://www.youtube.com/watch?v=-5Bg1-rvinA'
  },
  'doxycycline': {
    id: 'doxycycline',
    name: 'Doxycycline',
    genericName: 'Doxycycline',
    category: 'Tetracycline Antibiotic',
    description: 'Used for bacterial infections, acne, malaria prevention, and Lyme disease.',
    dosage: '100 mg once or twice daily.',
    sideEffects: ['Nausea', 'Diarrhea', 'Photosensitivity'],
    precautions: ['Avoid dairy near dosing', 'Not for pregnant women or children <8'],
    manufacturer: 'Pfizer',
    expiryDate: '2026-07-10',
    strength: '100 mg Capsule',
    form: 'Capsule',
    videoUrl: 'https://www.youtube.com/watch?v=Lg7BD1-nwqk'
  },
  'ciprofloxacin': {
    id: 'ciprofloxacin',
    name: 'Ciprofloxacin',
    genericName: 'Ciprofloxacin',
    category: 'Fluoroquinolone Antibiotic',
    description: 'Used for urinary, GI, and respiratory infections.',
    dosage: '250–750 mg twice daily.',
    sideEffects: ['Nausea', 'Diarrhea', 'Dizziness'],
    precautions: ['Avoid with dairy', 'Caution in elderly'],
    manufacturer: 'Bayer AG',
    expiryDate: '2027-01-01',
    strength: '500 mg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://www.youtube.com/watch?v=SRqTa0MSZZ0'
  },
  'fluoxetine': {
    id: 'fluoxetine',
    name: 'Fluoxetine',
    genericName: 'Fluoxetine',
    category: 'SSRI Antidepressant',
    description: 'Used for depression, anxiety, and OCD.',
    dosage: '20–60 mg once daily.',
    sideEffects: ['Nausea', 'Insomnia', 'Sexual dysfunction'],
    precautions: ['Avoid with MAOIs', 'Monitor mood changes'],
    manufacturer: 'Eli Lilly',
    expiryDate: '2026-10-22',
    strength: '20 mg Capsule',
    form: 'Capsule',
    videoUrl: 'https://www.youtube.com/watch?v=3Q_B7DdKLj8'
  },
  'sertraline': {
    id: 'sertraline',
    name: 'Sertraline',
    genericName: 'Sertraline',
    category: 'SSRI Antidepressant',
    description: 'Used for depression, anxiety, PTSD, and OCD.',
    dosage: '50–200 mg once daily.',
    sideEffects: ['Insomnia', 'Diarrhea', 'Sexual dysfunction'],
    precautions: ['Avoid with MAOIs', 'Taper slowly when discontinuing'],
    manufacturer: 'Pfizer',
    expiryDate: '2026-12-19',
    strength: '50 mg Tablet',
    form: 'Oral Tablet',
    videoUrl: 'https://www.youtube.com/watch?v=fFoy2-IrCv8'
  }
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
