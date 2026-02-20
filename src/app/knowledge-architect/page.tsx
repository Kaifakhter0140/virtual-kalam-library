'use client'

import { useState, useEffect, useRef } from 'react'

// 🏛️ MASTER KNOWLEDGE DATABASE: 80+ UNIQUE STEM ARCHITECTURES
const MASTER_DATA: Record<string, any> = {
  // --- PHYSICS (20 TOPICS) ---
  "Quantum Mechanics": { domain: "Physics", path: [
    { id: 9, title: "Atoms", sub: ["Bohr Model", "Subatomic Particles", "Valency"] },
    { id: 11, title: "Wave Motion", sub: ["Oscillation", "Frequency", "Phase Difference"] },
    { id: 12, title: "Dual Nature", sub: ["Photoelectric Effect", "De Broglie Waves"] },
    { id: "Target", title: "Quantum States", sub: ["Probability Density", "Energy Quantization"] }
  ]},
  "Electromagnetism": { domain: "Physics", path: [
    { id: 10, title: "Magnetic Effects", sub: ["Solenoids", "Right Hand Rule", "Magnetic Fields"] },
    { id: 12, title: "Electrostatics", sub: ["Gauss Law", "Coulomb Force", "Electric Flux"] },
    { id: "Target", title: "EM Induction", sub: ["Faraday’s Law", "Lenz’s Law", "Transformers"] }
  ]},
  "Ray Optics": { domain: "Physics", path: [
    { id: 10, title: "Light Basics", sub: ["Reflection", "Refraction", "Mirror Formula"] },
    { id: 12, title: "Lenses", sub: ["Lens Maker's Formula", "TIR", "Magnification"] },
    { id: "Target", title: "Optical Instruments", sub: ["Microscopes", "Telescopes", "Dispersion"] }
  ]},
  "Wave Optics": { domain: "Physics", path: [
    { id: 11, title: "Waves", sub: ["Superposition", "Beats", "Wave Speed"] },
    { id: 12, title: "Huygens Principle", sub: ["Wavefronts", "Refraction of Waves"] },
    { id: "Target", title: "Interference", sub: ["Young's Double Slit", "Diffraction", "Polarization"] }
  ]},
  "Thermodynamics": { domain: "Physics", path: [
    { id: 9, title: "Work & Energy", sub: ["Kinetic Energy", "Potential Energy", "Power"] },
    { id: 11, title: "Thermal Properties", sub: ["Laws of Thermo", "Entropy", "Enthalpy"] },
    { id: "Target", title: "Heat Engines", sub: ["Carnot Cycle", "Efficiency", "Isothermal Process"] }
  ]},
  "Rotational Motion": { domain: "Physics", path: [
    { id: 9, title: "Force & Laws", sub: ["Inertia", "Newton's Laws", "Friction"] },
    { id: 11, title: "Circular Motion", sub: ["Angular Velocity", "Centripetal Force"] },
    { id: "Target", title: "Rigid Bodies", sub: ["Moment of Inertia", "Torque", "Angular Momentum"] }
  ]},
  "Nuclear Physics": { domain: "Physics", path: [
    { id: 9, title: "Atoms", sub: ["Neutrons", "Protons", "Mass Number"] },
    { id: 12, title: "Nuclei", sub: ["Mass Defect", "Binding Energy", "Stability"] },
    { id: "Target", title: "Fission & Fusion", sub: ["Radioactivity", "Alpha Decay", "Half-Life"] }
  ]},
  "Current Electricity": { domain: "Physics", path: [
    { id: 10, title: "Electricity", sub: ["Ohm's Law", "Resistors", "Power"] },
    { id: 12, title: "Circuits", sub: ["Kirchhoff's Laws", "Wheatstone Bridge", "Potentiometer"] },
    { id: "Target", title: "Drift Velocity", sub: ["Resistivity", "Cells in Series/Parallel"] }
  ]},
  "Semiconductors": { domain: "Physics", path: [
    { id: 12, title: "Atomic Structure", sub: ["Energy Bands", "Valence Band"] },
    { id: "Target", title: "Electronic Devices", sub: ["P-N Junction", "Transistors", "Logic Gates"] }
  ]},
  "Gravitation": { domain: "Physics", path: [
    { id: 9, title: "Gravity", sub: ["Universal Law", "Free Fall", "Weight"] },
    { id: 11, title: "Kepler's Laws", sub: ["Planetary Motion", "Escape Velocity"] },
    { id: "Target", title: "Satellites", sub: ["Orbital Velocity", "Geostationary Satellites"] }
  ]},
  "Fluid Dynamics": { domain: "Physics", path: [
    { id: 9, title: "Pressure", sub: ["Thrust", "Buoyancy", "Archimedes"] },
    { id: 11, title: "Viscosity", sub: ["Surface Tension", "Bernoulli's Principle"] },
    { id: "Target", title: "Streamline Flow", sub: ["Reynolds Number", "Stokes Law"] }
  ]},
  "Kinetic Theory": { domain: "Physics", path: [
    { id: 9, title: "Matter", sub: ["States", "Molecular Motion"] },
    { id: 11, title: "Ideal Gases", sub: ["Gas Laws", "RMS Speed", "Mean Free Path"] },
    { id: "Target", title: "Degrees of Freedom", sub: ["Equipartition", "Specific Heat Capacities"] }
  ]},
  "SHM": { domain: "Physics", path: [
    { id: 9, title: "Motion", sub: ["Velocity", "Time Period"] },
    { id: 11, title: "Oscillations", sub: ["Simple Pendulum", "Spring Constant"] },
    { id: "Target", title: "Resonance", sub: ["Damped Oscillations", "Forced Oscillations"] }
  ]},
  "Electrostatics": { domain: "Physics", path: [
    { id: 10, title: "Charges", sub: ["Conductors", "Insulators"] },
    { id: 12, title: "Fields", sub: ["Electric Potential", "Capacitance", "Dielectrics"] },
    { id: "Target", title: "Gauss Law", sub: ["Flux Application", "Dipole Moment"] }
  ]},
  "Magnetism": { domain: "Physics", path: [
    { id: 10, title: "Magnets", sub: ["Poles", "Field Lines"] },
    { id: 12, title: "Materials", sub: ["Para/Dia/Ferromagnetism", "Curie Point"] },
    { id: "Target", title: "Earth's Field", sub: ["Declination", "Dip Angle"] }
  ]},
  "EM Waves": { domain: "Physics", path: [
    { id: 12, title: "Maxwell's Eq", sub: ["Displacement Current"] },
    { id: "Target", title: "Spectrum", sub: ["UV/IR/X-Rays", "Wave Characteristics"] }
  ]},
  "Kinematics": { domain: "Physics", path: [
    { id: 9, title: "Motion", sub: ["Distance/Displacement", "Acceleration"] },
    { id: 11, title: "Vectors", sub: ["Projectile Motion", "Relative Velocity"] },
    { id: "Target", title: "Calculus in Physics", sub: ["Instantaneous Velocity"] }
  ]},
  "Laws of Motion": { domain: "Physics", path: [
    { id: 9, title: "Newton", sub: ["1st, 2nd, 3rd Law"] },
    { id: 11, title: "Momentum", sub: ["Impulse", "Conservation of Momentum"] },
    { id: "Target", title: "Circular Banking", sub: ["Centripetal Force Logic"] }
  ]},
  "Work Energy": { domain: "Physics", path: [
    { id: 9, title: "Energy", sub: ["Work-Energy Theorem"] },
    { id: 11, title: "Collisions", sub: ["Elastic/Inelastic Collisions"] },
    { id: "Target", title: "Power Systems", sub: ["Vertical Circular Motion"] }
  ]},
  "Solids Properties": { domain: "Physics", path: [
    { id: 9, title: "Forces", sub: ["Elasticity Basics"] },
    { id: 11, title: "Stress-Strain", sub: ["Young's Modulus", "Hooke's Law"] },
    { id: "Target", title: "Bulk Modulus", sub: ["Poission's Ratio"] }
  ]},

  // --- MATHS (20 TOPICS) ---
  "Integral Calculus": { domain: "Maths", path: [
    { id: 8, title: "Algebra", sub: ["Variables", "Linear Identities"] },
    { id: 11, title: "Differentiation", sub: ["Chain Rule", "Product Rule"] },
    { id: 12, title: "Integrals", sub: ["Substitution", "Partial Fractions"] },
    { id: "Target", title: "Definite Integrals", sub: ["Area Under Curves", "FTC"] }
  ]},
  "Trigonometry": { domain: "Maths", path: [
    { id: 9, title: "Geometry", sub: ["Similar Triangles", "Pythagoras"] },
    { id: 10, title: "Ratios", sub: ["Sin/Cos/Tan", "Complementary Angles"] },
    { id: 11, title: "Identities", sub: ["Compound Angles", "Multiple Angles"] },
    { id: "Target", title: "Inverse Trig", sub: ["Domain & Range", "Principal Values"] }
  ]},
  "Matrices": { domain: "Maths", path: [
    { id: 8, title: "Numbers", sub: ["Arithmatic Ops"] },
    { id: 12, title: "Algebra", sub: ["Determinants", "Adjoint", "Inverse"] },
    { id: "Target", title: "Linear Systems", sub: ["Cramer's Rule", "Matrix Inversion"] }
  ]},
  "Probability": { domain: "Maths", path: [
    { id: 9, title: "Stats", sub: ["Frequency", "Events"] },
    { id: 11, title: "Permutations", sub: ["Factorials", "Combinations"] },
    { id: 12, title: "Conditional", sub: ["Bayes' Theorem", "Bernoulli Trials"] },
    { id: "Target", title: "Distributions", sub: ["Binomial Distribution"] }
  ]},
  "Conic Sections": { domain: "Maths", path: [
    { id: 9, title: "Coordinates", sub: ["Distance Formula"] },
    { id: 11, title: "Straight Lines", sub: ["Slope", "Intercepts"] },
    { id: "Target", title: "Curves", sub: ["Parabola", "Ellipse", "Hyperbola"] }
  ]},
  "Complex Numbers": { domain: "Maths", path: [
    { id: 10, title: "Real Numbers", sub: ["Irrational Logic"] },
    { id: 11, title: "Imaginary Unit", sub: ["Argand Plane", "Modulus"] },
    { id: "Target", title: "De Moivre’s", sub: ["Roots of Unity", "Euler Form"] }
  ]},
  "Vectors": { domain: "Maths", path: [
    { id: 9, title: "Geometry", sub: ["Vectors vs Scalars"] },
    { id: 12, title: "Vector Algebra", sub: ["Dot Product", "Cross Product"] },
    { id: "Target", title: "3D Space", sub: ["Direction Ratios", "Planes"] }
  ]},
  "Continuity": { domain: "Maths", path: [
    { id: 11, title: "Limits", sub: ["L'Hopital's Rule", "Sandwich Theorem"] },
    { id: "Target", title: "Differentiability", sub: ["Point Continuity", "Differentiability"] }
  ]},
  "Sequences": { domain: "Maths", path: [
    { id: 10, title: "Arithmetic", sub: ["AP Series", "Common Difference"] },
    { id: 11, title: "Geometric", sub: ["GP Series", "Infinite Sum"] },
    { id: "Target", title: "Special Series", sub: ["HP Series", "Sum of Squares"] }
  ]},
  "Sets & Relations": { domain: "Maths", path: [
    { id: 11, title: "Sets", sub: ["Union", "Intersection", "Venn Diagrams"] },
    { id: 12, title: "Functions", sub: ["One-to-One", "Onto Functions"] },
    { id: "Target", title: "Composite Functions", sub: ["Binary Operations"] }
  ]},
  "Binomial Theorem": { domain: "Maths", path: [
    { id: 11, title: "Combinations", sub: ["Pascal Triangle", "NCr Formula"] },
    { id: "Target", title: "Expansion", sub: ["General Term", "Middle Term"] }
  ]},
  "Permutations": { domain: "Maths", path: [
    { id: 11, title: "Counting", sub: ["Multiplication Principle", "Factorials"] },
    { id: "Target", title: "Arrangements", sub: ["Circular Permutation", "Grouping"] }
  ]},
  "Differential Eq": { domain: "Maths", path: [
    { id: 12, title: "Calculus", sub: ["Integration", "Derivatives"] },
    { id: "Target", title: "Solvers", sub: ["Variable Separable", "Homogeneous"] }
  ]},
  "Statistics": { domain: "Maths", path: [
    { id: 10, title: "Mean/Median", sub: ["Standard Deviation"] },
    { id: 11, title: "Dispersion", sub: ["Variance", "Mean Deviation"] },
    { id: "Target", title: "Analysis", sub: ["Step Deviation Method"] }
  ]},
  "Mathematical Logic": { domain: "Maths", path: [
    { id: 11, title: "Statements", sub: ["Tautology", "Contradiction"] },
    { id: "Target", title: "Truth Tables", sub: ["Negation", "Conjunction"] }
  ]},
  "Area Under Curve": { domain: "Maths", path: [
    { id: 12, title: "Integration", sub: ["Definite Integrals"] },
    { id: "Target", title: "Applications", sub: ["Area between curves", "Parabola-Line Area"] }
  ]},
  "Straight Lines": { domain: "Maths", path: [
    { id: 9, title: "Distance", sub: ["Slope", "Collinearity"] },
    { id: 11, title: "Equations", sub: ["Point-Slope Form", "Normal Form"] },
    { id: "Target", title: "Angle", sub: ["Distance from point", "Parallel Lines"] }
  ]},
  "3D Geometry": { domain: "Maths", path: [
    { id: 11, title: "Coordinate Geometry", sub: ["3D Planes"] },
    { id: 12, title: "Lines", sub: ["Shortest Distance", "Plane-Line Angle"] },
    { id: "Target", title: "Planes", sub: ["Intercept form of Plane"] }
  ]},
  "Matrices Inversion": { domain: "Maths", path: [
    { id: 12, title: "Determinants", sub: ["Minors & Cofactors"] },
    { id: "Target", title: "Applications", sub: ["System of Equations"] }
  ]},
  "Limits": { domain: "Maths", path: [
    { id: 11, title: "Functions", sub: ["Domain & Range"] },
    { id: "Target", title: "Standard Limits", sub: ["Exponential/Log Limits"] }
  ]},

  // --- CHEMISTRY (20 TOPICS) ---
  "Organic Synthesis": { domain: "Chemistry", path: [
    { id: 10, title: "Carbon", sub: ["Covalent Bonds", "Hydrocarbons"] },
    { id: 11, title: "GOC", sub: ["Resonance", "Inductive Effect"] },
    { id: 12, title: "Haloalkanes", sub: ["SN1/SN2 Mechanism"] },
    { id: "Target", title: "Reactions", sub: ["Name Reactions", "Functional Groups"] }
  ]},
  "Chemical Bonding": { domain: "Chemistry", path: [
    { id: 9, title: "Atoms", sub: ["Valency", "Octet Rule"] },
    { id: 11, title: "VSEPR", sub: ["Hybridization", "Dipole Moment"] },
    { id: "Target", title: "MOT", sub: ["Bond Order", "Para/Diamagnetism"] }
  ]},
  "Equilibrium": { domain: "Chemistry", path: [
    { id: 10, title: "Acids/Bases", sub: ["pH Scale", "Indicators"] },
    { id: 11, title: "Le Chatelier", sub: ["Kc/Kp", "Pressure Shift"] },
    { id: "Target", title: "Ionic", sub: ["Solubility Product", "Buffer Solutions"] }
  ]},
  "Thermodynamics Chem": { domain: "Chemistry", path: [
    { id: 11, title: "Energy", sub: ["Hess Law", "Enthalpy"] },
    { id: "Target", title: "Entropy", sub: ["Gibbs Free Energy", "Spontaneity"] }
  ]},
  "Electrochemistry": { domain: "Chemistry", path: [
    { id: 10, title: "Redox", sub: ["Oxidation States"] },
    { id: 12, title: "Cells", sub: ["Nernst Equation", "Faraday's Laws"] },
    { id: "Target", title: "Fuel Cells", sub: ["Corrosion", "Conductance"] }
  ]},
  "Kinetics": { domain: "Chemistry", path: [
    { id: 12, title: "Reactions", sub: ["Order", "Molecularity"] },
    { id: "Target", title: "Rate Laws", sub: ["Half Life", "Arrhenius Equation"] }
  ]},
  "Solid State": { domain: "Chemistry", path: [
    { id: 12, title: "Crystals", sub: ["Unit Cells", "Packing Efficiency"] },
    { id: "Target", title: "Defects", sub: ["Schottky", "Frenkel", "Semiconductors"] }
  ]},
  "Solutions": { domain: "Chemistry", path: [
    { id: 10, title: "Mixtures", sub: ["Molarity", "Molality"] },
    { id: 12, title: "Properties", sub: ["Raoult's Law", "Osmosis"] },
    { id: "Target", title: "Van't Hoff", sub: ["Ideal/Non-ideal Solutions"] }
  ]},
  "Coordination": { domain: "Chemistry", path: [
    { id: 12, title: "Ligands", sub: ["Werner's Theory", "IUPAC"] },
    { id: "Target", title: "CFT", sub: ["Crystal Field Splitting", "Isomerism"] }
  ]},
  "Biomolecules": { domain: "Chemistry", path: [
    { id: 12, title: "Organic", sub: ["Proteins", "Carbs", "DNA"] },
    { id: "Target", title: "Vitamins", sub: ["Structures", "Deficiencies"] }
  ]},
  "Periodic Table": { domain: "Chemistry", path: [
    { id: 9, title: "Classification", sub: ["History", "Groups/Periods"] },
    { id: 11, title: "Trends", sub: ["Ionization Energy", "Electron Affinity"] },
    { id: "Target", title: "S/P/D/F", sub: ["Diagonal Relationship"] }
  ]},
  "Atomic Structure Chem": { domain: "Chemistry", path: [
    { id: 9, title: "Models", sub: ["Bohr", "Rutherford"] },
    { id: 11, title: "Quantum", sub: ["Quantum Numbers", "Aufbau Principle"] },
    { id: "Target", title: "Orbitals", sub: ["Hund's Rule", "Pauli Exclusion"] }
  ]},
  "States of Matter": { domain: "Chemistry", path: [
    { id: 9, title: "States", sub: ["Kinetic Theory"] },
    { id: 11, title: "Gases", sub: ["Boyle/Charles Law", "Ideal Gas Eq"] },
    { id: "Target", title: "Liquids", sub: ["Surface Tension", "Viscosity"] }
  ]},
  "Redox Reactions": { domain: "Chemistry", path: [
    { id: 10, title: "Oxidation", sub: ["Reducing Agents"] },
    { id: 11, title: "Balancing", sub: ["Ion-Electron Method"] },
    { id: "Target", title: "Titratios", sub: ["Indicator Logic"] }
  ]},
  "Hydrocarbons": { domain: "Chemistry", path: [
    { id: 11, title: "Organic", sub: ["Alkanes", "Alkenes", "Alkynes"] },
    { id: "Target", title: "Aromatic", sub: ["Benzene", "Electrophilic Substitution"] }
  ]},
  "Environmental": { domain: "Chemistry", path: [
    { id: 11, title: "Pollution", sub: ["Greenhouse Effect", "Global Warming"] },
    { id: "Target", title: "Soil", sub: ["Acid Rain", "Green Chemistry"] }
  ]},
  "Polymers": { domain: "Chemistry", path: [
    { id: 12, title: "Synthesis", sub: ["Addition", "Condensation"] },
    { id: "Target", title: "Types", sub: ["Buna-S", "Nylon 6,6", "Bakelite"] }
  ]},
  "Chemistry Everyday": { domain: "Chemistry", path: [
    { id: 12, title: "Drugs", sub: ["Analgesics", "Antibiotics"] },
    { id: "Target", title: "Soap", sub: ["Saponification", "Detergents"] }
  ]},
  "Surface Chemistry": { domain: "Chemistry", path: [
    { id: 12, title: "Adsorption", sub: ["Physisorption", "Chemisorption"] },
    { id: "Target", title: "Colloids", sub: ["Tyndall Effect", "Emulsions"] }
  ]},
  "Isolation Metals": { domain: "Chemistry", path: [
    { id: 12, title: "Metallurgy", sub: ["Concentration", "Calcination"] },
    { id: "Target", title: "Extraction", sub: ["Ellingham Diagram", "Hall-Heroult"] }
  ]},

  // --- BIOLOGY (20 TOPICS) ---
  "Genetics": { domain: "Biology", path: [
    { id: 10, title: "Heredity", sub: ["Mendel", "Traits"] },
    { id: 12, title: "Molecular", sub: ["DNA", "RNA", "Transcription"] },
    { id: "Target", title: "Genomics", sub: ["HGP", "DNA Fingerprinting"] }
  ]},
  "Evolution": { domain: "Biology", path: [
    { id: 9, title: "Classification", sub: ["Kingdoms"] },
    { id: 12, title: "Darwin", sub: ["Natural Selection", "Evidence"] },
    { id: "Target", title: "Origins", sub: ["Miller Experiment", "Human Evolution"] }
  ]},
  "Cell Biology": { domain: "Biology", path: [
    { id: 9, title: "Cell", sub: ["Organelles", "Nucleus"] },
    { id: 11, title: "Division", sub: ["Mitosis", "Meiosis"] },
    { id: "Target", title: "Cycle", sub: ["Phase Regulation", "G1/S/G2"] }
  ]},
  "Photosynthesis": { domain: "Biology", path: [
    { id: 11, title: "Plant Phys", sub: ["Chlorophyll", "Light Reaction"] },
    { id: "Target", title: "C3/C4", sub: ["Calvin Cycle", "Photorespiration"] }
  ]},
  "Human Health": { domain: "Biology", path: [
    { id: 9, title: "Health", sub: ["Diseases", "Pathogens"] },
    { id: 12, title: "Immunity", sub: ["Vaccines", "Antibodies"] },
    { id: "Target", title: "Cancer/HIV", sub: ["Prevention", "Treatment"] }
  ]},
  "Ecology": { domain: "Biology", path: [
    { id: 10, title: "Environment", sub: ["Ecosystem"] },
    { id: 12, title: "Biodiversity", sub: ["Population", "Conservation"] },
    { id: "Target", title: "Hotspots", sub: ["Global Warming", "Ozone Layer"] }
  ]},
  "Reproduction": { domain: "Biology", path: [
    { id: 10, title: "Life", sub: ["Asexual/Sexual"] },
    { id: 12, title: "Human", sub: ["Gametes", "Fertilization"] },
    { id: "Target", title: "Embryo", sub: ["Pregnancy", "Lactation"] }
  ]},
  "Biotechnology": { domain: "Biology", path: [
    { id: 12, title: "Principles", sub: ["PCR", "Cloning"] },
    { id: "Target", title: "Applications", sub: ["BT Cotton", "Gene Therapy"] }
  ]},
  "Plant Kingdom": { domain: "Biology", path: [
    { id: 9, title: "Diversity", sub: ["Algae", "Fungi"] },
    { id: 11, title: "Kingdom", sub: ["Bryophytes", "Gymnosperms"] },
    { id: "Target", title: "Angiosperms", sub: ["Dicot/Monocot"] }
  ]},
  "Animal Kingdom": { domain: "Biology", path: [
    { id: 11, title: "Phylum", sub: ["Porifera", "Chordata"] },
    { id: "Target", title: "Class", sub: ["Mammalia", "Reptilia"] }
  ]},
  "Structural Org": { domain: "Biology", path: [
    { id: 11, title: "Tissues", sub: ["Epithelial", "Connective"] },
    { id: "Target", title: "Morphology", sub: ["Frog", "Earthworm"] }
  ]},
  "Biomolecules Bio": { domain: "Biology", path: [
    { id: 11, title: "Proteins", sub: ["Amino Acids", "Enzymes"] },
    { id: "Target", title: "Carbs", sub: ["Polysaccharides", "Lipids"] }
  ]},
  "Mineral Nutrition": { domain: "Biology", path: [
    { id: 11, title: "Plants", sub: ["Macro/Micro Nutrients"] },
    { id: "Target", title: "Fixation", sub: ["Nitrogen Cycle"] }
  ]},
  "Respiration Plant": { domain: "Biology", path: [
    { id: 11, title: "Energy", sub: ["Glycolysis", "Krebs Cycle"] },
    { id: "Target", title: "ETS", sub: ["ATP Synthesis"] }
  ]},
  "Plant Growth": { domain: "Biology", path: [
    { id: 11, title: "Hormones", sub: ["Auxin", "Gibberellin"] },
    { id: "Target", title: "Photoperiodism", sub: ["Vernalization"] }
  ]},
  "Digestion": { domain: "Biology", path: [
    { id: 11, title: "Human Phys", sub: ["Enzymes", "Absorption"] },
    { id: "Target", title: "Disorders", sub: ["Jaundice", "Indigestion"] }
  ]},
  "Breathing": { domain: "Biology", path: [
    { id: 11, title: "Lungs", sub: ["Gas Transport", "O2/CO2 dissociation"] },
    { id: "Target", title: "Regulation", sub: ["Pneumotaxic center"] }
  ]},
  "Circulation": { domain: "Biology", path: [
    { id: 11, title: "Blood", sub: ["Heart", "ECG", "Double Circulation"] },
    { id: "Target", title: "Lymph", sub: ["Clotting Mechanisms"] }
  ]},
  "Excretion": { domain: "Biology", path: [
    { id: 11, title: "Kidney", sub: ["Nephron", "Urine formation"] },
    { id: "Target", title: "RAAS", sub: ["Osmoregulation"] }
  ]},
  "Neural Control": { domain: "Biology", path: [
    { id: 11, title: "Nervous System", sub: ["Brain", "Reflex Action"] },
    { id: "Target", title: "Senses", sub: ["Eye", "Ear Structure"] }
  ]}
};

