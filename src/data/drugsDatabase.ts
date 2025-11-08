// src/data/drugsDatabase.ts
export interface DrugInfo {
  id: string;
  name: string;
  genericName: string;
  description: string;
  dosage: string;
  sideEffects: string[];
  precautions: string[];
  videoUrl: string;
  manufacturer: string;
  expiryDate: string;
  category: string;
  strength: string;
  form: string;
  activeIngredient: string;
}

export const drugsDatabase: DrugInfo[] = [
  {
    id: 'metformin',
    name: 'Metformin',
    genericName: 'Metformin',
    description:
      'Drug Class: Biguanide (anti-hyperglycemic). Indications: First-line treatment for type 2 diabetes; also used in polycystic ovary syndrome (PCOS) and metabolic syndrome. Mechanism of Action: Lowers hepatic glucose production, increases insulin sensitivity.',
    dosage: 'Starting low (e.g. 500–850 mg once or twice daily), with gradual titration—max often ~2000–2500 mg/day.',
    sideEffects: ['Diarrhea', 'Nausea', 'Abdominal pain', 'Possible mild risk of hypoglycemia'],
    precautions: ['Rare but dangerous—lactic acidosis, especially in renal impairment', 'Monitor renal function', 'Extended-release may reduce GI upset'],
    videoUrl: 'https://youtu.be/MqcoLC74pEU',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Diabetes',
    strength: '500 mg',
    form: 'Tablet',
    activeIngredient: 'Metformin'
  },
  {
    id: 'amlodipine',
    name: 'Amlodipine (Norvasc)',
    genericName: 'Amlodipine',
    description:
      'Drug Class: Calcium channel blocker (dihydropyridine). Indications: Hypertension, stable and variant angina. Mechanism: Vasodilation via inhibition of L-type calcium channels—reducing vascular resistance.',
    dosage: 'Usually 5–10 mg once daily.',
    sideEffects: ['Peripheral edema', 'Fatigue', 'Nausea'],
    precautions: ['Caution in hepatic impairment', 'Interaction with CYP3A4 inhibitors'],
    videoUrl: 'https://youtu.be/ITmicTr2wBU',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Cardiovascular',
    strength: '5 mg',
    form: 'Tablet',
    activeIngredient: 'Amlodipine'
  },
  {
    id: 'levothyroxine',
    name: 'Levothyroxine',
    genericName: 'Levothyroxine',
    description:
      'Thyroid hormone replacement. Indications: Hypothyroidism, goiter suppression. Mechanism: Supplies synthetic thyroxine (T4), converted to active T3.',
    dosage: 'Often ~1.6 µg/kg/day; titrate based on TSH.',
    sideEffects: ['Palpitations', 'Tremors', 'Weight changes', 'Insomnia'],
    precautions: ['Risk of arrhythmias', 'Absorption reduced by calcium/iron (take on empty stomach)'],
    videoUrl: 'https://youtu.be/YQVM1c-4wH0',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Hormone',
    strength: '100 mcg',
    form: 'Tablet',
    activeIngredient: 'Levothyroxine'
  },
  {
    id: 'metoprolol',
    name: 'Metoprolol',
    genericName: 'Metoprolol',
    description:
      'Beta-1 selective β-blocker. Indications: Hypertension, angina, heart failure, post-MI management.',
    dosage: 'Varies; extended- or immediate-release depending on indication.',
    sideEffects: ['Dizziness', 'Fatigue', 'Sleep disturbances'],
    precautions: ['Abrupt withdrawal can cause rebound symptoms; taper gradually'],
    videoUrl: 'https://www.youtube.com/watch?v=xMtEQaQPoFc',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Cardiovascular',
    strength: 'N/A',
    form: 'Tablet',
    activeIngredient: 'Metoprolol'
  },
  {
    id: 'ibuprofen',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    description:
      'NSAID used for pain, fever, and inflammation. Mechanism: Nonselective COX inhibition reducing prostaglandins.',
    dosage: 'OTC doses up to 1200 mg/day; follow label or doctor advice.',
    sideEffects: ['GI upset', 'Dizziness', 'Fluid retention'],
    precautions: ['Risk of GI bleeding with long-term/high-dose use', 'Avoid combining with other NSAIDs'],
    videoUrl: 'https://www.youtube.com/watch?v=ZbB6rAod51M',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Pain Relief',
    strength: '200 mg',
    form: 'Tablet',
    activeIngredient: 'Ibuprofen'
  },
  {
    id: 'paracetamol',
    name: 'Paracetamol (Acetaminophen)',
    genericName: 'Paracetamol',
    description:
      'Analgesic and antipyretic used for mild-to-moderate pain and fever.',
    dosage: '500–1000 mg every 4–6 hours, not to exceed 3000–3250 mg/day (OTC recommendation varies).',
    sideEffects: ['Rare at therapeutic doses', 'Rash (rare)'],
    precautions: ['Hepatotoxicity risk at high doses', 'Avoid other acetaminophen-containing products'],
    videoUrl: 'https://www.youtube.com/watch?v=VHgcEvckjtM',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Pain Relief',
    strength: '500 mg',
    form: 'Tablet',
    activeIngredient: 'Acetaminophen'
  },
  {
    id: 'aspirin',
    name: 'Aspirin (Low-Dose)',
    genericName: 'Aspirin',
    description:
      'NSAID and antiplatelet used for cardioprotection and mild pain/fever.',
    dosage: '75–100 mg daily for cardioprotection; higher doses for pain.',
    sideEffects: ['GI discomfort', 'Bleeding risk'],
    precautions: ['Avoid in children with viral illness (Reye’s syndrome)', 'Use caution with bleeding disorders'],
    videoUrl: 'https://www.youtube.com/watch?v=-9uoB4Cx128&t=87s',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Cardiovascular',
    strength: '81 mg',
    form: 'Tablet',
    activeIngredient: 'Aspirin'
  },
  {
    id: 'losartan',
    name: 'Losartan',
    genericName: 'Losartan',
    description:
      'ARB used for hypertension and diabetic nephropathy. Mechanism: Blocks angiotensin II receptors causing vasodilation.',
    dosage: '25–100 mg once daily depending on indication.',
    sideEffects: ['Dizziness', 'Increased potassium'],
    precautions: ['Contraindicated in pregnancy', 'Monitor potassium and kidney function'],
    videoUrl: 'https://www.youtube.com/watch?v=zPw7JP3BNpc',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Cardiovascular',
    strength: '50 mg',
    form: 'Tablet',
    activeIngredient: 'Losartan'
  },
  {
    id: 'simvastatin',
    name: 'Simvastatin',
    genericName: 'Simvastatin',
    description:
      'HMG-CoA reductase inhibitor (statin) used to reduce LDL cholesterol and cardiovascular risk.',
    dosage: '10–40 mg once daily (evening preferred).',
    sideEffects: ['Muscle pain', 'GI upset'],
    precautions: ['Risk of myopathy; avoid grapefruit juice and certain CYP3A4 inhibitors'],
    videoUrl: 'https://www.youtube.com/watch?v=d0boNoubPk0',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Cholesterol',
    strength: '20 mg',
    form: 'Tablet',
    activeIngredient: 'Simvastatin'
  },
  {
    id: 'omeprazole',
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    description:
      'Proton pump inhibitor for GERD, peptic ulcer disease. Mechanism: Inhibits gastric H+/K+ ATPase.',
    dosage: '20–40 mg once daily.',
    sideEffects: ['Headache', 'Nausea'],
    precautions: ['Long-term use may affect B12 and bone health'],
    videoUrl: 'https://www.youtube.com/watch?v=one0S1ZhFl0',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Gastrointestinal',
    strength: '20 mg',
    form: 'Capsule',
    activeIngredient: 'Omeprazole'
  },
  {
    id: 'furosemide',
    name: 'Furosemide',
    genericName: 'Furosemide',
    description:
      'Loop diuretic used for edema and some cases of hypertension.',
    dosage: '20–80 mg daily orally; IV dosing varies.',
    sideEffects: ['Frequent urination', 'Dizziness', 'Electrolyte imbalance'],
    precautions: ['Monitor electrolytes and kidney function'],
    videoUrl: 'https://www.youtube.com/watch?v=hGWJmwMnii4&t=225s',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Diuretic',
    strength: '40 mg',
    form: 'Tablet',
    activeIngredient: 'Furosemide'
  },
  {
    id: 'prednisone',
    name: 'Prednisone',
    genericName: 'Prednisone',
    description:
      'Systemic corticosteroid used for inflammatory and autoimmune conditions.',
    dosage: 'Dose varies widely (5–60 mg) depending on condition.',
    sideEffects: ['Weight gain', 'Mood changes', 'Insomnia'],
    precautions: ['Long-term use risks: osteoporosis, adrenal suppression; taper slowly'],
    videoUrl: 'https://www.youtube.com/watch?v=fT9GerQ7AuM',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Corticosteroid',
    strength: '10 mg',
    form: 'Tablet',
    activeIngredient: 'Prednisone'
  },
  {
    id: 'clopidogrel',
    name: 'Clopidogrel',
    genericName: 'Clopidogrel',
    description:
      'Antiplatelet (P2Y12 inhibitor) used to reduce risk of thrombotic events.',
    dosage: '75 mg once daily for most indications.',
    sideEffects: ['Bruising', 'Bleeding', 'Diarrhea'],
    precautions: ['Increased bleeding risk; check interactions with PPIs'],
    videoUrl: 'https://www.youtube.com/watch?v=hp5BQ0aUsyg',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Cardiovascular',
    strength: '75 mg',
    form: 'Tablet',
    activeIngredient: 'Clopidogrel'
  },
  {
    id: 'hydrochlorothiazide',
    name: 'Hydrochlorothiazide (HCTZ)',
    genericName: 'Hydrochlorothiazide',
    description:
      'Thiazide diuretic used for hypertension and edema.',
    dosage: '12.5–50 mg daily.',
    sideEffects: ['Increased urination', 'Low potassium', 'Dizziness'],
    precautions: ['Monitor electrolytes; may aggravate gout'],
    videoUrl: 'https://www.youtube.com/watch?v=JyfR2Wcaa2w',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Diuretic',
    strength: '25 mg',
    form: 'Tablet',
    activeIngredient: 'Hydrochlorothiazide'
  },
  {
    id: 'lisinopril',
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    description:
      'ACE inhibitor used for hypertension and heart failure.',
    dosage: '10–40 mg daily.',
    sideEffects: ['Cough', 'Dizziness'],
    precautions: ['Contraindicated in pregnancy; monitor potassium'],
    videoUrl: 'https://www.youtube.com/watch?v=VDNc6Ty-xvE',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Cardiovascular',
    strength: '10 mg',
    form: 'Tablet',
    activeIngredient: 'Lisinopril'
  },
  {
    id: 'warfarin',
    name: 'Warfarin',
    genericName: 'Warfarin',
    description:
      'Vitamin K antagonist anticoagulant used to prevent/treat thromboembolism.',
    dosage: 'Individualized to INR goals (commonly 2.0–3.0).',
    sideEffects: ['Bleeding', 'Bruising'],
    precautions: ['Many food/drug interactions; monitor INR regularly'],
    videoUrl: 'https://www.youtube.com/watch?v=_R4oU5Rlrzo',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Anticoagulant',
    strength: '5 mg',
    form: 'Tablet',
    activeIngredient: 'Warfarin'
  },
  {
    id: 'albuterol',
    name: 'Albuterol (Salbutamol)',
    genericName: 'Albuterol',
    description:
      'Short-acting β2 agonist used for relief of bronchospasm (asthma, COPD).',
    dosage: '1–2 puffs every 4–6 hours PRN (metered-dose inhaler).',
    sideEffects: ['Tremor', 'Palpitations', 'Nervousness'],
    precautions: ['Monitor for paradoxical bronchospasm; avoid overuse'],
    videoUrl: 'https://www.youtube.com/watch?v=seoaruka26g',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Respiratory',
    strength: '90 mcg/puff',
    form: 'Inhaler',
    activeIngredient: 'Albuterol'
  },
  {
    id: 'montelukast',
    name: 'Montelukast',
    genericName: 'Montelukast',
    description:
      'Leukotriene receptor antagonist used for asthma maintenance and allergic rhinitis.',
    dosage: '10 mg once daily for adults.',
    sideEffects: ['Headache', 'Abdominal pain'],
    precautions: ['Possible neuropsychiatric effects; not for acute attacks'],
    videoUrl: 'https://www.youtube.com/watch?v=-5Bg1-rvinA',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Respiratory',
    strength: '10 mg',
    form: 'Tablet',
    activeIngredient: 'Montelukast'
  },
  {
    id: 'doxycycline',
    name: 'Doxycycline',
    genericName: 'Doxycycline',
    description:
      'Tetracycline antibiotic used for various bacterial infections and acne.',
    dosage: '100 mg once or twice daily depending on indication.',
    sideEffects: ['Nausea', 'Sun sensitivity'],
    precautions: ['Not for pregnant women or children <8; avoid dairy near dosing'],
    videoUrl: 'https://www.youtube.com/watch?v=Lg7BD1-nwqk',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Antibiotic',
    strength: '100 mg',
    form: 'Capsule',
    activeIngredient: 'Doxycycline'
  },
  {
    id: 'ciprofloxacin',
    name: 'Ciprofloxacin',
    genericName: 'Ciprofloxacin',
    description:
      'Fluoroquinolone antibiotic used for UTIs, some respiratory and GI infections.',
    dosage: '250–750 mg twice daily depending on infection.',
    sideEffects: ['Nausea', 'Dizziness', 'Tendon rupture (rare)'],
    precautions: ['Avoid in severe myasthenia gravis; monitor for tendon problems'],
    videoUrl: 'https://www.youtube.com/watch?v=SRqTa0MSZZ0',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Antibiotic',
    strength: '500 mg',
    form: 'Tablet',
    activeIngredient: 'Ciprofloxacin'
  },
  {
    id: 'fluoxetine',
    name: 'Fluoxetine',
    genericName: 'Fluoxetine',
    description:
      'SSRI antidepressant used for depression, OCD, and other disorders.',
    dosage: '20–60 mg daily.',
    sideEffects: ['Nausea', 'Insomnia', 'Sexual dysfunction'],
    precautions: ['Increased suicide risk in young people; avoid MAOIs'],
    videoUrl: 'https://www.youtube.com/watch?v=3Q_B7DdKLj8',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Antidepressant',
    strength: '20 mg',
    form: 'Capsule',
    activeIngredient: 'Fluoxetine'
  },
  {
    id: 'sertraline',
    name: 'Sertraline',
    genericName: 'Sertraline',
    description:
      'SSRI antidepressant used for depression, anxiety, PTSD, and OCD.',
    dosage: '50–200 mg daily.',
    sideEffects: ['Diarrhea', 'Insomnia'],
    precautions: ['Monitor for serotonin syndrome; taper to discontinue'],
    videoUrl: 'https://www.youtube.com/watch?v=fFoy2-IrCv8',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Antidepressant',
    strength: '50 mg',
    form: 'Tablet',
    activeIngredient: 'Sertraline'
  }
];

export const getDrugById = (id: string): DrugInfo | undefined => {
  if (!id) return undefined;
  return drugsDatabase.find(drug => drug.id.toLowerCase() === id.toLowerCase());
};

export const getAllDrugs = (): DrugInfo[] => {
  return drugsDatabase;
};
