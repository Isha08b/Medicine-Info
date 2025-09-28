export interface DrugInfo {
  id: string;
  name: string;
  genericName: string;
  description: string;
  dosage: string;
  sideEffects: string[];
  precautions: string[];
  videoUrl: string; // ✅ Updated to hold the full YouTube URL
  manufacturer: string;
  expiryDate: string;
  category: string;
  strength: string;
  form: string;
  activeIngredient: string;
}

export const drugsDatabase: DrugInfo[] = [
  // Drug #1: Metformin
  {
    id: 'metformin',
    name: 'Metformin',
    genericName: 'Metformin',
    description: 'Drug Class: Biguanide (anti-hyperglycemic). Indications: First-line treatment for type 2 diabetes; also used in polycystic ovary syndrome (PCOS) and metabolic syndrome. Mechanism of Action: Lowers hepatic glucose production, increases insulin sensitivity.',
    dosage: 'Starting low (e.g. 500–850 mg once or twice daily), with gradual titration—max often ~2000–2500 mg/day.',
    sideEffects: ['Diarrhea', 'nausea', 'abdominal pain', 'possible mild risk of hypoglycemia'],
    precautions: ['Rare but dangerous—lactic acidosis, especially in patients with renal impairment', 'Generally well tolerated', 'extended-release forms may reduce GI upset', 'monitor renal function.'],
    videoUrl: 'https://youtu.be/MqcoLC74pEU',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Diabetes',
    strength: '500 mg',
    form: 'Tablet',
    activeIngredient: 'Metformin'
  },
  // Drug #2: Amlodipine
  {
    id: 'amlodipine',
    name: 'Amlodipine (Norvasc)',
    genericName: 'Amlodipine',
    description: 'Drug Class: Calcium channel blocker (dihydropyridine). Indications: Hypertension, stable and variant (Prinzmetal) angina, coronary artery disease. Mechanism of Action: Vasodilation via inhibition of L-type calcium channels—reducing vascular resistance.',
    dosage: 'Usually 5–10 mg once daily.',
    sideEffects: ['Peripheral edema (swelling)', 'fatigue', 'abdominal discomfort', 'nausea'],
    precautions: ['Possible hypotension or cardiac issues in overdose', 'caution in hepatic impairment or elderly patients', 'Interaction with CYP3A4 inhibitors', 'simvastatin (increased muscle-toxicity risk)', 'caution with nitrates or other hypotensives.'],
    videoUrl: 'https://youtu.be/ITmicTr2wBU',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Cardiovascular',
    strength: '5 mg',
    form: 'Tablet',
    activeIngredient: 'Amlodipine'
  },
  // Drug #3: Levothyroxine
  {
    id: 'levothyroxine',
    name: 'Levothyroxine',
    genericName: 'Levothyroxine',
    description: 'Drug Class: Thyroid hormone replacement (synthetic T₄). Indications: Hypothyroidism, goiter suppression, nodular thyroid disease, post-thyroid cancer TSH suppression. Mechanism of Action: Supplies synthetic thyroxine (T₄), converted to active T₃ to restore normal thyroid function.',
    dosage: 'Often estimated at ~1.6 µg per kg body weight per day; titrated based on TSH labs.',
    sideEffects: ['Palpitations', 'tremors', 'weight loss', 'insomnia—mimics hyperthyroidism'],
    precautions: ['Risk of arrhythmias', 'osteoporosis—especially in older adults or with prolonged high doses', 'Absorption reduced by calcium/iron supplements, food', 'must be taken on an empty stomach', 'interactions may require separation.'],
    videoUrl: 'https://youtu.be/YQVM1c-4wH0',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Hormone',
    strength: '100 mcg',
    form: 'Tablet',
    activeIngredient: 'Levothyroxine'
  },
  // Drug #4: Metoprolol
  {
    id: 'metoprolol',
    name: 'Metoprolol',
    genericName: 'Metoprolol',
    description: 'Drug Class: Beta-1 selective β-blocker. Indications: Hypertension, angina, heart failure, post-MI mortality reduction. Mechanism of Action: Blocks β-1 receptors in the heart, reducing heart rate and contractility.',
    dosage: 'Varies; use extended-release or immediate-release depending on condition; dosage individualized.',
    sideEffects: ['Dizziness', 'fatigue', 'nausea', 'diarrhea', 'depression', 'sleep disturbances (e.g., vivid dreams)'],
    precautions: ['Bradycardia', 'hypotension', 'bronchospasm', 'abrupt withdrawal can cause rebound tachycardia or angina', 'Taper gradually under medical supervision to avoid withdrawal effects.'],
    videoUrl: 'https://www.youtube.com/watch?v=xMtEQaQPoFc',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Cardiovascular',
    strength: 'N/A',
    form: 'Tablet',
    activeIngredient: 'Metoprolol'
  },
  // Drug #5: Ibuprofen
  {
    id: 'ibuprofen',
    name: 'Ibuprofen',
    genericName: 'Ibuprofen',
    description: 'Drug Class: NSAID (Non-steroidal anti-inflammatory drug). Indications: Pain relief, fever, inflammation (e.g., musculoskeletal pain, headaches). Mechanism of Action: Non-selectively inhibits COX-1 and COX-2 enzymes, reducing prostaglandin synthesis.',
    dosage: 'OTC doses up to 1200 mg/day; prescribed regimens may go higher under supervision.',
    sideEffects: ['Gastrointestinal upset (nausea, heartburn, diarrhea/constipation)', 'dizziness', 'headache', 'fluid retention'],
    precautions: ['Risk of GI bleeding, ulcers, heart attack, stroke—especially with long-term or high-dose use', 'Avoid combining with other NSAIDs', 'monitor in heart.'],
    videoUrl: 'https://www.youtube.com/watch?v=ZbB6rAod51M',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Pain Relief',
    strength: '200 mg',
    form: 'Tablet',
    activeIngredient: 'Ibuprofen'
  },
  // Drug #6: Paracetamol (Acetaminophen)
  {
    id: 'paracetamol',
    name: 'Paracetamol (Acetaminophen)',
    genericName: 'Paracetamol (Acetaminophen)',
    description: 'Drug Class: Analgesic, antipyretic. Indications: Relief of mild to moderate pain and fever. Mechanism of Action: Centrally inhibits prostaglandin synthesis (exact mechanism unclear).',
    dosage: '500–1000 mg every 4–6 hours, not to exceed 3000–3250 mg/day (OTC).',
    sideEffects: ['Rare at therapeutic doses', 'may include rash or nausea'],
    precautions: ['Hepatotoxicity risk at high doses', 'overdose can be fatal', 'Avoid concurrent use with other acetaminophen-containing products.'],
    videoUrl: 'https://www.youtube.com/watch?v=VHgcEvckjtM',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Pain Relief',
    strength: '500 mg',
    form: 'Tablet',
    activeIngredient: 'Acetaminophen'
  },
  // Drug #7: Aspirin (Low-Dose)
  {
    id: 'aspirin',
    name: 'Aspirin (Low-Dose)',
    genericName: 'Aspirin',
    description: 'Drug Class: NSAID, antiplatelet. Indications: Prevention of heart attack or stroke (antiplatelet effect); mild pain or fever. Mechanism of Action: Irreversibly inhibits COX-1 in platelets, reducing thromboxane A2 and platelet aggregation.',
    dosage: '75–100 mg daily for cardioprotection.',
    sideEffects: ['GI discomfort', 'heartburn'],
    precautions: ['GI bleeding', 'hypersensitivity reactions', 'Reye’s syndrome in children', 'Avoid with other anticoagulants without medical advice.'],
    videoUrl: 'https://www.youtube.com/watch?v=-9uoB4Cx128&t=87s',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Cardiovascular',
    strength: '81 mg',
    form: 'Tablet',
    activeIngredient: 'Aspirin'
  },
  // Drug #8: Losartan
  {
    id: 'losartan',
    name: 'Losartan',
    genericName: 'Losartan',
    description: 'Drug Class: Angiotensin II receptor blocker (ARB). Indications: Hypertension, diabetic nephropathy, heart failure adjunct. Mechanism of Action: Blocks angiotensin II receptors, leading to vasodilation and reduced blood pressure.',
    dosage: '25–100 mg once daily depending on indication.',
    sideEffects: ['Dizziness', 'increased potassium', 'rarely cough (less than ACE inhibitors)'],
    precautions: ['Risk of hyperkalemia', 'contraindicated in pregnancy', 'Monitor potassium, kidney function', 'avoid with other RAAS blockers.'],
    videoUrl: 'https://www.youtube.com/watch?v=zPw7JP3BNpc',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Cardiovascular',
    strength: '50 mg',
    form: 'Tablet',
    activeIngredient: 'Losartan'
  },
  // Drug #9: Simvastatin
  {
    id: 'simvastatin',
    name: 'Simvastatin',
    genericName: 'Simvastatin',
    description: 'Drug Class: HMG-CoA reductase inhibitor (statin). Indications: High LDL cholesterol, cardiovascular risk reduction. Mechanism of Action: Inhibits HMG-CoA reductase to reduce cholesterol synthesis.',
    dosage: '10–40 mg once daily in the evening.',
    sideEffects: ['Headache', 'GI upset', 'muscle pain'],
    precautions: ['Risk of myopathy/rhabdomyolysis', 'liver enzyme elevations', 'Avoid grapefruit juice and certain CYP3A4 inhibitors.'],
    videoUrl: 'https://www.youtube.com/watch?v=d0boNoubPk0',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Cholesterol',
    strength: '20 mg',
    form: 'Tablet',
    activeIngredient: 'Simvastatin'
  },
  // Drug #10: Omeprazole
  {
    id: 'omeprazole',
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    description: 'Drug Class: Proton pump inhibitor (PPI). Indications: GERD, peptic ulcers, H. pylori eradication adjunct. Mechanism of Action: Irreversibly inhibits H⁺/K⁺ ATPase in gastric parietal cells.',
    dosage: '20–40 mg once daily.',
    sideEffects: ['Headache', 'nausea', 'abdominal pain'],
    precautions: ['Long-term use may increase risk of fractures', 'B12 deficiency', 'infections', 'Reduces clopidogrel activation', 'timing with antiretrovirals matters.'],
    videoUrl: 'https://www.youtube.com/watch?v=one0S1ZhFl0',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Gastrointestinal',
    strength: '20 mg',
    form: 'Capsule',
    activeIngredient: 'Omeprazole'
  },
  // Drug #11 (Replacement): Furosemide
  {
    id: 'furosemide',
    name: 'Furosemide',
    genericName: 'Furosemide',
    description: 'Drug Class: Loop diuretic. Indications: Edema (heart failure, liver or kidney disease), hypertension. Mechanism of Action: Inhibits Na⁺-K⁺-2Cl⁻ transporter in the loop of Henle, increasing urine output.',
    dosage: 'Oral 20–80 mg daily; IV dosing varies by condition.',
    sideEffects: ['Frequent urination', 'dizziness', 'dehydration', 'electrolyte imbalance'],
    precautions: ['Hypovolemia', 'hypotension', 'ototoxicity at high IV doses', 'Monitor electrolytes', 'kidney function', 'caution with other antihypertensives.'],
    videoUrl: 'https://www.youtube.com/watch?v=hGWJmwMnii4&t=225s',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Diuretic',
    strength: '40 mg',
    form: 'Tablet',
    activeIngredient: 'Furosemide'
  },
  // Drug #12 (Replacement): Prednisone
  {
    id: 'prednisone',
    name: 'Prednisone',
    genericName: 'Prednisone',
    description: 'Drug Class: Systemic corticosteroid. Indications: Inflammatory and autoimmune diseases, allergic reactions, asthma exacerbations. Mechanism of Action: Modulates gene expression to suppress inflammatory responses.',
    dosage: 'Varies widely; e.g., 5–60 mg daily depending on condition and severity.',
    sideEffects: ['Increased appetite', 'weight gain', 'mood changes', 'insomnia'],
    precautions: ['Long-term use risks include osteoporosis', 'adrenal suppression', 'hyperglycemia', 'immunosuppression', 'Taper dose rather than abrupt cessation', 'interacts with vaccines, NSAIDs, antidiabetics.'],
    videoUrl: 'https://www.youtube.com/watch?v=fT9GerQ7AuM',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Corticosteroid',
    strength: '10 mg',
    form: 'Tablet',
    activeIngredient: 'Prednisone'
  },
  // Drug #13: Clopidogrel
  {
    id: 'clopidogrel',
    name: 'Clopidogrel',
    genericName: 'Clopidogrel',
    description: 'Drug Class: Antiplatelet (P2Y12 receptor inhibitor). Indications: Prevention of heart attack and stroke in patients with atherosclerosis, post-stent placement. Mechanism of Action: Inhibits platelet aggregation by irreversibly blocking P2Y12 ADP receptors.',
    dosage: '75 mg once daily.',
    sideEffects: ['Bruising', 'bleeding', 'diarrhea', 'rash'],
    precautions: ['Increased bleeding risk', 'rare thrombotic thrombocytopenic purpura (TTP)', 'Avoid with certain PPIs (e.g., omeprazole) that reduce activation.'],
    videoUrl: 'https://www.youtube.com/watch?v=hp5BQ0aUsyg',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Cardiovascular',
    strength: '75 mg',
    form: 'Tablet',
    activeIngredient: 'Clopidogrel'
  },
  // Drug #14: Hydrochlorothiazide (HCTZ)
  {
    id: 'hydrochlorothiazide',
    name: 'Hydrochlorothiazide (HCTZ)',
    genericName: 'Hydrochlorothiazide',
    description: 'Drug Class: Thiazide diuretic. Indications: Hypertension, edema. Mechanism of Action: Inhibits sodium reabsorption in the distal tubule, increasing urine output.',
    dosage: '12.5–50 mg daily.',
    sideEffects: ['Increased urination', 'low potassium', 'dizziness', 'increased blood sugar'],
    precautions: ['Gout flare', 'electrolyte imbalance', 'dehydration', 'Monitor electrolytes', 'may enhance lithium toxicity.'],
    videoUrl: 'https://www.youtube.com/watch?v=JyfR2Wcaa2w',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Diuretic',
    strength: '25 mg',
    form: 'Tablet',
    activeIngredient: 'Hydrochlorothiazide'
  },
  // Drug #15: Lisinopril
  {
    id: 'lisinopril',
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    description: 'Drug Class: ACE inhibitor. Indications: Hypertension, heart failure, post-MI, diabetic nephropathy. Mechanism of Action: Inhibits conversion of angiotensin I to II, reducing vasoconstriction.',
    dosage: '10–40 mg daily.',
    sideEffects: ['Cough', 'dizziness', 'headache', 'fatigue'],
    precautions: ['Angioedema', 'hyperkalemia', 'contraindicated in pregnancy', 'Avoid potassium supplements or potassium-sparing diuretics without supervision.'],
    videoUrl: 'https://www.youtube.com/watch?v=VDNc6Ty-xvE',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Cardiovascular',
    strength: '10 mg',
    form: 'Tablet',
    activeIngredient: 'Lisinopril'
  },
  // Drug #16: Warfarin
  {
    id: 'warfarin',
    name: 'Warfarin',
    genericName: 'Warfarin',
    description: 'Drug Class: Vitamin K antagonist anticoagulant. Indications: Prevention/treatment of thromboembolism, atrial fibrillation, prosthetic heart valves. Mechanism of Action: Inhibits vitamin K-dependent clotting factors II, VII, IX, X.',
    dosage: 'Adjusted to INR 2.0–3.0 (most cases).',
    sideEffects: ['Bruising', 'bleeding', 'nausea'],
    precautions: ['Life-threatening bleeding', 'requires INR monitoring', 'Many food/drug interactions', 'consistent vitamin K intake important.'],
    videoUrl: 'https://www.youtube.com/watch?v=_R4oU5Rlrzo',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Anticoagulant',
    strength: '5 mg',
    form: 'Tablet',
    activeIngredient: 'Warfarin'
  },
  // Drug #17: Albuterol (Salbutamol)
  {
    id: 'albuterol',
    name: 'Albuterol (Salbutamol)',
    genericName: 'Albuterol',
    description: 'Drug Class: Short-acting β2 agonist (SABA). Indications: Relief of bronchospasm in asthma, COPD. Mechanism of Action: Stimulates β2 receptors causing airway smooth muscle relaxation.',
    dosage: '1–2 puffs every 4–6 hours PRN.',
    sideEffects: ['Tremor', 'nervousness', 'palpitations', 'headache'],
    precautions: ['Paradoxical bronchospasm', 'hypokalemia with overuse', 'Overuse may worsen asthma control.'],
    videoUrl: 'https://www.youtube.com/watch?v=seoaruka26g',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Respiratory',
    strength: '90 mcg/puff',
    form: 'Inhaler',
    activeIngredient: 'Albuterol'
  },
  // Drug #18: Montelukast
  {
    id: 'montelukast',
    name: 'Montelukast',
    genericName: 'Montelukast',
    description: 'Drug Class: Leukotriene receptor antagonist. Indications: Asthma maintenance, allergic rhinitis. Mechanism of Action: Blocks leukotriene D4 at the CysLT1 receptor to reduce inflammation.',
    dosage: '10 mg once daily for adults.',
    sideEffects: ['Headache', 'abdominal pain', 'cough'],
    precautions: ['Neuropsychiatric effects (e.g., mood changes, depression)', 'Not for acute asthma attacks.'],
    videoUrl: 'https://www.youtube.com/watch?v=-5Bg1-rvinA',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Respiratory',
    strength: '10 mg',
    form: 'Tablet',
    activeIngredient: 'Montelukast'
  },
  // Drug #19: Doxycycline
  {
    id: 'doxycycline',
    name: 'Doxycycline',
    genericName: 'Doxycycline',
    description: 'Drug Class: Tetracycline antibiotic. Indications: Bacterial infections, acne, malaria prophylaxis, Lyme disease. Mechanism of Action: Inhibits bacterial protein synthesis by binding 30S ribosomal subunit.',
    dosage: '100 mg once or twice daily.',
    sideEffects: ['Nausea', 'diarrhea', 'sun sensitivity'],
    precautions: ['Esophagitis', 'tooth discoloration in children', 'Avoid with dairy close to dosing', 'not for pregnant women or children <8.'],
    videoUrl: 'https://www.youtube.com/watch?v=Lg7BD1-nwqk',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Antibiotic',
    strength: '100 mg',
    form: 'Capsule',
    activeIngredient: 'Doxycycline'
  },
  // Drug #20: Ciprofloxacin
  {
    id: 'ciprofloxacin',
    name: 'Ciprofloxacin',
    genericName: 'Ciprofloxacin',
    description: 'Drug Class: Fluoroquinolone antibiotic. Indications: UTIs, respiratory infections, GI infections, anthrax. Mechanism of Action: Inhibits bacterial DNA gyrase and topoisomerase IV.',
    dosage: '250–750 mg twice daily.',
    sideEffects: ['Nausea', 'diarrhea', 'dizziness'],
    precautions: ['Tendon rupture', 'QT prolongation', 'CNS effects', 'Avoid with dairy/antacids close to dosing', 'caution in elderly.'],
    videoUrl: 'https://www.youtube.com/watch?v=SRqTa0MSZZ0',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Antibiotic',
    strength: '500 mg',
    form: 'Tablet',
    activeIngredient: 'Ciprofloxacin'
  },
  // Drug #21: Fluoxetine
  {
    id: 'fluoxetine',
    name: 'Fluoxetine',
    genericName: 'Fluoxetine',
    description: 'Drug Class: SSRI antidepressant. Indications: Depression, anxiety disorders, OCD, bulimia nervosa. Mechanism of Action: Inhibits serotonin reuptake in the brain.',
    dosage: '20–60 mg daily.',
    sideEffects: ['Nausea', 'insomnia', 'sexual dysfunction'],
    precautions: ['Increased suicide risk in young people', 'serotonin syndrome', 'Avoid with MAOIs', 'taper to stop.'],
    videoUrl: 'https://www.youtube.com/watch?v=3Q_B7DdKLj8',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Antidepressant',
    strength: '20 mg',
    form: 'Capsule',
    activeIngredient: 'Fluoxetine'
  },
  // Drug #22: Sertraline
  {
    id: 'sertraline',
    name: 'Sertraline',
    genericName: 'Sertraline',
    description: 'Drug Class: SSRI antidepressant. Indications: Depression, anxiety disorders, PTSD, OCD. Mechanism of Action: Inhibits serotonin reuptake.',
    dosage: '50–200 mg daily.',
    sideEffects: ['Diarrhea', 'insomnia', 'sexual dysfunction'],
    precautions: ['Serotonin syndrome', 'increased suicide risk in young adults', 'Avoid with MAOIs', 'taper slowly to discontinue.'],
    videoUrl: 'https://www.youtube.com/watch?v=fFoy2-IrCv8',
    manufacturer: 'Global Pharma Inc.',
    expiryDate: '2026-12-31',
    category: 'Antidepressant',
    strength: '50 mg',
    form: 'Tablet',
    activeIngredient: 'Sertraline'
  },
];

export const getDrugById = (id: string): DrugInfo | undefined => {
  return drugsDatabase.find(drug => drug.id === id);
};

export const getAllDrugs = (): DrugInfo[] => {
  return drugsDatabase;
};