export default function Architect() {
  const [selected, setSelected] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [mounted, setMounted] = useState(false)
  const visJsRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<any>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const initGraph = async () => {
      const vis = await import('vis-network/standalone')
      if (visJsRef.current) {
        let nodes: any[] = []
        let edges: any[] = []

        if (!selected) {
          // 🕸️ GLOBAL STATE: Show Subject Clusters
          nodes = [
            { id: 'root', label: 'K12_DNA', color: '#eab308', size: 45, font: { size: 20, face: 'Inter', weight: '900' } },
            { id: 'Physics', label: 'Physics', color: '#3b82f6', size: 30 },
            { id: 'Maths', label: 'Maths', color: '#ef4444', size: 30 },
            { id: 'Chemistry', label: 'Chemistry', color: '#10b981', size: 30 },
            { id: 'Biology', label: 'Biology', color: '#a855f7', size: 30 }
          ]
          edges = [
            { from: 'root', to: 'Physics' }, { from: 'root', to: 'Maths' },
            { from: 'root', to: 'Chemistry' }, { from: 'root', to: 'Biology' }
          ]

          // Sample topics around clusters
          Object.keys(MASTER_DATA).forEach((topicName) => {
            const topic = MASTER_DATA[topicName];
            nodes.push({ id: topicName, label: topicName, color: '#ffffff', size: 10, font: { size: 8, color: '#ffffff' } });
            edges.push({ from: topic.domain, to: topicName, opacity: 0.1 });
          });
        } else {
          // 🧠 TOPIC STATE: Visualize unique Neural Chain
          const data = MASTER_DATA[selected]
          nodes = [{ id: 'domain-hub', label: data.domain, color: '#ffffff', size: 30, font: { size: 12, weight: 'bold' } }]
          
          data.path.forEach((step: any, idx: number) => {
            const nodeID = `step-${idx}`
            nodes.push({
              id: nodeID,
              label: `${step.title}\n(Class ${step.id})`,
              color: step.id === 'Target' ? '#eab308' : '#3b82f6',
              size: step.id === 'Target' ? 35 : 20,
              font: { size: 10, color: '#ffffff' },
              // Custom field to identify original topic name if needed
              originalTopic: selected 
            })
            if (idx === 0) edges.push({ from: 'domain-hub', to: nodeID, length: 150 })
            if (idx > 0) edges.push({ from: `step-${idx - 1}`, to: nodeID, length: 100, arrows: 'to' })
          })
        }

        const options: any = {
          physics: { enabled: true, forceAtlas2Based: { gravitationalConstant: -100, springLength: 100 } },
          nodes: { shape: 'dot', font: { face: 'Inter' } },
          edges: { color: '#444444', smooth: { type: 'continuous' } },
          interaction: { hover: true }
        }

        if (networkRef.current) networkRef.current.destroy()
        networkRef.current = new vis.Network(visJsRef.current, { nodes, edges }, options)

        // 🎯 THE NEURAL LINK: Click node to Select Topic
        networkRef.current.on("click", (params: any) => {
          if (params.nodes.length > 0) {
            const clickedNodeId = params.nodes[0]
            // If it's a valid topic in our data, select it
            if (MASTER_DATA[clickedNodeId]) {
              setSelected(clickedNodeId)
            }
          }
        })
      }
    }
    initGraph()
  }, [selected, mounted])

  if (!mounted) return null

  const filtered = Object.keys(MASTER_DATA).filter(t => t.toLowerCase().includes(search.toLowerCase()))
  const currentData = selected ? MASTER_DATA[selected] : null

  return (
    <main className="min-h-screen bg-[#020202] text-white p-8 md:p-24 selection:bg-yellow-500 font-sans overflow-x-hidden">
      
      {/* 🎞️ CINEMATIC OVERLAY */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/A._P._J._Abdul_Kalam.jpg" className="absolute right-0 bottom-0 h-full grayscale brightness-[0.2]" alt="Kalam" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-24">
        
        {/* HEADER: CINEMATIC BRUTALISM */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 border-b border-white/5 pb-20">
          <div className="space-y-4">
            <h2 className="text-xl font-black tracking-[0.4em] text-white/30 italic uppercase underline decoration-yellow-500 underline-offset-8">Neural_Architecture</h2>
            <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">Architect.</h1>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-16 py-8 rounded-full bg-yellow-500 text-black font-black italic uppercase tracking-[0.4em] hover:bg-white transition-all shadow-[0_0_60px_rgba(234,179,8,0.4)] scale-110 active:scale-95"
          >
            Select_Topic
          </button>
        </div>

        {/* 📋 SELECT TOPIC CENTER: FULLSCREEN ARCHIVE */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6 animate-in fade-in duration-700">
            <div className="w-full max-w-6xl h-[85vh] bg-white/[0.02] border border-white/10 rounded-[4rem] p-12 overflow-hidden flex flex-col shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h4 className="text-4xl font-black italic uppercase tracking-tighter text-white">Knowledge_Vault [80+]</h4>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-600 hover:text-white font-black uppercase text-xs tracking-widest transition-colors">Close_Archive [X]</button>
              </div>
              <input 
                type="text" 
                placeholder="SEARCH_ACROSS_80+_CONCEPTS..." 
                className="w-full bg-transparent border-b border-white/10 py-6 text-3xl font-black italic uppercase outline-none focus:border-yellow-500 mb-12 transition-all"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 overflow-y-auto pr-6 custom-scrollbar">
                {filtered.map(topic => (
                  <button key={topic} onClick={() => { setSelected(topic); setIsModalOpen(false); }} className="p-8 rounded-[2rem] border border-white/5 hover:border-yellow-500 transition-all text-left group">
                    <span className="text-[7px] font-black text-yellow-500 uppercase mb-2 block tracking-widest">{MASTER_DATA[topic].domain}</span>
                    <h5 className="text-sm font-black italic uppercase tracking-tighter group-hover:text-yellow-500">{topic}</h5>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 🌳 ROOT-TO-SUMMIT ROADMAP: HIGH-DETAIL MIND MAP */}
        {selected && currentData && (
          <section className="animate-in slide-in-from-bottom-20 duration-1000">
            <div className="p-16 md:p-24 rounded-[4rem] bg-white text-black space-y-20 relative overflow-hidden shadow-2xl">
              <div className="flex items-center space-x-6">
                 <div className="w-16 h-2 bg-yellow-500 shadow-[0_0_20px_#eab308]" />
                 <h4 className="text-5xl font-black italic uppercase tracking-tighter leading-none">Diagnostic_Map: {selected}</h4>
              </div>

              <div className="flex flex-col md:flex-row items-stretch justify-center gap-10 relative py-10">
                {currentData.path.map((node: any, i: number) => (
                  <div key={i} className="flex flex-col items-center flex-1 space-y-6">
                    <div className={`w-full p-10 rounded-[3rem] transition-all duration-700 ${node.id === 'Target' ? 'bg-yellow-500 text-black shadow-2xl scale-110' : 'bg-zinc-50 border border-black/5 hover:bg-black hover:text-white group'}`}>
                       <span className={`text-[10px] font-black mb-4 block uppercase tracking-widest ${node.id === 'Target' ? 'text-black/40' : 'text-yellow-600'}`}>
                         {node.id === 'Target' ? 'Mastery_Goal' : `Prerequisite (Class ${node.id})`}
                       </span>
                       <h5 className="text-2xl font-black uppercase italic tracking-tighter mb-6 group-hover:text-yellow-500">{node.title}</h5>
                       <ul className="space-y-4">
                         {node.sub.map((s: string) => (
                           <li key={s} className="text-[11px] font-bold uppercase flex items-center gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                             <div className="w-2 h-2 rounded-full bg-yellow-500" /> {s}
                           </li>
                         ))}
                       </ul>
                    </div>
                    {i < currentData.path.length - 1 && <div className="text-5xl font-black opacity-20 rotate-90 md:rotate-0 transition-opacity">→</div>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 🕸️ INTERACTIVE K12 GRAPH: DYNAMIC NEURAL PATHS */}
        <section className="pt-40 space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-1 bg-yellow-500 shadow-[0_0_20px_#eab308]" />
              <h3 className="text-5xl font-black italic uppercase tracking-tighter text-white">Visual_Dependency_Network</h3>
            </div>
            {selected && (
               <button onClick={() => setSelected(null)} className="text-[10px] font-black text-yellow-500 uppercase tracking-widest border-b border-yellow-500 pb-1">Reset_to_Global_Map</button>
            )}
          </div>
          <div className="relative w-full h-[70vh] rounded-[4rem] border border-white/5 bg-white/[0.01] overflow-hidden shadow-inner cursor-crosshair">
            <div ref={visJsRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
          </div>
        </section>
      </div>

      <footer className="py-60 text-center opacity-10 italic font-black text-[10px] tracking-[3em] uppercase border-t border-white/[0.03]">
        KalamHub_Virtual // 2026
      </footer>
    </main>
  )
}