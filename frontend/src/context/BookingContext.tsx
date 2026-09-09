import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle, AddonOption, PromoCodeResult } from '../types';
import { api } from '../services/api';

export const DEFAULT_ADDONS: AddonOption[] = [
  {
    id: 'vip-delivery',
    name: 'VIP Runway / Private Aviation Hand-Off',
    nameAr: 'تسليم صالة الطيران الخاص ومدرج المطار',
    description: 'Chilled Arabic refreshments, escort, and luggage coordination at private jet steps.',
    descriptionAr: 'ضيافة قهوة وتمر فاخر، وتنسيق الأمتعة مباشرة أمام سلم الطائرة الخاصة.',
    price: 500,
    selected: false
  },
  {
    id: 'full-protection',
    name: 'Zero-Deductible Elite Protection',
    nameAr: 'تغطية شاملة بدون نسبة تحمل (درع النخبة)',
    description: 'Complete bumper-to-bumper damage and tire/glass waiver with zero deductible.',
    descriptionAr: 'إعفاء تام وشامل من نسبة التحمل للسيارة والزجاج والإطارات لراحة بال مطلقة.',
    price: 450,
    selected: true
  },
  {
    id: 'chauffeur-service',
    name: 'Executive Multilingual Chauffeur',
    nameAr: 'سائق تنفيذي خاص محترف',
    description: 'Private suited driver with executive road protocol and route discretion.',
    descriptionAr: 'سائق خاص بالزي الرسمي مدرب على أعلى معايير البروتوكول والخصوصية والمسارات.',
    price: 1200,
    selected: false
  },
  {
    id: 'child-safety',
    name: 'Bespoke Child Safety Seat',
    nameAr: 'مقعد أطفال فاخر مريح',
    description: 'ISOFIX certified premium leather children safety seat sanitised prior to arrival.',
    descriptionAr: 'مقعد أطفال جلدي فاخر معقم بالكامل ومطابق لأعلى معايير الأمان ISOFIX.',
    price: 150,
    selected: false
  },
  {
    id: 'gcc-crossborder',
    name: 'Cross-Border GCC Travel Permit',
    nameAr: 'تصريح القيادة والتنقل الدولي لدول الخليج',
    description: 'Official GCC cross-border authorization paperwork (UAE, Qatar, Bahrain, Kuwait).',
    descriptionAr: 'إصدار تصاريح العبور الرسمية المعتمدة للتنقل بين السعودية والإمارات وقطر والكويت.',
    price: 800,
    selected: false
  }
];

interface BookingContextType {
  pickupLocation: string;
  returnLocation: string;
  pickupDate: string;
  returnDate: string;
  sameLocation: boolean;
  selectedVehicle: Vehicle | null;
  addons: AddonOption[];
  promoCode: string;
  promoData: PromoCodeResult | null;
  notes: string;
  days: number;
  baseTotal: number;
  addonsTotal: number;
  discountAmount: number;
  vatAmount: number;
  depositAmount: number;
  totalAmount: number;
  step: number;
  setPickupLocation: (loc: string) => void;
  setReturnLocation: (loc: string) => void;
  setPickupDate: (date: string) => void;
  setReturnDate: (date: string) => void;
  setSameLocation: (same: boolean) => void;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  toggleAddon: (id: string) => void;
  setNotes: (notes: string) => void;
  setStep: (step: number) => void;
  applyPromoCode: (code: string) => Promise<{ success: boolean; message: string }>;
  removePromoCode: () => void;
  resetBooking: () => void;
  startBookingWithVehicle: (vehicle: Vehicle) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default dates: tomorrow at 10:00 to 3 days later at 18:00
  const getTomorrow = (addDays = 1, hours = 10) => {
    const d = new Date();
    d.setDate(d.getDate() + addDays);
    d.setHours(hours, 0, 0, 0);
    return d.toISOString().slice(0, 16);
  };

