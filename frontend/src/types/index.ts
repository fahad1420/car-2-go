export type Language = 'en' | 'ar';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  avatar?: string;
  idNumber?: string;
  drivingLicenseNumber?: string;
}

export interface Vehicle {
  _id: string;
  name: string;
  brand: string;
  category: 'Luxury' | 'Sports' | 'Executive' | 'SUV' | 'Electric';
  tagline: string;
  taglineAr?: string;
  year: number;
  pricePerDay: number;
  weeklyDiscount?: number;
  deposit: number;
  currency: string;
  transmission: string;
  fuelType: string;
  seats: number;
  doors: number;
  acceleration: string;
  topSpeed: string;
  horsepower: string;
  engine: string;
  color: string;
  available: boolean;
  availableForDates?: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  mileageLimitPerDay: number;
  extraMileageCost: number;
  location: string;
  images: string[];
  features: string[];
  featuresAr?: string[];
  reviews?: Review[];
}

export interface AddonOption {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  selected: boolean;
}

export interface Booking {
  _id?: string;
  bookingReference?: string;
  vehicleId: string;
  vehicleName?: string;
  vehicleImage?: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  idNumber?: string;
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
  days: number;
  baseDailyRate: number;
  baseTotal: number;
  addons: { id: string; name: string; price: number }[];
  addonsTotal: number;
  promoCode?: string | null;
  discountAmount: number;
  vatRate: number;
  vatAmount: number;
  depositAmount: number;
  totalAmount: number;
  paymentMethod?: string;
  status: 'Pending' | 'Confirmed' | 'Active' | 'Completed' | 'Cancelled' | 'Rejected';
  notes?: string;
  createdAt?: string;
}

export interface Review {
  _id?: string;
  vehicleId: string;
  userId?: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  titleAr?: string;
  comment: string;
  commentAr?: string;
  date: string;
  verified: boolean;
}

export interface HubLocation {
  id: string;
  name: string;
  nameAr: string;
  city: string;
  cityAr: string;
  country: string;
  countryAr: string;
  address: string;
  addressAr: string;
  phone: string;
  image: string;
  tag: string;
}

export interface PromoCodeResult {
  valid: boolean;
  code: string;
  discountPercent: number;
  maxDiscount: number;
  calculatedDiscount: number;
  description: string;
}

