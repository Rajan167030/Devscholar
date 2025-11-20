import { Router } from 'express';
import VideoController from '../controllers/VideoController.js';

const router = Router();

// Get videos for a course
router.get('/course/:courseId', VideoController.getVideosByCourse);

// Get a single video
router.get('/:id', VideoController.getVideoById);

// Create a video
router.post('/', VideoController.createVideo);

// Update a video
router.put('/:id', VideoController.updateVideo);

// Delete a video
router.delete('/:id', VideoController.deleteVideo);

export default router;
