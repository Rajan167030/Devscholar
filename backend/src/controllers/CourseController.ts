import { Request, Response } from 'express';
import Course, { ICourse } from '../models/Course.js';
import Video from '../models/Video.js';

class CourseController {
  // Get all courses with pagination
  public async getAllCourses(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const total = await Course.countDocuments({ isPublished: true });
      const courses = await Course.find({ isPublished: true })
        .populate('instructorId')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      res.status(200).json({
        success: true,
        data: courses,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching courses',
        error,
      });
    }
  }

  // Get courses by category
  public async getCoursesByCategory(req: Request, res: Response): Promise<void> {
    try {
      const { category } = req.params;

      const courses = await Course.find({ category, isPublished: true })
        .populate('instructorId')
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        data: courses,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching courses',
        error,
      });
    }
  }

  // Get a single course by ID
  public async getCourseById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const course = await Course.findById(id).populate('instructorId');

      if (!course) {
        res.status(404).json({
          success: false,
          message: 'Course not found',
        });
        return;
      }

      // Get videos for this course
      const videos = await Video.find({ courseId: id }).sort({ order: 1 });

      res.status(200).json({
        success: true,
        data: { ...course.toObject(), videos },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching course',
        error,
      });
    }
  }

  // Create a new course (Admin/Instructor only)
  public async createCourse(req: Request, res: Response): Promise<void> {
    try {
      const { title, description, thumbnail, category, instructorId, price, originalPrice, duration, level } =
        req.body;

      if (!title || !description || !category || !instructorId) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
        return;
      }

      const course = new Course({
        title,
        description,
        thumbnail,
        category,
        instructorId,
        price: price || 0,
        originalPrice,
        duration,
        level: level || 'Beginner',
      });

      await course.save();

      res.status(201).json({
        success: true,
        message: 'Course created successfully',
        data: course,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating course',
        error,
      });
    }
  }

  // Update a course
  public async updateCourse(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description, thumbnail, category, price, originalPrice, duration, level, isPublished } = req.body;

      const course = await Course.findByIdAndUpdate(
        id,
        {
          title,
          description,
          thumbnail,
          category,
          price,
          originalPrice,
          duration,
          level,
          isPublished,
        },
        { new: true, runValidators: true }
      );

      if (!course) {
        res.status(404).json({
          success: false,
          message: 'Course not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Course updated successfully',
        data: course,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating course',
        error,
      });
    }
  }

  // Delete a course
  public async deleteCourse(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const course = await Course.findById(id);

      if (!course) {
        res.status(404).json({
          success: false,
          message: 'Course not found',
        });
        return;
      }

      // Delete associated videos
      await Video.deleteMany({ courseId: id });
      await Course.findByIdAndDelete(id);

      res.status(200).json({
        success: true,
        message: 'Course deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting course',
        error,
      });
    }
  }
}

export default new CourseController();
