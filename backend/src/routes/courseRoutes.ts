import { Router } from 'express';
import CourseController from '../controllers/CourseController.js';

const router = Router();

// Get all courses
router.get('/', CourseController.getAllCourses);

// Get courses by category
router.get('/category/:category', CourseController.getCoursesByCategory);

// Get a single course
router.get('/:id', CourseController.getCourseById);

// Create a course
router.post('/', CourseController.createCourse);

// Update a course
router.put('/:id', CourseController.updateCourse);

// Delete a course
router.delete('/:id', CourseController.deleteCourse);

export default router;