  const [pickupLocation, setPickupLocation] = useState<string>('Riyadh - King Khalid International Airport (Terminal 1-5 VIP)');
  const [returnLocation, setReturnLocation] = useState<string>('Riyadh - King Khalid International Airport (Terminal 1-5 VIP)');
  const [pickupDate, setPickupDate] = useState<string>(() => getTomorrow(1, 10));
  const [returnDate, setReturnDate] = useState<string>(() => getTomorrow(4, 18));
  const [sameLocation, setSameLocation] = useState<boolean>(true);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [addons, setAddons] = useState<AddonOption[]>(DEFAULT_ADDONS);
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoData, setPromoData] = useState<PromoCodeResult | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [step, setStep] = useState<number>(1);

  // Sync return location when sameLocation is true
  useEffect(() => {
    if (sameLocation) {
      setReturnLocation(pickupLocation);
    }
  }, [pickupLocation, sameLocation]);

  // Calculate duration
  const pStart = new Date(pickupDate).getTime();
  const pEnd = new Date(returnDate).getTime();
  const diffHours = isNaN(pStart) || isNaN(pEnd) ? 24 : Math.max(24, (pEnd - pStart) / (1000 * 60 * 60));
  const days = Math.max(1, Math.ceil(diffHours / 24));

  // Calculations
  const baseDailyRate = selectedVehicle ? selectedVehicle.pricePerDay : 0;
  let baseTotal = baseDailyRate * days;

  if (days >= 7 && selectedVehicle?.weeklyDiscount) {
    baseTotal = baseTotal * (1 - selectedVehicle.weeklyDiscount / 100);
  }

  const addonsTotal = addons.reduce((sum, item) => (item.selected ? sum + item.price : sum), 0);

  let discountAmount = 0;
  if (promoData && promoData.valid) {
    const calc = (baseTotal * promoData.discountPercent) / 100;
    discountAmount = Math.min(calc, promoData.maxDiscount || calc);
  }

  const subtotal = Math.max(0, (baseTotal + addonsTotal) - discountAmount);
  const vatRate = 0.15;
  const vatAmount = subtotal * vatRate;
  const depositAmount = selectedVehicle ? selectedVehicle.deposit : 5000;
  const totalAmount = subtotal + vatAmount;

  const toggleAddon = (id: string) => {
    setAddons(prev => prev.map(a => a.id === id ? { ...a, selected: !a.selected } : a));
  };

  const applyPromoCode = async (code: string) => {
    if (!code) return { success: false, message: 'Please enter a code' };
    try {
      const res = await api.post('/promos/validate', { code, amount: baseTotal });
      if (res.success && res.valid) {
        setPromoCode(code.toUpperCase());
        setPromoData(res);
        return { success: true, message: `Promo applied: ${res.discountPercent}% VIP privilege.` };
      }
      return { success: false, message: res.message || 'Invalid promo code' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Invalid promo code' };
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setPromoData(null);
  };

  const resetBooking = () => {
    setSelectedVehicle(null);
    setAddons(DEFAULT_ADDONS);
    setPromoCode('');
    setPromoData(null);
    setNotes('');
    setStep(1);
  };

  const startBookingWithVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setStep(3);
  };

  return (
    <BookingContext.Provider
      value={{
        pickupLocation,
        returnLocation,
        pickupDate,
        returnDate,
        sameLocation,
        selectedVehicle,
        addons,
        promoCode,
        promoData,
        notes,
        days,
        baseTotal,
        addonsTotal,
        discountAmount,
        vatAmount,
        depositAmount,
        totalAmount,
        step,
        setPickupLocation,
        setReturnLocation,
        setPickupDate,
        setReturnDate,
        setSameLocation,
        setSelectedVehicle,
        toggleAddon,
        setNotes,
        setStep,
        applyPromoCode,
        removePromoCode,
        resetBooking,
        startBookingWithVehicle
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within a BookingProvider');
  return context;
};

