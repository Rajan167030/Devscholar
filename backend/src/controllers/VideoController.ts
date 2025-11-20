import { Request, Response } from 'express';
import Video from '../models/Video.js';
import Course from '../models/Course.js';

class VideoController {
  // Get all videos for a course
  public async getVideosByCourse(req: Request, res: Response): Promise<void> {
    try {
      const { courseId } = req.params;

      const videos = await Video.findAll({
        where: { courseId, isPublished: true },
        order: [['order', 'ASC']],
      });

      res.status(200).json({
        success: true,
        data: videos,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching videos',
        error,
      });
    }
  }

  // Get a single video by ID
  public async getVideoById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const video = await Video.findByPk(id, {
        include: [{ model: Course, as: 'course' }],
      });

      if (!video) {
        res.status(404).json({
          success: false,
          message: 'Video not found',
        });
        return;
      }

      // Increment views
      video.views += 1;
      await video.save();

      res.status(200).json({
        success: true,
        data: video,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching video',
        error,
      });
    }
  }

  // Create a new video
  public async createVideo(req: Request, res: Response): Promise<void> {
    try {
      const { courseId, title, description, videoUrl, thumbnail, duration, order } = req.body;

      // Validate required fields
      if (!courseId || !title || !videoUrl || !duration || order === undefined) {
        res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
        return;
      }

      // Check if course exists
      const course = await Course.findByPk(courseId);
      if (!course) {
        res.status(404).json({
          success: false,
          message: 'Course not found',
        });
        return;
      }

      const video = await Video.create({
        courseId,
        title,
        description,
        videoUrl,
        thumbnail,
        duration,
        order,
      });

      res.status(201).json({
        success: true,
        message: 'Video created successfully',
        data: video,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating video',
        error,
      });
    }
  }

  // Update a video
  public async updateVideo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, description, videoUrl, thumbnail, duration, order, isPublished } = req.body;

      const video = await Video.findByPk(id);

      if (!video) {
        res.status(404).json({
          success: false,
          message: 'Video not found',
        });
        return;
      }

      await video.update({
        title: title ?? video.title,
        description: description ?? video.description,
        videoUrl: videoUrl ?? video.videoUrl,
        thumbnail: thumbnail ?? video.thumbnail,
        duration: duration ?? video.duration,
        order: order ?? video.order,
        isPublished: isPublished ?? video.isPublished,
      });

      res.status(200).json({
        success: true,
        message: 'Video updated successfully',
        data: video,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating video',
        error,
      });
    }
  }

  // Delete a video
  public async deleteVideo(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const video = await Video.findByPk(id);

      if (!video) {
        res.status(404).json({
          success: false,
          message: 'Video not found',
        });
        return;
      }

      await video.destroy();

      res.status(200).json({
        success: true,
        message: 'Video deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting video',
        error,
      });
    }
  }
}

export default new VideoController();
