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
    image: "https://images.unsplash.com/photo-1559027615-cd9417937402?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "2",
    name: "Rotaract Club",
    description: "Fellowship through service. Developing leaders through community and international service.",
    category: "Service",
    members: "150+",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "3",
    name: "Gavel Club",
    description: "Master the art of public speaking and leadership in a supportive environment.",
    category: "Communication",
    members: "85+",
    image: "https://images.unsplash.com/photo-1475721027187-402ad2989a38?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "4",
    name: "Debating Society",
    description: "Critical thinking and sharp arguments. Compete in national and international tournaments.",
    category: "Academic",
    members: "60+",
    image: "https://images.unsplash.com/photo-1524178232363-1fb28f74b0cd?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "5",
    name: "Music Society",
    description: "From classical to rock. A home for campus musicians and music lovers alike.",
    category: "Arts",
    members: "200+",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "6",
    name: "Entrepreneurship Club",
    description: "Turning ideas into ventures. Innovation, networking, and startup mentorship.",
    category: "Business",
    members: "110+",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "7",
    name: "Sports Union",
    description: "The core of campus sports. Supporting athletes and organizing major meets.",
    category: "Sports",
    members: "300+",
    image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=400"
  }
];
