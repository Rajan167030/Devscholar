export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  categories: string[];
  coursesCount?: number;
}

export const instructors: Instructor[] = [
  {
    id: 'akshay-saini',
    name: 'Akshay Saini',
    title: 'Frontend Development & JavaScript',
    bio: 'Akshay Saini is an exceptional software engineer and educator, who has transformed thousands of developers by teaching practical front-end engineering and modern JavaScript.',
    categories: ['JavaScript', 'React', 'Frontend System Design'],
    coursesCount: 8,
  },
  {
    id: 'amit-khurana',
    name: 'Amit Khurana',
    title: 'GATE Preparation & Electronics',
    bio: 'Amit Khurana is a highly respected GATE mentor specializing in Electronics and Communication Engineering.',
    categories: ['Gate ECE', 'Digital Electronics', 'Control Systems'],
    coursesCount: 5,
  },
  {
    id: 'anurag-singh',
    name: 'Anurag Singh',
    title: 'Front-End Engineering & Modern Web Development',
    bio: 'Anurag is a senior front-end engineer and educator specializing in production-grade web interfaces with modern JavaScript frameworks.',
    categories: ['Frontend Development', 'React & Next.js', 'UI/UX Engineering'],
    coursesCount: 6,
  },
  {
    id: 'apna-college',
    name: 'Apna College',
    title: 'Complete Programming Education',
    bio: 'Apna College stands as one of India\'s most influential and accessible programming education platforms.',
    categories: ['Java Programming', 'C++ Programming', 'MERN Stack'],
    coursesCount: 12,
  },
];
