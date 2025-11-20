import { Request, Response } from 'express';
import Course from '../models/Course.js';
import Video from '../models/Video.js';

class CourseController {
  // Get all courses with pagination
  public async getAllCourses(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await Course.findAndCountAll({
        where: { isPublished: true },
        include: [
          { model: Video, as: 'videos' },
        ],
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

      res.status(200).json({
        success: true,
        data: rows,
        pagination: {
          total: count,
          page,
          limit,
          pages: Math.ceil(count / limit),
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

      const courses = await Course.findAll({
        where: { category, isPublished: true },
        include: [
          { model: Video, as: 'videos' },
        ],
        order: [['createdAt', 'DESC']],
      });

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

      const course = await Course.findByPk(id, {
        include: [
          { model: Video, as: 'videos', order: [['order', 'ASC']] },
        ],
      });

      if (!course) {
        res.status(404).json({
          success: false,
          message: 'Course not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: course,
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

      const course = await Course.create({
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

      const course = await Course.findByPk(id);

      if (!course) {
        res.status(404).json({
          success: false,
          message: 'Course not found',
        });
        return;
      }

      await course.update({
        title: title ?? course.title,
        description: description ?? course.description,
        thumbnail: thumbnail ?? course.thumbnail,
        category: category ?? course.category,
        price: price ?? course.price,
        originalPrice: originalPrice ?? course.originalPrice,
        duration: duration ?? course.duration,
        level: level ?? course.level,
        isPublished: isPublished ?? course.isPublished,
      });

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

      const course = await Course.findByPk(id);

      if (!course) {
        res.status(404).json({
          success: false,
          message: 'Course not found',
        });
        return;
      }

      // Delete associated videos
      await Video.destroy({ where: { courseId: id } });
      await course.destroy();

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
