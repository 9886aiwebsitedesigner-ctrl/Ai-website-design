export type ServiceCategory = 
  | 'all'
  | 'jtr-straightening'
  | 'digital-perms'
  | 'precision-cuts'
  | 'color-balayage'
  | 'head-spa-treatments'
  | 'extensions-styling';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  priceStartingAt: number;
  priceNote?: string;
  durationMinutes: number;
  description: string;
  highlights: string[];
  recommendedStylists: string[];
  requiresConsultation?: boolean;
  image?: string;
  tag?: string;
}

export interface Stylist {
  id: string;
  name: string;
  title: string;
  experienceYears: number;
  licenses: string[];
  bio: string;
  specialties: string[];
  image: string;
  availableDays: string[];
  instagramHandle?: string;
  quote: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  stylist: string;
  hairType: string;
  servicesUsed: string[];
  description: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  service: string;
  stylist: string;
  timeTaken: string;
  hairStory: string;
  beforeImage: string;
  afterImage: string;
  keyBenefits: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  service: string;
  stylist: string;
  review: string;
  verified: boolean;
}

export interface BookingFormState {
  serviceId: string;
  stylistId: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  hairLength: 'short' | 'medium' | 'long' | 'extra-long';
  previousChemicalHistory: string[];
  notes: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  description: string;
  options: {
    label: string;
    description: string;
    trait: 'jtr' | 'digital-perm' | 'keratin' | 'head-spa' | 'balayage' | 'cut';
  }[];
}
