import { Request, Response } from 'express';
import Video, { IVideo } from '../models/Video.js';
import Course from '../models/Course.js';

class VideoController {
  // Get all videos for a course
  public async getVideosByCourse(req: Request, res: Response): Promise<void> {
    try {
      const { courseId } = req.params;

      const videos = await Video.find({ courseId, isPublished: true }).sort({ order: 1 });

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

      const video = await Video.findById(id).populate('courseId');

      if (!video) {
        res.status(404).json({
          success: false,
          message: 'Video not found',
        });
        return;
      }

      // Increment views
      await Video.findByIdAndUpdate(id, { $inc: { views: 1 } });

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
      const course = await Course.findById(courseId);
      if (!course) {
        res.status(404).json({
          success: false,
          message: 'Course not found',
        });
        return;
      }

      const video = new Video({
        courseId,
        title,
        description,
        videoUrl,
        thumbnail,
        duration,
        order,
      });

      await video.save();

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

      const video = await Video.findByIdAndUpdate(
        id,
        {
          title,
          description,
          videoUrl,
          thumbnail,
          duration,
          order,
          isPublished,
        },
        { new: true, runValidators: true }
      );

      if (!video) {
        res.status(404).json({
          success: false,
          message: 'Video not found',
        });
        return;
      }

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

      const video = await Video.findByIdAndDelete(id);

      if (!video) {
        res.status(404).json({
          success: false,
          message: 'Video not found',
        });
        return;
      }

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
