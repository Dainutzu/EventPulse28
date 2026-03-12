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
    id: "leo",
    name: "Leo Club",
    description: "Leadership and community service organization.",
    category: "Service",
    members: "120+",
    image: "/clubs/leo-club.jpg"
  },
  {
    id: "rotaract",
    name: "Rotaract Club",
    description: "Global network of young professionals serving communities.",
    category: "Service",
    members: "150+",
    image: "/clubs/rotaract-club.jpg"
  },
  {
    id: "gavel",
    name: "Gavel Club",
    description: "Public speaking and leadership development club.",
    category: "Communication",
    members: "85+",
    image: "/clubs/gavel-club.jpg"
  },
  {
    id: "debate",
    name: "Debating Society",
    description: "Competitive debate and communication training.",
    category: "Academic",
    members: "60+",
    image: "/clubs/debate-club.jpg"
  },
  {
    id: "music",
    name: "Music Society",
    description: "Band, performances, and music collaborations.",
    category: "Arts",
    members: "200+",
    image: "/clubs/music-club.jpg"
  },
  {
    id: "entrepreneur",
    name: "Entrepreneurship Club",
    description: "Startup and innovation community.",
    category: "Business",
    members: "110+",
    image: "/clubs/entrepreneur-club.jpg"
  },
  {
    id: "sports",
    name: "Sports Union",
    description: "The core of campus sports. Supporting athletes and organizing major meets.",
    category: "Sports",
    members: "300+",
    image: "/clubs/default-club.jpg"
  }
];
