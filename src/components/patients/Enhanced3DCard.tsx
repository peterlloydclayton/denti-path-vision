import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface Enhanced3DCardProps {
  benefit: {
    title: string;
    detail: string;
    description: string;
    icon: any;
  };
  index: number;
}

export const Enhanced3DCard = ({ benefit, index }: Enhanced3DCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const Icon = benefit.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: rotateY,
        rotateX: rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.25, 0.25, 0.75]
      }}
      className="relative h-full cursor-pointer"
    >
      <motion.div
        style={{
          transform: isHovered ? "translateZ(50px)" : "translateZ(0px)",
          transformStyle: "preserve-3d",
        }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <Card className="text-center h-full bg-card border-2 border-border/10 hover:border-dental-blue/30 transition-all duration-500 shadow-lg hover:shadow-dental-blue/20 hover:shadow-2xl">
          <CardContent className="p-8 h-full flex flex-col justify-between">
            <div>
              <motion.div
                style={{
                  transform: isHovered ? "translateZ(30px)" : "translateZ(0px)",
                }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 rounded-3xl bg-dental-blue/10 flex items-center justify-center mx-auto mb-6"
              >
                <Icon size={36} className="text-dental-blue" />
              </motion.div>
              
              <motion.h3
                style={{
                  transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
                }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold mb-4 text-foreground"
              >
                {benefit.title}
              </motion.h3>
              
              <motion.p
                style={{
                  transform: isHovered ? "translateZ(15px)" : "translateZ(0px)",
                }}
                transition={{ duration: 0.3 }}
                className="text-foreground/70 mb-3 leading-relaxed"
              >
                {benefit.detail}
              </motion.p>
            </div>
            
            <motion.p
              style={{
                transform: isHovered ? "translateZ(10px)" : "translateZ(0px)",
              }}
              transition={{ duration: 0.3 }}
              className="text-sm text-dental-blue font-semibold mt-auto"
            >
              {benefit.description}
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Floating glow effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-dental-blue/5 -z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};