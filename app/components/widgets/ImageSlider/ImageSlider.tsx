import React, { useState, useEffect } from 'react';
import './ImageSlider.css';

export interface SliderImage {
  src: string;
  alt?: string;
  caption?: string;
}

export interface ImageSliderProps {
  images: SliderImage[];
  initialIndex?: number;
  showThumbnails?: boolean;
  showCaptions?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export function ImageSlider({
  images,
  initialIndex = 0,
  showThumbnails = true,
  showCaptions = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  className = ''
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isFullscreen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images.length, isFullscreen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') setIsFullscreen(false);
      if (e.key === 'f' || e.key === 'F') setIsFullscreen(!isFullscreen);
    };

    if (isFullscreen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isFullscreen]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsLoading(true);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsLoading(true);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsLoading(true);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (images.length === 0) {
    return <div className="image-slider-empty">No images to display</div>;
  }

  const currentImage = images[currentIndex];

  return (
    <div className={`image-slider ${className} ${isFullscreen ? 'fullscreen' : ''}`}>
      {/* Main Image Display */}
      <div className="image-slider-main">
        <div className="image-container">
          {isLoading && (
            <div className="image-loader">
              <div className="spinner"></div>
            </div>
          )}
          <img
            src={currentImage.src}
            alt={currentImage.alt || `Image ${currentIndex + 1}`}
            className="main-image"
            onLoad={handleImageLoad}
            style={{ opacity: isLoading ? 0 : 1 }}
          />
          
          {/* Navigation Arrows */}
          <button 
            className="nav-button nav-prev" 
            onClick={goToPrevious}
            disabled={images.length <= 1}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button 
            className="nav-button nav-next" 
            onClick={goToNext}
            disabled={images.length <= 1}
            aria-label="Next image"
          >
            ›
          </button>

          {/* Controls */}
          <div className="image-controls">
            <button 
              className="control-button fullscreen-btn" 
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? '⤓' : '⤢'}
            </button>
            
            <div className="image-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>

        {/* Caption */}
        {showCaptions && currentImage.caption && (
          <div className="image-caption">
            {currentImage.caption}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {showThumbnails && images.length > 1 && (
        <div className="thumbnails-container">
          {images.map((image, index) => (
            <button
              key={index}
              className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to image ${index + 1}`}
            >
              <img
                src={image.src}
                alt={image.alt || `Thumbnail ${index + 1}`}
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="fullscreen-overlay" onClick={() => setIsFullscreen(false)}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="fullscreen-close" 
              onClick={() => setIsFullscreen(false)}
              aria-label="Close fullscreen"
            >
              ×
            </button>
            <img
              src={currentImage.src}
              alt={currentImage.alt || `Image ${currentIndex + 1}`}
              className="fullscreen-image"
            />
            {showCaptions && currentImage.caption && (
              <div className="fullscreen-caption">
                {currentImage.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 