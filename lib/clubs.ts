export interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  members: string;
  image: string;
}

export const clubs: Club[] = [
  {
    id: "1",
    name: "Leo Club",
    description: "Leadership, Experience, Opportunity. Join us for impactful community service projects.",
    category: "Service",
    members: "120+",
    image: "🦁"
  },
  {
    id: "2",
    name: "Rotaract Club",
    description: "Fellowship through service. Developing leaders through community and international service.",
    category: "Service",
    members: "150+",
    image: "⚙️"
  },
  {
    id: "3",
    name: "Gavel Club",
    description: "Master the art of public speaking and leadership in a supportive environment.",
    category: "Communication",
    members: "85+",
    image: "🔨"
  },
  {
    id: "4",
    name: "Debating Society",
    description: "Critical thinking and sharp arguments. Compete in national and international tournaments.",
    category: "Academic",
    members: "60+",
    image: "🗣️"
  },
  {
    id: "5",
    name: "Music Society",
    description: "From classical to rock. A home for campus musicians and music lovers alike.",
    category: "Arts",
    members: "200+",
    image: "🎵"
  },
  {
    id: "6",
    name: "Entrepreneurship Club",
    description: "Turning ideas into ventures. Innovation, networking, and startup mentorship.",
    category: "Business",
    members: "110+",
    image: "💡"
  },
  {
    id: "7",
    name: "Sports Union",
    description: "The core of campus sports. Supporting athletes and organizing major meets.",
    category: "Sports",
    members: "300+",
    image: "🏆"
  }
];
