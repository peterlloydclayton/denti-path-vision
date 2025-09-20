import { motion } from 'framer-motion';
import { AnimatedSoundwaves } from '@/components/ui/animated-soundwaves';
import dentistEchoImg from '@/assets/dentist-echo.png';

export const DentistWithSoundwaves = () => {
  return (
    <div className="relative w-full h-full">
      {/* Animated soundwaves background - positioned to extend beyond container */}
      <div className="absolute inset-0 -inset-x-8 -inset-y-8 z-0">
        <AnimatedSoundwaves />
      </div>
      
      {/* Main content container with rounded corners and proper clipping */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm">
        {/* Dentist image overlay */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <img 
            src={dentistEchoImg} 
            alt="Dentist with AI technology" 
            className="h-full w-auto object-contain"
          />
        </div>
        
        {/* Gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10 z-20" />
      </div>
    </div>
  );
};