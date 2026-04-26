export interface Topic {
  id: string;
  subject: string;
  topic: string;
  completed: boolean;
}

export interface DaySchedule {
  day: number;
  week: number;
  phase: string;
  dailyGoal: string;
  topics: Topic[];
}

export const subjectColors: Record<string, string> = {
  History: "bg-red-100 text-red-800 border-red-300",
  Geography: "bg-blue-100 text-blue-800 border-blue-300",
  Polity: "bg-purple-100 text-purple-800 border-purple-300",
  Economics: "bg-yellow-100 text-yellow-800 border-yellow-300",
  Biology: "bg-green-100 text-green-800 border-green-300",
  Physics: "bg-indigo-100 text-indigo-800 border-indigo-300",
  Chemistry: "bg-orange-100 text-orange-800 border-orange-300",
  Revision: "bg-gray-100 text-gray-800 border-gray-300",
};

export const subjectBadgeColors: Record<string, string> = {
  History: "bg-red-500",
  Geography: "bg-blue-500",
  Polity: "bg-purple-500",
  Economics: "bg-yellow-500",
  Biology: "bg-green-500",
  Physics: "bg-indigo-500",
  Chemistry: "bg-orange-500",
  Revision: "bg-gray-500",
};

const rawSchedule: Array<{ day: number; week: number; phase: string; dailyGoal: string; topics: Array<{ subject: string; topic: string }> }> = [
  // WEEK 1 - History (Ancient)
  { day: 1, week: 1, phase: "Phase 1: Ancient & Medieval History", dailyGoal: "Cover Stone Age & Indus Valley – read, make notes, revise", topics: [{ subject: "History", topic: "Stone Age" }, { subject: "History", topic: "Indus Valley Civilization" }] },
  { day: 2, week: 1, phase: "Phase 1: Ancient & Medieval History", dailyGoal: "Cover Vedic Age & Buddhism/Jainism – focus on key facts", topics: [{ subject: "History", topic: "Vedic Age" }, { subject: "History", topic: "Buddhism and Jainism" }] },
  { day: 3, week: 1, phase: "Phase 1: Ancient & Medieval History", dailyGoal: "Cover Mahajanapadas, Mauryan Empire – make bullet points", topics: [{ subject: "History", topic: "Mahajanapadas and Magdha" }, { subject: "History", topic: "Mauryan Empire" }] },
  { day: 4, week: 1, phase: "Phase 1: Ancient & Medieval History", dailyGoal: "Cover Post-Mauryan & Sangam Age – note dynasties & rulers", topics: [{ subject: "History", topic: "Post Mauryan Empire" }, { subject: "History", topic: "Sangam Age" }] },
  { day: 5, week: 1, phase: "Phase 1: Ancient & Medieval History", dailyGoal: "Cover Gupta Era & Post-Gupta Era – golden age facts", topics: [{ subject: "History", topic: "Gupta Era" }, { subject: "History", topic: "Post - Gupta Era" }] },
  { day: 6, week: 1, phase: "Phase 1: Ancient & Medieval History", dailyGoal: "Cover Cholas & Invasion of Islam – important battles & dates", topics: [{ subject: "History", topic: "Cholas and Tripartite Struggle" }, { subject: "History", topic: "Invasion of Islam" }] },
  { day: 7, week: 1, phase: "Phase 1: Ancient & Medieval History", dailyGoal: "REVISION DAY – Revise all Week 1 History topics", topics: [{ subject: "Revision", topic: "Revise: Stone Age to Invasion of Islam" }, { subject: "Revision", topic: "Practice MCQs on Ancient History" }] },

  // WEEK 2 - History (Medieval + Modern Start)
  { day: 8, week: 2, phase: "Phase 1: Medieval & Modern History", dailyGoal: "Cover Delhi Sultanate Parts 1 & 2 – rulers, battles, admin", topics: [{ subject: "History", topic: "Delhi Sultanate (Part-01 & 02)" }, { subject: "History", topic: "Vijaynagar Empire & Bahmani Kingdom" }] },
  { day: 9, week: 2, phase: "Phase 1: Medieval & Modern History", dailyGoal: "Cover Mughal Empire Parts 1 & 2 – key emperors, events", topics: [{ subject: "History", topic: "Mughal Empire (Part -1 & 02)" }, { subject: "History", topic: "Aurangzeb and Later Mughals" }] },
  { day: 10, week: 2, phase: "Phase 1: Medieval & Modern History", dailyGoal: "Cover Bhakti/Sufi, Marathas – movements & impact", topics: [{ subject: "History", topic: "Bhakti & Sufi Movements" }, { subject: "History", topic: "Marathas" }] },
  { day: 11, week: 2, phase: "Phase 1: Medieval & Modern History", dailyGoal: "Cover Advent of Europeans & Socio-Religious Reforms", topics: [{ subject: "History", topic: "Advent of Europeans" }, { subject: "History", topic: "Socio Religious Reform Movements" }] },
  { day: 12, week: 2, phase: "Phase 1: Medieval & Modern History", dailyGoal: "Cover Revolt of 1857 & Indian National Congress", topics: [{ subject: "History", topic: "Revolt of 1857" }, { subject: "History", topic: "Indian National Congress INC" }] },
  { day: 13, week: 2, phase: "Phase 1: Medieval & Modern History", dailyGoal: "Cover Partition of Bengal, Gandhian Era, Bhagat Singh", topics: [{ subject: "History", topic: "Partition of Bengal" }, { subject: "History", topic: "Gandhian Era" }, { subject: "History", topic: "Bhagat Singh and Revolutionary Activities" }] },
  { day: 14, week: 2, phase: "Phase 1: Medieval & Modern History", dailyGoal: "REVISION DAY – Revise Medieval & Modern History + MCQs", topics: [{ subject: "Revision", topic: "Revise: Delhi Sultanate to Bhagat Singh" }, { subject: "Revision", topic: "Practice MCQs on Medieval & Modern History" }] },

  // WEEK 3 - History finish + Geography start
  { day: 15, week: 3, phase: "Phase 2: Modern History Complete + Geography", dailyGoal: "Finish Modern History – Civil Disobedience & Quit India", topics: [{ subject: "History", topic: "Civil Disobedience Movement" }, { subject: "History", topic: "Quit India Movement" }] },
  { day: 16, week: 3, phase: "Phase 2: Geography", dailyGoal: "Cover Solar System & Latitude/Longitude – key facts & diagrams", topics: [{ subject: "Geography", topic: "Solar System" }, { subject: "Geography", topic: "Latitude & Longitude" }] },
  { day: 17, week: 3, phase: "Phase 2: Geography", dailyGoal: "Cover Earth's Interior, Plate Tectonics & Continent/Ocean", topics: [{ subject: "Geography", topic: "Earth's Interior & Plate Tectonics" }, { subject: "Geography", topic: "Continent & Ocean" }] },
  { day: 18, week: 3, phase: "Phase 2: Geography", dailyGoal: "Cover Rock & Volcano, Geomorphology – land formation", topics: [{ subject: "Geography", topic: "Rock & Volcano" }, { subject: "Geography", topic: "Geomorphology" }] },
  { day: 19, week: 3, phase: "Phase 2: Geography", dailyGoal: "Cover Landforms, Atmosphere – types, layers, composition", topics: [{ subject: "Geography", topic: "Landforms" }, { subject: "Geography", topic: "Atmosphere" }] },
  { day: 20, week: 3, phase: "Phase 2: Geography", dailyGoal: "Cover Condensation & Precipitation, Winds – patterns & types", topics: [{ subject: "Geography", topic: "Condensation & Precipitation" }, { subject: "Geography", topic: "Winds" }] },
  { day: 21, week: 3, phase: "Phase 2: Geography", dailyGoal: "REVISION DAY – Revise History (all) + Geography Week 3", topics: [{ subject: "Revision", topic: "Revise all History topics (Quick)" }, { subject: "Revision", topic: "Revise Geography – Solar to Winds" }] },

  // WEEK 4 - Geography complete
  { day: 22, week: 4, phase: "Phase 2: Geography", dailyGoal: "Cover Cyclone & Ocean, India & Its Location", topics: [{ subject: "Geography", topic: "Cyclone & Ocean" }, { subject: "Geography", topic: "India & Its Location" }] },
  { day: 23, week: 4, phase: "Phase 2: Geography", dailyGoal: "Cover Himalayas & Peninsular Plateau – relief features", topics: [{ subject: "Geography", topic: "Himalayas" }, { subject: "Geography", topic: "Peninsular Plateau" }] },
  { day: 24, week: 4, phase: "Phase 2: Geography", dailyGoal: "Cover Plains & Islands, Himalayan River System", topics: [{ subject: "Geography", topic: "Plains & Island" }, { subject: "Geography", topic: "Himalayan River System" }] },
  { day: 25, week: 4, phase: "Phase 2: Geography", dailyGoal: "Cover Peninsular River System, Dams/Lakes/Waterfall", topics: [{ subject: "Geography", topic: "Peninsular River System" }, { subject: "Geography", topic: "Dams Lake & Waterfall" }] },
  { day: 26, week: 4, phase: "Phase 2: Geography", dailyGoal: "Cover Forest & Grassland, Soil – types & distribution", topics: [{ subject: "Geography", topic: "Forest & Grassland" }, { subject: "Geography", topic: "Soil" }] },
  { day: 27, week: 4, phase: "Phase 2: Geography", dailyGoal: "Cover Agriculture, Minerals, Transport", topics: [{ subject: "Geography", topic: "Agriculture" }, { subject: "Geography", topic: "Minerals" }, { subject: "Geography", topic: "Transport" }] },
  { day: 28, week: 4, phase: "Phase 2: Geography", dailyGoal: "Cover World Map & Human Geography + REVISION", topics: [{ subject: "Geography", topic: "World Map" }, { subject: "Geography", topic: "Human Geography" }, { subject: "Revision", topic: "Revise complete Geography" }] },

  // WEEK 5 - Polity
  { day: 29, week: 5, phase: "Phase 3: Indian Polity", dailyGoal: "Cover Making of Constitution & Salient Features", topics: [{ subject: "Polity", topic: "Making of Constitution" }, { subject: "Polity", topic: "Salient Features of Constitution" }] },
  { day: 30, week: 5, phase: "Phase 3: Indian Polity", dailyGoal: "Cover Preamble & Parts 1 and 2 of Constitution", topics: [{ subject: "Polity", topic: "Preamble" }, { subject: "Polity", topic: "Part 1 and 2 of Constitution" }] },
  { day: 31, week: 5, phase: "Phase 3: Indian Polity", dailyGoal: "Cover Fundamental Rights & DPSP + Fundamental Duties", topics: [{ subject: "Polity", topic: "Fundamental Rights" }, { subject: "Polity", topic: "DPSP and Fundamental Duties" }] },
  { day: 32, week: 5, phase: "Phase 3: Indian Polity", dailyGoal: "Cover President & Vice-President – powers, election", topics: [{ subject: "Polity", topic: "President and Vice-President" }, { subject: "Polity", topic: "PM & CoM" }] },
  { day: 33, week: 5, phase: "Phase 3: Indian Polity", dailyGoal: "Cover Parliament Part 1 & State Legislature", topics: [{ subject: "Polity", topic: "Parliament - Part -1" }, { subject: "Polity", topic: "State Legislature" }] },
  { day: 34, week: 5, phase: "Phase 3: Indian Polity", dailyGoal: "Cover Courts & Local Bodies – judiciary structure", topics: [{ subject: "Polity", topic: "Courts" }, { subject: "Polity", topic: "Local Bodies" }] },
  { day: 35, week: 5, phase: "Phase 3: Indian Polity", dailyGoal: "REVISION DAY – Revise complete Polity + MCQs", topics: [{ subject: "Revision", topic: "Revise: Constitution to Local Bodies" }, { subject: "Polity", topic: "Constitutional and Non-Constitutional Bodies" }] },

  // WEEK 6 - Polity finish + Economics
  { day: 36, week: 6, phase: "Phase 3: Polity + Economics", dailyGoal: "Cover Emergency, Amendments & Inter State Relations", topics: [{ subject: "Polity", topic: "Emergency, Amendments & Inter State Relations" }, { subject: "Revision", topic: "Quick revision of entire Polity" }] },
  { day: 37, week: 6, phase: "Phase 4: Economics", dailyGoal: "Cover Basics of Economy & Microeconomics", topics: [{ subject: "Economics", topic: "Basics of Economy" }, { subject: "Economics", topic: "Microeconomics" }] },
  { day: 38, week: 6, phase: "Phase 4: Economics", dailyGoal: "Cover Inflation/Unemployment & National Income", topics: [{ subject: "Economics", topic: "Inflation and Unemployment" }, { subject: "Economics", topic: "National Income" }] },
  { day: 39, week: 6, phase: "Phase 4: Economics", dailyGoal: "Cover Budget & Taxation, Money & Banking", topics: [{ subject: "Economics", topic: "Budget & Taxation" }, { subject: "Economics", topic: "Money & Banking" }] },
  { day: 40, week: 6, phase: "Phase 4: Economics", dailyGoal: "Cover Banking System & Balance of Payments", topics: [{ subject: "Economics", topic: "Banking System" }, { subject: "Economics", topic: "Balance of Payments" }] },
  { day: 41, week: 6, phase: "Phase 4: Economics", dailyGoal: "Cover Poverty & Five Year Plans – schemes & programs", topics: [{ subject: "Economics", topic: "Poverty" }, { subject: "Economics", topic: "Five Year Plan" }] },
  { day: 42, week: 6, phase: "Phase 4: Economics", dailyGoal: "REVISION DAY – Revise Economics + Practice MCQs", topics: [{ subject: "Revision", topic: "Revise complete Economics" }, { subject: "Revision", topic: "Economics MCQ Practice" }] },

  // WEEK 7 - Biology
  { day: 43, week: 7, phase: "Phase 5: Biology", dailyGoal: "Cover Cell & Plant Tissue – structure, functions", topics: [{ subject: "Biology", topic: "Cell" }, { subject: "Biology", topic: "Plant Tissue" }] },
  { day: 44, week: 7, phase: "Phase 5: Biology", dailyGoal: "Cover Animal Tissue & Plant Kingdom", topics: [{ subject: "Biology", topic: "Animal Tissue" }, { subject: "Biology", topic: "Plant Kingdom" }] },
  { day: 45, week: 7, phase: "Phase 5: Biology", dailyGoal: "Cover Animal Kingdom & Nervous System", topics: [{ subject: "Biology", topic: "Animal Kingdom" }, { subject: "Biology", topic: "Nervous System" }] },
  { day: 46, week: 7, phase: "Phase 5: Biology", dailyGoal: "Cover Hormones & Movements, Reproduction", topics: [{ subject: "Biology", topic: "Hormones & Movements" }, { subject: "Biology", topic: "Reproduction" }] },
  { day: 47, week: 7, phase: "Phase 5: Biology", dailyGoal: "Cover Digestive & Respiratory + Circulatory & Excretory", topics: [{ subject: "Biology", topic: "Digestive & Respiratory" }, { subject: "Biology", topic: "Circulatory & Excretory" }] },
  { day: 48, week: 7, phase: "Phase 5: Biology", dailyGoal: "Cover Diseases, Nutrition & Genetics & Skeletal", topics: [{ subject: "Biology", topic: "Diseases" }, { subject: "Biology", topic: "Nutrition" }, { subject: "Biology", topic: "Genetics & Skeletal" }] },
  { day: 49, week: 7, phase: "Phase 5: Biology", dailyGoal: "REVISION DAY – Revise complete Biology + MCQs", topics: [{ subject: "Revision", topic: "Revise complete Biology" }, { subject: "Revision", topic: "Biology MCQ Practice" }] },

  // WEEK 8 - Physics + Chemistry
  { day: 50, week: 8, phase: "Phase 6: Physics", dailyGoal: "Cover Motion & Force and Laws of Motion", topics: [{ subject: "Physics", topic: "Motion" }, { subject: "Physics", topic: "Force and Laws of Motion" }] },
  { day: 51, week: 8, phase: "Phase 6: Physics", dailyGoal: "Cover Gravitation & Work Done, Sound", topics: [{ subject: "Physics", topic: "Gravitation and Work Done" }, { subject: "Physics", topic: "Sound" }] },
  { day: 52, week: 8, phase: "Phase 6: Physics", dailyGoal: "Cover Reflection & Refraction, Human Eye & Vision", topics: [{ subject: "Physics", topic: "Reflection & Refraction" }, { subject: "Physics", topic: "Human Eye & Vision" }] },
  { day: 53, week: 8, phase: "Phase 6: Physics + Chemistry", dailyGoal: "Cover Electricity, Magnetic Effect + Matter", topics: [{ subject: "Physics", topic: "Electricity" }, { subject: "Physics", topic: "Magnetic Effect and Current" }, { subject: "Chemistry", topic: "Matter" }] },
  { day: 54, week: 8, phase: "Phase 6: Chemistry", dailyGoal: "Cover Atom & Its Structure, Periodic Table", topics: [{ subject: "Chemistry", topic: "Atom and Its Structure" }, { subject: "Chemistry", topic: "Periodic Table" }] },
  { day: 55, week: 8, phase: "Phase 6: Chemistry", dailyGoal: "Cover Chemical Reactions, Metals & Non-Metals", topics: [{ subject: "Chemistry", topic: "Chemical Reactions" }, { subject: "Chemistry", topic: "Metals and Non-Metals" }] },
  { day: 56, week: 8, phase: "Phase 6: Chemistry", dailyGoal: "Cover Acid, Base & Salt, Carbon & Its Compounds + Revision", topics: [{ subject: "Chemistry", topic: "Acid, Base and Salt" }, { subject: "Chemistry", topic: "Carbon & Its Compounds" }, { subject: "Revision", topic: "Revise Physics & Chemistry" }] },

  // WEEK 9 - Full Revision
  { day: 57, week: 9, phase: "Phase 7: Full Revision", dailyGoal: "Full Revision – History (Ancient + Medieval) – Quick bullets", topics: [{ subject: "Revision", topic: "Ancient History – Quick Revision" }, { subject: "Revision", topic: "Medieval History – Quick Revision" }] },
  { day: 58, week: 9, phase: "Phase 7: Full Revision", dailyGoal: "Full Revision – Modern History + Geography", topics: [{ subject: "Revision", topic: "Modern History – Quick Revision" }, { subject: "Revision", topic: "Geography – Quick Revision" }] },
  { day: 59, week: 9, phase: "Phase 7: Full Revision", dailyGoal: "Full Revision – Polity + Economics", topics: [{ subject: "Revision", topic: "Polity – Quick Revision" }, { subject: "Revision", topic: "Economics – Quick Revision" }] },
  { day: 60, week: 9, phase: "Phase 7: Full Revision", dailyGoal: "FINAL DAY – Biology + Physics + Chemistry Revision + Mock Test", topics: [{ subject: "Revision", topic: "Biology – Quick Revision" }, { subject: "Revision", topic: "Physics & Chemistry – Quick Revision" }, { subject: "Revision", topic: "Final Mock Test Practice" }] },
];

export const generateSchedule = (): DaySchedule[] => {
  return rawSchedule.map((day) => ({
    ...day,
    topics: day.topics.map((t, idx) => ({
      id: `day${day.day}-topic${idx}`,
      subject: t.subject,
      topic: t.topic,
      completed: false,
    })),
  }));
};
