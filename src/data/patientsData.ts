import { CreditCard, Clock, Shield, Heart, Calculator } from 'lucide-react';

export const benefits = [
  {
    icon: CreditCard,
    title: 'Flexible Payment Plans',
    description: '6, 12, 18, and 24-month payment options available',
    detail: 'Choose from multiple financing options that fit your budget and lifestyle'
  },
  {
    icon: Clock,
    title: 'Instant Approval',
    description: 'Decisions in under 60 seconds with 94% approval rate',
    detail: 'Get approved in seconds, not days. Start your treatment immediately'
  },
  {
    icon: Shield,
    title: 'No Hidden Fees',
    description: 'Clear terms, no prepayment penalties, competitive rates',
    detail: 'Transparent pricing with no surprise charges or hidden costs'
  },
  {
    icon: Heart,
    title: 'Better Oral Health',
    description: 'Access to full range of treatments without financial barriers',
    detail: 'Get the dental care you deserve without compromising on quality'
  }
];

export const specialties = [
  'General Dentistry',
  'Cosmetic Dentistry', 
  'Orthodontics',
  'Oral Surgery',
  'Periodontics',
  'Endodontics',
  'Pediatric Dentistry'
];

export const sampleProviders = [
  {
    name: 'Dr. Sarah Martinez',
    specialty: 'Cosmetic Dentistry',
    location: 'Beverly Hills, CA',
    rating: 4.9,
    reviews: 247,
    verified: true
  },
  {
    name: 'Dr. Michael Chen',
    specialty: 'Orthodontics',
    location: 'Austin, TX',
    rating: 4.8,
    reviews: 189,
    verified: true
  },
  {
    name: 'Dr. Emily Rodriguez',
    specialty: 'General Dentistry',
    location: 'Miami, FL',
    rating: 4.9,
    reviews: 312,
    verified: true
  }
];

export const patientStories = [
  {
    name: 'Sarah, 28',
    subtitle: 'Young Professional',
    treatment: 'Invisalign',
    payment: '$89/month',
    quote: 'I finally got the dental care I needed without the financial stress. The approval was instant and the monthly payments fit perfectly in my budget.'
  },
  {
    name: 'The Johnson Family',
    subtitle: 'Family of Four',
    treatment: 'Family dental care package',
    payment: '25% savings by bundling',
    quote: 'DentiPay made it possible for our whole family to get healthy smiles. We could schedule everyone\'s treatment at once.'
  },
  {
    name: 'Robert, 67',
    subtitle: 'Retiree',
    treatment: 'Full mouth restoration',
    payment: '24 months, 0% interest',
    quote: 'I thought I couldn\'t afford dental care in retirement, but DentiPay changed that. The process was so simple.'
  },
  {
    name: 'Maria, 35',
    subtitle: 'Emergency Patient',
    treatment: 'Emergency root canal',
    payment: 'Approved in 32 seconds',
    quote: 'When I needed emergency dental care, DentiPay was there immediately. I got approved in 30 seconds and started treatment the same day.'
  }
];

export const financialTools = [
  {
    icon: Calculator,
    title: 'Treatment Cost Estimator',
    description: 'Get an estimated cost range for your treatment',
    benefit: 'Plan your budget before your appointment',
    cta: 'Try Cost Estimator'
  },
  {
    icon: CreditCard,
    title: 'Payment Plan Calculator',
    description: 'Explore monthly payment options for different treatment costs',
    benefit: 'See what fits in your budget',
    cta: 'Calculate Payments'
  },
  {
    icon: Shield,
    title: 'Insurance Benefit Optimizer',
    description: 'Maximize your insurance benefits alongside DentiPay financing',
    benefit: 'Use your benefits efficiently and reduce out-of-pocket costs',
    cta: 'Check Benefits'
  }
];

export const peaceOfMindFeatures = [
  {
    icon: 'Zap',
    title: 'Instant Pre-Approval',
    features: [
      'Decisions in under 60 seconds',
      'No impact to your credit score for pre-qualification',
      'Clear approval amounts before you visit the dentist'
    ]
  },
  {
    icon: 'CreditCard',
    title: 'Flexible Payments',
    features: [
      'Choose payment terms that fit your lifestyle',
      'No prepayment penalties',
      'Automatic payment options available'
    ]
  },
  {
    icon: 'Headphones',
    title: '24/7 Support',
    features: [
      'Patient advocates available around the clock',
      'Echo AI assistant for instant answers',
      'Live chat and phone support'
    ]
  },
  {
    icon: 'TrendingUp',
    title: 'Credit Building Opportunity',
    features: [
      'On-time payments can help improve your credit score',
      'Positive payment history reported to credit bureaus',
      'Build credit while improving your health'
    ]
  }
];