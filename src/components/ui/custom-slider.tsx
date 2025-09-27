import React, { useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CustomSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  className?: string;
}

export const CustomSlider = ({
  value,
  onValueChange,
  min,
  max,
  step,
  className
}: CustomSliderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const newPercentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const newValue = Math.round((min + (newPercentage / 100) * (max - min)) / step) * step;
    onValueChange(Math.max(min, Math.min(max, newValue)));
  }, [min, max, step, onValueChange]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const newPercentage = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
    const newValue = Math.round((min + (newPercentage / 100) * (max - min)) / step) * step;
    onValueChange(Math.max(min, Math.min(max, newValue)));
  }, [min, max, step, onValueChange]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const newPercentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const newValue = Math.round((min + (newPercentage / 100) * (max - min)) / step) * step;
    onValueChange(Math.max(min, Math.min(max, newValue)));
  }, [isDragging, min, max, step, onValueChange]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !trackRef.current) return;
    
    const rect = trackRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const newPercentage = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100));
    const newValue = Math.round((min + (newPercentage / 100) * (max - min)) / step) * step;
    onValueChange(Math.max(min, Math.min(max, newValue)));
  }, [isDragging, min, max, step, onValueChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mouse and touch event listeners
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div className={cn("relative flex items-center w-full h-6 cursor-pointer", className)}>
      {/* Track */}
      <div
        ref={trackRef}
        className="relative w-full h-2 bg-dental-blue-light/30 rounded-full"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Filled portion */}
        <div
          className="absolute h-full bg-dental-blue rounded-full transition-all duration-150"
          style={{ width: `${percentage}%` }}
        />
        
        {/* Thumb */}
        <div
          className={cn(
            "absolute top-1/2 w-5 h-5 -mt-2.5 -ml-2.5 bg-dental-blue brightness-90 border-0 rounded-full shadow-md transition-all duration-150 cursor-grab",
            isDragging && "cursor-grabbing scale-110 shadow-lg"
          )}
          style={{ left: `${percentage}%` }}
        />
      </div>
    </div>
  );
};