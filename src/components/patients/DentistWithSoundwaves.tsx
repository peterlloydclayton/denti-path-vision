import { motion } from 'framer-motion';
import { AnimatedSoundwaves } from '@/components/ui/animated-soundwaves';
import dentistEchoImg from '@/assets/dentist-echo.png';

export const DentistWithSoundwaves = () => {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      {/* Animated soundwaves background */}
      <AnimatedSoundwaves />
      
      {/* Dentist image overlay */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <img 
          src={dentistEchoImg} 
          alt="Dentist with AI technology" 
          className="h-full w-auto object-contain"
        />
      </div>
      
      {/* Gradient overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20 z-20" />
    </div>
  );
};