import { motion } from 'framer-motion';
import { AnimatedSoundwaves } from '@/components/ui/animated-soundwaves';
import dentistEchoImg from '@/assets/dentist-echo-ai.jpg';

export const DentistWithSoundwaves = () => {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden">
      {/* Dentist background image */}
      <img 
        src={dentistEchoImg} 
        alt="Dentist with AI technology" 
        className="w-full h-full object-cover"
      />
      
      {/* Animated soundwaves overlay */}
      <AnimatedSoundwaves />
      
      {/* Gradient overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
    </div>
  );
};