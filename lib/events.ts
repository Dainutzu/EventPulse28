export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  description: string;
  organizer: string;
  time: string;
}

export const events: Event[] = [
  {
    id: "1",
    title: "Hackathon 2026",
    date: "March 20, 2026",
    time: "9:00 AM",
    location: "Faculty of Computing, Lab Block A",
    category: "Computing",
    organizer: "Faculty of Computing",
    description:
      "Join us for a 24-hour coding marathon where teams compete to build innovative software solutions. Open to all students across faculties. Prizes worth over $5,000 await the top three teams. Mentors from leading tech companies will be on-site to guide participants.",
  },
  {
    id: "2",
    title: "Startup Pitch Night",
    date: "March 25, 2026",
    time: "6:00 PM",
    location: "Business School Auditorium",
    category: "Business",
    organizer: "School of Business",
    description:
      "Present your startup idea to a panel of investors and industry veterans. Whether you have a business plan or just a concept, this is your chance to get feedback, mentorship, and potentially secure seed funding. Networking dinner follows the pitching session.",
  },
  {
    id: "3",
    title: "Design Exhibition",
    date: "April 2, 2026",
    time: "10:00 AM",
    location: "Architecture Gallery, Main Campus",
    category: "Architecture",
    organizer: "School of Architecture",
    description:
      "A curated showcase of student design projects spanning urban planning, sustainable architecture, and interior design. Explore the creative visions of tomorrow's architects and designers. Industry professionals will provide live critique sessions throughout the day.",
  },
  {
    id: "4",
    title: "Legal Forum 2026",
    date: "April 8, 2026",
    time: "2:00 PM",
    location: "Law Faculty Moot Court",
    category: "Law",
    organizer: "School of Law",
    description:
      "An annual symposium bringing together legal scholars, practitioners, and students to discuss pressing issues in contemporary law. This year's theme is Technology and the Law. Guest speakers include senior counsel and High Court judges.",
  },
  {
    id: "5",
    title: "Hospitality Workshop",
    date: "April 14, 2026",
    time: "11:00 AM",
    location: "Hospitality School, Demo Kitchen",
    category: "Hospitality",
    organizer: "Hospitality School",
    description:
      "A hands-on workshop exploring modern hospitality management, culinary arts, and event planning. Participants will engage in live cooking demonstrations, customer service simulations, and a guided tour of the school's five-star training restaurant.",
  },
  {
    id: "6",
    title: "Research Symposium",
    date: "April 19, 2026",
    time: "9:00 AM",
    location: "Humanities Block, Seminar Hall",
    category: "Humanities",
    organizer: "Humanities & Sciences Faculty",
    description:
      "An interdisciplinary research conference where students and faculty present original work across the humanities and social sciences. Topics include history, philosophy, linguistics, and cultural studies. Open to the entire academic community.",
  },
  {
    id: "7",
    title: "University Sports Meet",
    date: "April 26, 2026",
    time: "7:00 AM",
    location: "University Sports Complex",
    category: "Sports",
    organizer: "Sports Department",
    description:
      "The biggest inter-faculty sports competition of the year. Compete in athletics, swimming, football, basketball, and more. Earn points for your faculty and take home the coveted Sports Meet Trophy. All students are encouraged to participate.",
  },
  {
    id: "8",
    title: "Live Music Night",
    date: "May 3, 2026",
    time: "7:30 PM",
    location: "Campus Amphitheatre",
    category: "Music",
    organizer: "Music Society",
    description:
      "A magical evening of live performances featuring student bands, solo artists, and the university orchestra. From classical to contemporary, experience the breadth of musical talent on campus. Food stalls and a drinks bar will be available throughout the event.",
  },
];

export const categoryColors: Record<string, string> = {
  Computing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  Business: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  Architecture: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  Law: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  Hospitality: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  Humanities: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  Sports: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  Music: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
};
