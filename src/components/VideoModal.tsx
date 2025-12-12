import { useEffect, useState } from 'react';
import CustomVideoPlayer from './CustomVideoPlayer';

interface VideoModalProps {
  videoId: string;
  title: string;
  thumbnail: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ videoId, title, thumbnail, isOpen, onClose }: VideoModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
      // Add escape key listener
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className={`relative w-full ${isFullscreen ? 'max-w-none' : 'max-w-6xl'} aspect-video`}>
        <CustomVideoPlayer
          videoId={videoId}
          title={title}
          thumbnail={thumbnail}
          isFullscreen={isFullscreen}
          onClose={onClose}
          onToggleFullscreen={handleToggleFullscreen}
        />
      </div>

      {/* Click outside to close (only when not fullscreen) */}
      {!isFullscreen && (
        <div
          className="absolute inset-0 -z-10"
          onClick={onClose}
        />
      )}
    </div>
  );
}