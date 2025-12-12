import { useEffect, useState } from 'react';
import VideoModal from './VideoModal';

interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
      high: {
        url: string;
      };
    };
    resourceId: {
      videoId: string;
    };
  };
}

interface YouTubeVideosProps {
  playlistId?: string;
  channelId?: string;
  apiKey?: string; // Vite env: VITE_YOUTUBE_API_KEY
}

export default function YouTubeVideos({ playlistId, channelId, apiKey }: YouTubeVideosProps) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<{
    id: string;
    title: string;
    thumbnail: string;
  } | null>(null);

  useEffect(() => {
    async function load() {
      if ((!playlistId && !channelId) || !apiKey) return;
      setLoading(true);
      setError(null);
      try {
        let finalPlaylistId = playlistId;

        // If channelId is provided, convert it to uploads playlist ID
        if (channelId && !playlistId) {
          // YouTube uploads playlist ID is "UU" + channelId without "UC" prefix
          if (channelId.startsWith('UC')) {
            finalPlaylistId = 'UU' + channelId.substring(2);
          } else if (channelId.startsWith('UU')) {
            // Already in uploads playlist format
            finalPlaylistId = channelId;
          } else {
            throw new Error('Invalid channel ID format. Channel ID should start with UC or UU.');
          }
        }

        console.log('Fetching videos from playlist:', finalPlaylistId);
        const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=${finalPlaylistId}&key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
          console.error('YouTube API Error:', data.error);
          if (data.error.code === 403) {
            throw new Error('YouTube API access forbidden. Please check API key permissions.');
          } else if (data.error.code === 404) {
            throw new Error('Playlist not found. It might be private or deleted.');
          } else {
            throw new Error(data.error.message);
          }
        }

        console.log('Loaded videos:', data.items?.length || 0);
        setVideos(data.items || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load YouTube videos');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [playlistId, channelId, apiKey]);

  const handleVideoSelect = (video: YouTubeVideo) => {
    setSelectedVideo({
      id: video.snippet.resourceId.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url || '',
    });
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  if (!playlistId && !channelId) return null;

  if (!apiKey) {
    return (
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Latest Videos</h2>
        <div className="text-center py-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="text-yellow-600 dark:text-yellow-400 mb-2">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            YouTube API Key Missing
          </div>
          <p className="text-sm text-yellow-600 dark:text-yellow-300 mb-4">
            Please add <code className="bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded text-xs">VITE_YOUTUBE_API_KEY</code> to your .env file
          </p>
          {playlistId && (
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Meanwhile, you can view this playlist directly:</p>
              <a
                href={`https://www.youtube.com/playlist?list=${playlistId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                View on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        {playlistId ? 'Playlist Videos' : 'Latest Videos'}
        <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-2">
          (Click any video to play in custom player)
        </span>
      </h2>
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading videos...</span>
        </div>
      )}
      {error && (
        <div className="text-center py-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="text-red-600 dark:text-red-400 mb-2">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Unable to load videos
          </div>
          <p className="text-sm text-red-500 dark:text-red-300 mb-4">{error}</p>
          {playlistId && (
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">You can view this playlist directly on YouTube:</p>
              <a
                href={`https://www.youtube.com/playlist?list=${playlistId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                View on YouTube
              </a>
            </div>
          )}
          {channelId && (
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">You can view this channel directly on YouTube:</p>
              <a
                href={`https://www.youtube.com/channel/${channelId.startsWith('UC') ? channelId : 'UC' + channelId.substring(2)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                View Channel on YouTube
              </a>
            </div>
          )}
        </div>
      )}
      {!loading && !error && videos.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">No videos found.</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            {playlistId ? 'This playlist might be empty or private.' : 'No recent videos available.'}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-gray-300 dark:hover:border-gray-700 transition-all hover:shadow-lg cursor-pointer group"
            onClick={() => handleVideoSelect(video)}
          >
            <div className="relative aspect-video">
              <img
                src={video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url}
                alt={video.snippet.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white fill-current ml-1" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              {/* Duration overlay (if available) */}
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                YouTube
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-gray-900 dark:text-white font-semibold line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" title={video.snippet.title}>
                {video.snippet.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {video.snippet.description}
              </p>
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-500">
                Click to play in custom player
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      <VideoModal
        videoId={selectedVideo?.id || ''}
        title={selectedVideo?.title || ''}
        thumbnail={selectedVideo?.thumbnail || ''}
        isOpen={!!selectedVideo}
        onClose={handleCloseModal}
      />
    </div>
  );
}
