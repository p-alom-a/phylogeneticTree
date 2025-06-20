// Groupes taxonomiques et leurs couleurs
export const taxonomyGroups = {
  LUCA: "#6495ED", // Bleu clair
  Bacteria: "#FF6B6B", // Rouge
  Archaea: "#4ECDC4", // Turquoise
  Eukaryota: "#45B7D1", // Bleu
  Protista: "#96CEB4", // Vert clair
  Fungi: "#FFEEAD", // Jaune clair
  Plantae: "#88D8B0", // Vert
  Animalia: "#FF9999", // Rose
};

// Relations phylogénétiques
export const phylogeneticRelations = {
  LUCA: ["Bacteria", "Archaea", "Eukaryota"],
  Bacteria: ["Proteobacteria", "Firmicutes", "Actinobacteria", "Cyanobacteria", "Spirochaetes"],
  Archaea: ["Euryarchaeota", "Crenarchaeota", "Thaumarchaeota", "Korarchaeota"],
  Eukaryota: ["Protista", "Fungi", "Plantae", "Animalia"],
  Protista: ["Amoebozoa", "Excavata", "SAR", "Haptista", "Cryptista"],
  Fungi: ["Ascomycota", "Basidiomycota", "Zygomycota", "Chytridiomycota", "Glomeromycota"],
  Plantae: ["Bryophyta", "Pteridophyta", "Spermatophyta", "Chlorophyta", "Rhodophyta"],
  Animalia: ["Porifera", "Cnidaria", "Arthropoda", "Chordata", "Mollusca", "Echinodermata"],
  Proteobacteria: ["Alphaproteobacteria", "Betaproteobacteria", "Gammaproteobacteria", "Deltaproteobacteria"],
  Firmicutes: ["Bacilli", "Clostridia", "Negativicutes", "Tissierellia"],
  Actinobacteria: ["Actinomycetia", "Coriobacteriia", "Rubrobacteria", "Thermoleophilia"],
  Euryarchaeota: ["Methanobacteria", "Halobacteria", "Thermococci", "Archaeoglobi"],
  Crenarchaeota: ["Thermoprotei", "Nitrososphaeria", "Thermoplasmata"],
  Amoebozoa: ["Tubulinea", "Flabellinea", "Archamoebae", "Dictyostelia"],
  Excavata: ["Euglenozoa", "Parabasalia", "Fornicata", "Preaxostyla"],
  SAR: ["Stramenopiles", "Alveolata", "Rhizaria"],
  Ascomycota: ["Saccharomycetes", "Sordariomycetes", "Eurotiomycetes", "Dothideomycetes"],
  Basidiomycota: ["Agaricomycetes", "Tremellomycetes", "Pucciniomycetes", "Ustilaginomycetes"],
  Bryophyta: ["Sphagnopsida", "Andreaeopsida", "Polytrichopsida", "Bryopsida"],
  Pteridophyta: ["Lycopodiopsida", "Polypodiopsida", "Equisetopsida", "Psilotopsida"],
  Spermatophyta: ["Cycadopsida", "Ginkgoopsida", "Pinopsida", "Magnoliopsida"],
  Porifera: ["Demospongiae", "Hexactinellida", "Calcarea", "Homoscleromorpha"],
  Cnidaria: ["Anthozoa", "Scyphozoa", "Cubozoa", "Hydrozoa"],
  Arthropoda: ["Chelicerata", "Myriapoda", "Crustacea", "Hexapoda"],
  Chordata: ["Cephalochordata", "Tunicata", "Vertebrata"],
};

