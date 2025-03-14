
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import ImageControls from './ImageControls';

interface ImageComparisonProps {
  originalImage: string;
  processedImage: string | null;
  className?: string;
}

const ImageComparison: React.FC<ImageComparisonProps> = ({
  originalImage,
  processedImage,
  className
}) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [isSegmentationVisible, setIsSegmentationVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 20, 400));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 20, 10));
  }, []);

  const handleRotateLeft = useCallback(() => {
    setRotation(prev => (prev - 90) % 360);
  }, []);

  const handleRotateRight = useCallback(() => {
    setRotation(prev => (prev + 90) % 360);
  }, []);

  const handleReset = useCallback(() => {
    setZoom(100);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only left mouse button
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  }, [position]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle slider drag
  const handleSliderMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent image panning
    setIsDraggingSlider(true);
  }, []);

  const handleSliderMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingSlider || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    setSliderPosition(Math.min(Math.max(newPosition, 0), 100));
  }, [isDraggingSlider]);

  const handleSliderMouseUp = useCallback(() => {
    setIsDraggingSlider(false);
  }, []);

  // Add global mouse event listeners
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setIsDraggingSlider(false);
    };
    
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDraggingSlider && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;
        setSliderPosition(Math.min(Math.max(newPosition, 0), 100));
      }
      
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      }
    };
    
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('mousemove', handleGlobalMouseMove);
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, isDraggingSlider, dragStart]);

  // Reset position when rotation changes
  useEffect(() => {
    setPosition({ x: 0, y: 0 });
  }, [rotation]);

  const toggleSegmentation = useCallback(() => {
    setIsSegmentationVisible(prev => !prev);
  }, []);

  return (
    <div className={cn("w-full flex flex-col", className)}>
      <div 
        ref={containerRef}
        className={cn(
          "relative w-full overflow-hidden rounded-xl border aspect-[4/3] bg-muted/30",
          "animate-fade-in",
          isDragging && "cursor-grabbing",
          !isDragging && "cursor-grab"
        )}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Original image */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-muted/10"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom / 100}) rotate(${rotation}deg)`,
            transformOrigin: 'center',
            transition: isDragging ? 'none' : 'transform 0.2s ease'
          }}
        >
          <img 
            src={originalImage} 
            alt="Original" 
            className="max-w-full max-h-full pointer-events-none"
          />
        </div>

        {/* Processed image with segmentation overlay (conditionally rendered) */}
        {processedImage && isSegmentationVisible && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-transparent pointer-events-none"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'center',
              clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              transition: isDragging ? 'none' : 'transform 0.2s ease'
            }}
          >
            <img 
              src={processedImage} 
              alt="Processed" 
              className="max-w-full max-h-full"
            />
          </div>
        )}

        {/* Slider for comparison (only shown when processed image exists) */}
        {processedImage && (
          <div 
            className="comparison-slider"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleSliderMouseDown}
          ></div>
        )}
        
        {/* Labels */}
        <div className="absolute top-2 left-2 text-xs bg-black/50 text-white px-2 py-1 rounded">
          Original
        </div>
        
        {processedImage && (
          <div className="absolute top-2 right-2 text-xs bg-primary/80 text-white px-2 py-1 rounded">
            Processed
          </div>
        )}
      </div>
      
      <ImageControls 
        zoom={zoom}
        onZoomChange={setZoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onRotateLeft={handleRotateLeft}
        onRotateRight={handleRotateRight}
        onReset={handleReset}
        hasSegmentation={!!processedImage}
        onToggleSegmentation={toggleSegmentation}
        isSegmentationVisible={isSegmentationVisible}
        className="mt-2"
      />
    </div>
  );
}

export default ImageComparison;
