import React, { useState, useEffect, useRef } from 'react';

interface InstagramPost {
  id: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  caption: string;
  permalink: string; // Aggiungiamo il link al post Instagram
}

interface InstagramGalleryProps {
  accessToken: string;
  limit?: number;
  instagramUsername: string; // Aggiungiamo l'username Instagram per il link "Follow us"
}

const InstagramGallery: React.FC<InstagramGalleryProps> = ({ accessToken, limit = 12, instagramUsername }) => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstagramPosts = async (retries = 3) => {
      try {
        const response = await fetch(
          `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,caption,permalink&access_token=${accessToken}&limit=${limit}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch Instagram posts');
        }
        const data = await response.json();
        setPosts(data.data);
        setLoading(false);
      } catch (err) {
        if (retries > 0) {
          setTimeout(() => fetchInstagramPosts(retries - 1), 2000);
        } else {
          setError('Error fetching Instagram posts');
          setLoading(false);
        }
      }
    };

    fetchInstagramPosts();
  }, [accessToken, limit]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (posts.length === 0) return <div className="text-center">No posts found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
        {posts.map((post) => (
          <InstagramPost key={post.id} post={post} instagramUsername={instagramUsername} />
        ))}
      </div>
    </div>
  );
};

const InstagramPost: React.FC<{ post: InstagramPost; instagramUsername: string }> = ({ post, instagramUsername }) => {
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [mediaError, setMediaError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const mediaUrl = post.media_type === 'VIDEO' ? post.thumbnail_url || post.media_url : post.media_url;

  useEffect(() => {
    if (isHovering && videoRef.current && post.media_type === 'VIDEO') {
      videoRef.current.play().catch(error => console.error('Error playing video:', error));
    } else if (!isHovering && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovering, post.media_type]);

  const handleClick = () => {
    window.open(post.permalink, '_blank');
  };

  return (
    <div
      className="relative aspect-square overflow-hidden cursor-pointer group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      {!mediaLoaded && !mediaError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      {mediaError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          Failed to load media
        </div>
      )}
      {post.media_type === 'VIDEO' ? (
        <>
          <img
            src={mediaUrl}
            alt={post.caption}
            className={`absolute inset-0 w-full h-full object-cover ${mediaLoaded && !isHovering ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setMediaLoaded(true)}
            onError={() => setMediaError(true)}
          />
          <video
            ref={videoRef}
            src={post.media_url}
            className={`absolute inset-0 w-full h-full object-cover ${isHovering ? 'opacity-100' : 'opacity-0'}`}
            loop
            muted
            playsInline
          />
        </>
      ) : (
        <img
          src={mediaUrl}
          alt={post.caption}
          className={`absolute inset-0 w-full h-full object-cover`}
          onLoad={() => setMediaLoaded(true)}
          onError={() => setMediaError(true)}
        />
      )}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-white text-center">
          <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <p className="font-bold">Follow us</p>
          <p>@{instagramUsername}</p>
        </div>
      </div>
    </div>
  );
};

export default InstagramGallery;
