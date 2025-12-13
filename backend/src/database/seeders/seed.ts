import mongoose from 'mongoose';
import User from '../../models/User.js';
import Course from '../../models/Course.js';
import Video from '../../models/Video.js';
import connectDB from '../connection.js';

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Video.deleteMany({});

    console.log('Cleared existing data');

    // Create sample users
    const users = [
      {
        email: 'admin@devscholar.com',
        password: '$2a$10$hashedpassword1', // Use bcrypt to hash 'password123'
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        bio: 'Platform administrator',
        isActive: true,
      },
      {
        email: 'instructor1@devscholar.com',
        password: '$2a$10$hashedpassword2',
        firstName: 'John',
        lastName: 'Doe',
        role: 'instructor',
        bio: 'Experienced web developer with 5+ years of experience',
        isActive: true,
      },
      {
        email: 'instructor2@devscholar.com',
        password: '$2a$10$hashedpassword3',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'instructor',
        bio: 'Data science expert and machine learning enthusiast',
        isActive: true,
      },
      {
        email: 'student1@devscholar.com',
        password: '$2a$10$hashedpassword4',
        firstName: 'Alice',
        lastName: 'Johnson',
        role: 'student',
        bio: 'Aspiring developer learning new technologies',
        isActive: true,
      },
      {
        email: 'student2@devscholar.com',
        password: '$2a$10$hashedpassword5',
        firstName: 'Bob',
        lastName: 'Wilson',
        role: 'student',
        bio: 'Software engineer looking to expand skills',
        isActive: true,
      },
    ];

    const createdUsers = await User.insertMany(users);
    console.log('Created users:', createdUsers.length);

    // Get instructor IDs
    const instructor1 = createdUsers.find(u => u.email === 'instructor1@devscholar.com');
    const instructor2 = createdUsers.find(u => u.email === 'instructor2@devscholar.com');

    if (!instructor1 || !instructor2) {
      throw new Error('Instructors not found in created users');
    }

    // Create sample courses
    const courses = [
      {
        title: 'Complete Web Development Bootcamp',
        description: 'Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB from scratch. Build real-world projects and deploy them.',
        thumbnail: 'https://picsum.photos/400/225?random=1',
        category: 'Web Development',
        instructorId: instructor1._id,
        price: 99.99,
        originalPrice: 199.99,
        duration: '40 hours',
        level: 'Beginner',
        isPublished: true,
      },
      {
        title: 'Advanced React Development',
        description: 'Master React hooks, context API, Redux, and advanced patterns. Build scalable React applications.',
        thumbnail: 'https://picsum.photos/400/225?random=2',
        category: 'Web Development',
        instructorId: instructor1._id,
        price: 79.99,
        originalPrice: 149.99,
        duration: '25 hours',
        level: 'Intermediate',
        isPublished: true,
      },
      {
        title: 'Data Science with Python',
        description: 'Learn data analysis, visualization, and machine learning with Python, pandas, numpy, and scikit-learn.',
        thumbnail: 'https://picsum.photos/400/225?random=3',
        category: 'Data Science',
        instructorId: instructor2._id,
        price: 89.99,
        originalPrice: 179.99,
        duration: '35 hours',
        level: 'Intermediate',
        isPublished: true,
      },
      {
        title: 'Machine Learning Fundamentals',
        description: 'Understand the basics of machine learning, neural networks, and deep learning with practical examples.',
        thumbnail: 'https://picsum.photos/400/225?random=4',
        category: 'Machine Learning',
        instructorId: instructor2._id,
        price: 119.99,
        originalPrice: 249.99,
        duration: '45 hours',
        level: 'Advanced',
        isPublished: true,
      },
      {
        title: 'Mobile App Development with React Native',
        description: 'Build cross-platform mobile apps with React Native. Learn navigation, state management, and deployment.',
        thumbnail: 'https://picsum.photos/400/225?random=5',
        category: 'Mobile Development',
        instructorId: instructor1._id,
        price: 69.99,
        originalPrice: 129.99,
        duration: '30 hours',
        level: 'Intermediate',
        isPublished: true,
      },
    ];

    const createdCourses = await Course.insertMany(courses);
    console.log('Created courses:', createdCourses.length);

    // Create sample videos for each course
    const videos = [];

    for (const course of createdCourses) {
      const courseVideos = [
        {
          courseId: course._id,
          title: `Introduction to ${course.title}`,
          description: `Welcome to ${course.title}. In this video, we'll cover what you'll learn and the course structure.`,
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
          thumbnail: `https://picsum.photos/400/225?random=${Math.floor(Math.random() * 100)}`,
          duration: 600, // 10 minutes
          order: 1,
          isPublished: true,
          views: Math.floor(Math.random() * 1000),
        },
        {
          courseId: course._id,
          title: 'Setting Up Your Development Environment',
          description: 'Learn how to set up your development environment with all necessary tools and software.',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
          thumbnail: `https://picsum.photos/400/225?random=${Math.floor(Math.random() * 100)}`,
          duration: 900, // 15 minutes
          order: 2,
          isPublished: true,
          views: Math.floor(Math.random() * 1000),
        },
        {
          courseId: course._id,
          title: 'Core Concepts and Fundamentals',
          description: 'Dive deep into the core concepts and fundamentals of the topic.',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
          thumbnail: `https://picsum.photos/400/225?random=${Math.floor(Math.random() * 100)}`,
          duration: 1800, // 30 minutes
          order: 3,
          isPublished: true,
          views: Math.floor(Math.random() * 1000),
        },
        {
          courseId: course._id,
          title: 'Building Your First Project',
          description: 'Apply what you\'ve learned by building your first practical project.',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_10mb.mp4',
          thumbnail: `https://picsum.photos/400/225?random=${Math.floor(Math.random() * 100)}`,
          duration: 2400, // 40 minutes
          order: 4,
          isPublished: true,
          views: Math.floor(Math.random() * 1000),
        },
        {
          courseId: course._id,
          title: 'Advanced Topics and Best Practices',
          description: 'Explore advanced topics and learn industry best practices.',
          videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_20mb.mp4',
          thumbnail: `https://picsum.photos/400/225?random=${Math.floor(Math.random() * 100)}`,
          duration: 3600, // 60 minutes
          order: 5,
          isPublished: true,
          views: Math.floor(Math.random() * 1000),
        },
      ];

      videos.push(...courseVideos);
    }

    await Video.insertMany(videos);
    console.log('Created videos:', videos.length);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();