// Données taxonomiques simplifiées
export const taxonomyData = {
  LUCA: {
    name: "Last Universal Common Ancestor",
    group: "LUCA",
    period: -3800,
  },
  Bacteria: {
    name: "Bacteria",
    group: "Bacteria",
    period: -3500,
  },
  Archaea: {
    name: "Archaea",
    group: "Archaea",
    period: -3500,
  },
  Eukaryota: {
    name: "Eukaryota",
    group: "Eukaryota",
    period: -2100,
  },
  Proteobacteria: {
    name: "Proteobacteria",
    group: "Bacteria",
    period: -3000,
  },
  Firmicutes: {
    name: "Firmicutes",
    group: "Bacteria",
    period: -3000,
  },
  Actinobacteria: {
    name: "Actinobacteria",
    group: "Bacteria",
    period: -3000,
  },
  Cyanobacteria: {
    name: "Cyanobacteria",
    group: "Bacteria",
    period: -2800,
  },
  Spirochaetes: {
    name: "Spirochaetes",
    group: "Bacteria",
    period: -2900,
  },
  Euryarchaeota: {
    name: "Euryarchaeota",
    group: "Archaea",
    period: -3000,
  },
  Crenarchaeota: {
    name: "Crenarchaeota",
    group: "Archaea",
    period: -3000,
  },
  Thaumarchaeota: {
    name: "Thaumarchaeota",
    group: "Archaea",
    period: -2900,
  },
  Korarchaeota: {
    name: "Korarchaeota",
    group: "Archaea",
    period: -2900,
  },
  Protista: {
    name: "Protista",
    group: "Protista",
    period: -1800,
  },
  Fungi: {
    name: "Fungi",
    group: "Fungi",
    period: -1500,
  },
  Plantae: {
    name: "Plantae",
    group: "Plantae",
    period: -1200,
  },
  Animalia: {
    name: "Animalia",
    group: "Animalia",
    period: -600,
  },
  Amoebozoa: {
    name: "Amoebozoa",
    group: "Protista",
    period: -1700,
  },
  Excavata: {
    name: "Excavata",
    group: "Protista",
    period: -1700,
  },
  SAR: {
    name: "SAR",
    group: "Protista",
    period: -1700,
  },
  Haptista: {
    name: "Haptista",
    group: "Protista",
    period: -1600,
  },
  Cryptista: {
    name: "Cryptista",
    group: "Protista",
    period: -1600,
  },
  Ascomycota: {
    name: "Ascomycota",
    group: "Fungi",
    period: -1400,
  },
  Basidiomycota: {
    name: "Basidiomycota",
    group: "Fungi",
    period: -1400,
  },
  Zygomycota: {
    name: "Zygomycota",
    group: "Fungi",
    period: -1400,
  },
  Chytridiomycota: {
    name: "Chytridiomycota",
    group: "Fungi",
    period: -1300,
  },
  Glomeromycota: {
    name: "Glomeromycota",
    group: "Fungi",
    period: -1300,
  },
  Bryophyta: {
    name: "Bryophyta",
    group: "Plantae",
    period: -1100,
  },
  Pteridophyta: {
    name: "Pteridophyta",
    group: "Plantae",
    period: -1000,
  },
  Spermatophyta: {
    name: "Spermatophyta",
    group: "Plantae",
    period: -900,
  },
  Chlorophyta: {
    name: "Chlorophyta",
    group: "Plantae",
    period: -1200,
  },
  Rhodophyta: {
    name: "Rhodophyta",
    group: "Plantae",
    period: -1200,
  },
  Porifera: {
    name: "Porifera",
    group: "Animalia",
    period: -550,
  },
  Cnidaria: {
    name: "Cnidaria",
    group: "Animalia",
    period: -540,
  },
  Arthropoda: {
    name: "Arthropoda",
    group: "Animalia",
    period: -530,
  },
  Chordata: {
    name: "Chordata",
    group: "Animalia",
    period: -520,
  },
  Mollusca: {
    name: "Mollusca",
    group: "Animalia",
    period: -525,
  },
  Echinodermata: {
    name: "Echinodermata",
    group: "Animalia",
    period: -515,
  },
  Alphaproteobacteria: {
    name: "Alphaproteobacteria",
    group: "Bacteria",
    period: -2900,
  },
  Betaproteobacteria: {
    name: "Betaproteobacteria",
    group: "Bacteria",
    period: -2900,
  },
  Gammaproteobacteria: {
    name: "Gammaproteobacteria",
    group: "Bacteria",
    period: -2900,
  },
  Deltaproteobacteria: {
    name: "Deltaproteobacteria",
    group: "Bacteria",
    period: -2900,
  },
  Bacilli: {
    name: "Bacilli",
    group: "Bacteria",
    period: -2900,
  },
  Clostridia: {
    name: "Clostridia",
    group: "Bacteria",
    period: -2900,
  },
  Negativicutes: {
    name: "Negativicutes",
    group: "Bacteria",
    period: -2900,
  },
  Tissierellia: {
    name: "Tissierellia",
    group: "Bacteria",
    period: -2900,
  },
  Actinomycetia: {
    name: "Actinomycetia",
    group: "Bacteria",
    period: -2900,
  },
  Coriobacteriia: {
    name: "Coriobacteriia",
    group: "Bacteria",
    period: -2900,
  },
  Rubrobacteria: {
    name: "Rubrobacteria",
    group: "Bacteria",
    period: -2900,
  },
  Thermoleophilia: {
    name: "Thermoleophilia",
    group: "Bacteria",
    period: -2900,
  },
  Methanobacteria: {
    name: "Methanobacteria",
    group: "Archaea",
    period: -2900,
  },
  Halobacteria: {
    name: "Halobacteria",
    group: "Archaea",
    period: -2900,
  },
  Thermococci: {
    name: "Thermococci",
    group: "Archaea",
    period: -2900,
  },
  Archaeoglobi: {
    name: "Archaeoglobi",
    group: "Archaea",
    period: -2900,
  },
  Thermoprotei: {
    name: "Thermoprotei",
    group: "Archaea",
    period: -2900,
  },
  Nitrososphaeria: {
    name: "Nitrososphaeria",
    group: "Archaea",
    period: -2900,
  },
  Thermoplasmata: {
    name: "Thermoplasmata",
    group: "Archaea",
    period: -2900,
  },
  Tubulinea: {
    name: "Tubulinea",
    group: "Protista",
    period: -1600,
  },
  Flabellinea: {
    name: "Flabellinea",
    group: "Protista",
    period: -1600,
  },
  Archamoebae: {
    name: "Archamoebae",
    group: "Protista",
    period: -1600,
  },
  Dictyostelia: {
    name: "Dictyostelia",
    group: "Protista",
    period: -1600,
  },
  Euglenozoa: {
    name: "Euglenozoa",
    group: "Protista",
    period: -1600,
  },
  Parabasalia: {
    name: "Parabasalia",
    group: "Protista",
    period: -1600,
  },
  Fornicata: {
    name: "Fornicata",
    group: "Protista",
    period: -1600,
  },
  Preaxostyla: {
    name: "Preaxostyla",
    group: "Protista",
    period: -1600,
  },
  Stramenopiles: {
    name: "Stramenopiles",
    group: "Protista",
    period: -1600,
  },
  Alveolata: {
    name: "Alveolata",
    group: "Protista",
    period: -1600,
  },
  Rhizaria: {
    name: "Rhizaria",
    group: "Protista",
    period: -1600,
  },
  Saccharomycetes: {
    name: "Saccharomycetes",
    group: "Fungi",
    period: -1300,
  },
  Sordariomycetes: {
    name: "Sordariomycetes",
    group: "Fungi",
    period: -1300,
  },
  Eurotiomycetes: {
    name: "Eurotiomycetes",
    group: "Fungi",
    period: -1300,
  },
  Dothideomycetes: {
    name: "Dothideomycetes",
    group: "Fungi",
    period: -1300,
  },
  Agaricomycetes: {
    name: "Agaricomycetes",
    group: "Fungi",
    period: -1300,
  },
  Tremellomycetes: {
    name: "Tremellomycetes",
    group: "Fungi",
    period: -1300,
  },
  Pucciniomycetes: {
    name: "Pucciniomycetes",
    group: "Fungi",
    period: -1300,
  },
  Ustilaginomycetes: {
    name: "Ustilaginomycetes",
    group: "Fungi",
    period: -1300,
  },
  Sphagnopsida: {
    name: "Sphagnopsida",
    group: "Plantae",
    period: -1000,
  },
  Andreaeopsida: {
    name: "Andreaeopsida",
    group: "Plantae",
    period: -1000,
  },
  Polytrichopsida: {
    name: "Polytrichopsida",
    group: "Plantae",
    period: -1000,
  },
  Bryopsida: {
    name: "Bryopsida",
    group: "Plantae",
    period: -1000,
  },
  Lycopodiopsida: {
    name: "Lycopodiopsida",
    group: "Plantae",
    period: -900,
  },
  Polypodiopsida: {
    name: "Polypodiopsida",
    group: "Plantae",
    period: -900,
  },
  Equisetopsida: {
    name: "Equisetopsida",
    group: "Plantae",
    period: -900,
  },
  Psilotopsida: {
    name: "Psilotopsida",
    group: "Plantae",
    period: -900,
  },
  Cycadopsida: {
    name: "Cycadopsida",
    group: "Plantae",
    period: -800,
  },
  Ginkgoopsida: {
    name: "Ginkgoopsida",
    group: "Plantae",
    period: -800,
  },
  Pinopsida: {
    name: "Pinopsida",
    group: "Plantae",
    period: -800,
  },
  Magnoliopsida: {
    name: "Magnoliopsida",
    group: "Plantae",
    period: -800,
  },
  Demospongiae: {
    name: "Demospongiae",
    group: "Animalia",
    period: -500,
  },
  Hexactinellida: {
    name: "Hexactinellida",
    group: "Animalia",
    period: -500,
  },
  Calcarea: {
    name: "Calcarea",
    group: "Animalia",
    period: -500,
  },
  Homoscleromorpha: {
    name: "Homoscleromorpha",
    group: "Animalia",
    period: -500,
  },
  Anthozoa: {
    name: "Anthozoa",
    group: "Animalia",
    period: -490,
  },
  Scyphozoa: {
    name: "Scyphozoa",
    group: "Animalia",
    period: -490,
  },
  Cubozoa: {
    name: "Cubozoa",
    group: "Animalia",
    period: -490,
  },
  Hydrozoa: {
    name: "Hydrozoa",
    group: "Animalia",
    period: -490,
  },
  Chelicerata: {
    name: "Chelicerata",
    group: "Animalia",
    period: -480,
  },
  Myriapoda: {
    name: "Myriapoda",
    group: "Animalia",
    period: -480,
  },
  Crustacea: {
    name: "Crustacea",
    group: "Animalia",
    period: -480,
  },
  Hexapoda: {
    name: "Hexapoda",
    group: "Animalia",
    period: -480,
  },
  Cephalochordata: {
    name: "Cephalochordata",
    group: "Animalia",
    period: -470,
  },
  Tunicata: {
    name: "Tunicata",
    group: "Animalia",
    period: -470,
  },
  Vertebrata: {
    name: "Vertebrata",
    group: "Animalia",
    period: -470,
  },
}; 