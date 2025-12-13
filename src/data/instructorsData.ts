export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  categories: string[];
  coursesCount?: number;
  youtubePlaylistId?: string;
  youtubeChannelId?: string;
}

export const instructors: Instructor[] = [
  {
    id: 'akshay-saini',
    name: 'Akshay Saini',
    title: 'Frontend Development & JavaScript',
    bio: 'Akshay Saini is an exceptional software engineer and educator, who has transformed thousands of developers by teaching practical front-end engineering and modern JavaScript.',
    categories: ['JavaScript', 'React', 'Frontend System Design'],
    coursesCount: 8,
    youtubePlaylistId: 'PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP', // Namaste JavaScript
  },
  {
    id: 'amit-khurana',
    name: 'Amit Khurana',
    title: 'GATE Preparation & Electronics',
    bio: 'Amit Khurana is a highly respected GATE mentor specializing in Electronics and Communication Engineering.',
    categories: ['Gate ECE', 'Digital Electronics', 'Control Systems'],
    coursesCount: 5,
    youtubeChannelId: 'UCc799oF0vXRkPHfR5yr4lEw', // Amit Khurana - Electronics & Communication
  },
  {
    id: 'anurag-singh',
    name: 'Anurag Singh',
    title: 'Front-End Engineering & Modern Web Development',
    bio: 'Anurag is a senior front-end engineer and educator specializing in production-grade web interfaces with modern JavaScript frameworks.',
    categories: ['Frontend Development', 'React & Next.js', 'UI/UX Engineering'],
    coursesCount: 6,
    youtubeChannelId: 'UCgE56mtPmO8W251pY906C8g', // Anurag Singh - Frontend
  },
  {
    id: 'apna-college',
    name: 'Apna College',
    title: 'Complete Programming Education',
    bio: 'Apna College stands as one of India\'s most influential and accessible programming education platforms.',
    categories: ['Java Programming', 'C++ Programming', 'MERN Stack'],
    coursesCount: 12,
    youtubePlaylistId: 'PLfqMhTWNBTe0b2nM6JHVCnAkhQRGiZMSJ', // C++ Placement Course
  },
  {
    id: 'harkirat-singh',
    name: 'Harkirat Singh',
    title: 'Full Stack & Web3 Developer',
    bio: 'Founder of 100xDevs, Harkirat is known for his deep dives into full-stack development, Web3, and open source contributions.',
    categories: ['Full Stack', 'Web3', 'DevOps'],
    coursesCount: 4,
    youtubeChannelId: 'UCn1XnDWhsLS5URXTi5wtFTA', // @harkirat1 channel
  },
  {
    id: 'love-babbar',
    name: 'Love Babbar',
    title: 'DSA & Competitive Programming',
    bio: 'Ex-Amazon, Ex-Microsoft. Love Babbar is famous for his comprehensive DSA placement series and C++ tutorials.',
    categories: ['DSA', 'C++', 'Competitive Programming'],
    coursesCount: 15,
    youtubePlaylistId: 'PLDzeHZWIZsTryvtXdMr6rPh4XRk7WGv46', // DSA Course
  },
  {
    id: 'striver',
    name: 'Raj Vikramaditya (Striver)',
    title: 'SDE Prep & Algorithms',
    bio: 'Founder of TakeUForward. Known for the famous SDE Sheet and making complex algorithms easy to understand.',
    categories: ['Algorithms', 'System Design', 'Interview Prep'],
    coursesCount: 7,
    youtubePlaylistId: 'PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz', // A2Z DSA Course
  },
  {
    id: 'hitesh-choudhary',
    name: 'Hitesh Choudhary',
    title: 'Teacher & Content Creator',
    bio: 'Founder of Chai aur Code. Hitesh creates high-quality content on almost every technology stack from mobile to web to AI.',
    categories: ['JavaScript', 'Python', 'Backend'],
    coursesCount: 20,
    youtubePlaylistId: 'PLu71SKxNbfoBuX3f4dQG2Ca19FpD-LGBb', // Chai aur JavaScript
  },
  {
    id: 'kunal-kushwaha',
    name: 'Kunal Kushwaha',
    title: 'DevOps & Open Source',
    bio: 'Founder of WeMakeDevs. Kunal is a major advocate for cloud native technologies, DevOps, and open source education.',
    categories: ['DevOps', 'Java', 'Open Source'],
    coursesCount: 6,
    youtubePlaylistId: 'PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ', // Java DSA Bootcamp
  },
  {
    id: 'sanket-singh',
    name: 'Sanket Singh',
    title: 'Backend & System Design',
    bio: 'Ex-LinkedIn, Google Developer Expert. Sanket specializes in deep backend engineering concepts and system design.',
    categories: ['System Design', 'Backend', 'Node.js'],
    coursesCount: 5,
    youtubeChannelId: 'UU_5tF8M9ryo5Xv254Ld_j8Q', // Uploads
  },
];
