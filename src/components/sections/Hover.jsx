import React, { useRef, useState } from "react";

const Hover = ({ thumbnail, videoSrc }) => {
  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMouseEnter = () => {
    setShowVideo(true);
    setIsLoading(true);
  };

  const handlePlaying = () => {
    setIsLoading(false);
    setIsVideoReady(true);
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setIsVideoReady(false);
    setIsLoading(false);
    setShowVideo(false);
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt="Thumbnail"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isVideoReady ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Spinner */}
      {/* {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )} */}

      {/* Video */}
      {showVideo && (
        <video
          ref={videoRef}
          muted
          loop
          autoPlay
          className="absolute inset-0 w-full h-full object-cover z-10"
          onPlaying={handlePlaying}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default Hover;
