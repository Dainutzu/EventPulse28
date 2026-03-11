export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string; // Misc category: Sports, Music, Social, Workshops, Hackathons
  faculty: string;  // Faculty category: Computing, Business, Architecture, Humanities & Sciences, Law, Hospitality
  organizer: string;
  description: string;
  price: string;
}

export const events: Event[] = [
  {
    id: "1",
    title: "AI Hackathon 2026",
    date: "March 20, 2026",
    time: "9:00 AM",
    location: "Computing Lab Block A",
    category: "Hackathons",
    faculty: "Computing",
    organizer: "Computing Society",
    price: "Free",
    description: "The ultimate 24-hour coding challenge. Build, innovate, and win prizes for the best AI-driven solutions. Mentors from top tech firms will be available."
  },
  {
    id: "2",
    title: "Startup Pitch Night",
    date: "March 25, 2026",
    time: "6:00 PM",
    location: "Business School Auditorium",
    category: "Workshops",
    faculty: "Business",
    organizer: "Entrepreneurship Club",
    price: "Free",
    description: "Pitch your startup idea to actual investors. Gain feedback, networking opportunities, and a chance for seed funding."
  },
  {
    id: "3",
    title: "Design Expo '26",
    date: "April 2, 2026",
    time: "10:00 AM",
    location: "Architecture Gallery",
    category: "Social",
    faculty: "Architecture",
    organizer: "Design Collective",
    price: "Free",
    description: "A showcase of sustainable and urban design projects by graduating students. Explore the future of architecture."
  },
  {
    id: "4",
    title: "Legal Debate Forum",
    date: "April 8, 2026",
    time: "2:00 PM",
    location: "Law Moot Court",
    category: "Social",
    faculty: "Law",
    organizer: "Legal Society",
    price: "$5",
    description: "A high-stakes debate forum on the ethics of AI in modern law. Open to all students for observation and Q&A."
  },
  {
    id: "5",
    title: "Hospitality Workshop",
    date: "April 14, 2026",
    time: "11:00 AM",
    location: "Hospitality Suite",
    category: "Workshops",
    faculty: "Hospitality",
    organizer: "Hospitality School",
    price: "$10",
    description: "Learn the art of fine dining management and hospitality excellence from industry professionals."
  },
  {
    id: "6",
    title: "Research Symposium",
    date: "April 19, 2026",
    time: "9:00 AM",
    location: "Main Seminar Hall",
    category: "Social",
    faculty: "Humanities & Sciences",
    organizer: "Science Union",
    price: "Free",
    description: "Interdisciplinary research presentations covering everything from climate science to modern philosophy."
  },
  {
    id: "7",
    title: "University Sports Meet",
    date: "April 26, 2026",
    time: "7:00 AM",
    location: "Sports Complex",
    category: "Sports",
    faculty: "Misc",
    organizer: "Sports Union",
    price: "Free",
    description: "The biggest inter-faculty sports competition. Athletics, team sports, and spirit trophies up for grabs!"
  },
  {
    id: "8",
    title: "Live Music Night",
    date: "May 3, 2026",
    time: "7:30 PM",
    location: "Campus Amphitheatre",
    category: "Music",
    faculty: "Misc",
    organizer: "Music Society",
    price: "Free",
    description: "A night of acoustic and rock performances by campus bands. Food courts and chill vibes included."
  },
  {
    id: "9",
    title: "Entrepreneurship Summit",
    date: "May 10, 2026",
    time: "10:00 AM",
    location: "Grand Ballroom",
    category: "Workshops",
    faculty: "Business",
    organizer: "Entrepreneurship Club",
    price: "$15",
    description: "Keynote speeches from successful alumni and workshops on scaling small businesses."
  },
  {
    id: "10",
    title: "Cultural Festival",
    date: "May 15, 2026",
    time: "4:00 PM",
    location: "Central Square",
    category: "Social",
    faculty: "Misc",
    organizer: "Student Council",
    price: "Free",
    description: "Celebrating diversity with food, dance, and art from over 20 different cultures represented on campus."
  }
];

export const facultyCategories = [
  "Computing",
  "Business",
  "Architecture",
  "Humanities & Sciences",
  "Law",
  "Hospitality"
];

export const miscCategories = [
  "Sports",
  "Music",
  "Social",
  "Workshops",
  "Hackathons"
];

export const categoryColors: Record<string, string> = {
  Computing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Business: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  Architecture: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  Law: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Hospitality: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  "Humanities & Sciences": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  Sports: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  Music: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  Social: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
  Workshops: "bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  Hackathons: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  Misc: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
};
