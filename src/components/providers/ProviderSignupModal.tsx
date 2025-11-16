import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProviderSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProviderSignupModal = ({ isOpen, onClose }: ProviderSignupModalProps) => {
  const navigate = useNavigate();

  const benefits = [
    'Increase case acceptance by 40% with AI-powered patient financing',
    'Automate your entire financing workflow with Echo AI assistance',
    'Join a trusted network that strengthens your brand and patient trust'
  ];

  const handleSignup = () => {
    console.log('Modal Sign Up button clicked - navigating to /provider-signup');
    navigate('/provider-signup');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Join DentiPay Today
          </DialogTitle>
          <DialogDescription className="text-center text-base">
            Transform your practice with intelligent financing
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">{benefit}</p>
            </motion.div>
          ))}
        </div>

        <Button 
          onClick={handleSignup}
          className="w-full"
          size="lg"
        >
          Sign Up Now
        </Button>
      </DialogContent>
    </Dialog>
  );
};
