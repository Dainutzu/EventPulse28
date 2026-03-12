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
    description: "Leadership and community service organization.",
    category: "Service",
    members: "120+",
    image: "/clubs/leo.jpg"
  },
  {
    id: "2",
    name: "Rotaract Club",
    description: "Global network of young professionals serving communities.",
    category: "Service",
    members: "150+",
    image: "/clubs/rotaract.jpg"
  },
  {
    id: "3",
    name: "Gavel Club",
    description: "Public speaking and leadership development club.",
    category: "Communication",
    members: "85+",
    image: "/clubs/gavel.jpg"
  },
  {
    id: "4",
    name: "Debating Society",
    description: "Competitive debate and communication training.",
    category: "Academic",
    members: "60+",
    image: "/clubs/debate.jpg"
  },
  {
    id: "5",
    name: "Music Society",
    description: "Band, performances, and music collaborations.",
    category: "Arts",
    members: "200+",
    image: "/clubs/music.jpg"
  },
  {
    id: "6",
    name: "Entrepreneurship Club",
    description: "Startup and innovation community.",
    category: "Business",
    members: "110+",
    image: "/clubs/entrepreneur.jpg"
  },
  {
    id: "7",
    name: "Sports Union",
    description: "The core of campus sports. Supporting athletes and organizing major meets.",
    category: "Sports",
    members: "300+",
    image: "/clubs/default-club.jpg"
  }
];
