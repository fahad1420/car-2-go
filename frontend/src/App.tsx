import React, { useState } from 'react';
import { I18nProvider } from './i18n/i18nContext';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { FleetPage } from './pages/FleetPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';
import { BookingPage } from './pages/BookingPage';
import { ServicesPage } from './pages/ServicesPage';
import { LocationsPage } from './pages/LocationsPage';
import { ContactPage } from './pages/ContactPage';
import { AuthPage } from './pages/AuthPage';
import { AccountPage } from './pages/AccountPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { Vehicle } from './types';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <I18nProvider>
      <AuthProvider>
        <BookingProvider>
          <div className="min-h-screen flex flex-col bg-brand-pure text-brand-charcoal selection:bg-brand-lemon selection:text-brand-charcoal">
            {/* Global Luxury Navbar */}
            <Navbar currentPage={currentPage} onNavigate={navigateTo} />

            {/* Page Router */}
            <div className="flex-1">
              {currentPage === 'home' && (
                <HomePage
                  onNavigate={navigateTo}
                  onSelectVehicle={(veh) => {
                    setSelectedVehicle(veh);
                    navigateTo('vehicle-detail');
                  }}
                />
              )}

              {currentPage === 'fleet' && (
                <FleetPage
                  onNavigate={navigateTo}
                  onSelectVehicle={(veh) => {
                    setSelectedVehicle(veh);
                    navigateTo('vehicle-detail');
                  }}
                />
              )}

              {currentPage === 'vehicle-detail' && (
                <VehicleDetailPage
                  vehicle={selectedVehicle}
                  onNavigate={navigateTo}
                />
              )}

              {currentPage === 'booking' && (
                <BookingPage onNavigate={navigateTo} />
              )}

              {currentPage === 'services' && (
                <ServicesPage onNavigate={navigateTo} />
              )}

              {currentPage === 'locations' && (
                <LocationsPage />
              )}

              {currentPage === 'contact' && (
                <ContactPage />
              )}

              {currentPage === 'auth' && (
                <AuthPage onNavigate={navigateTo} />
              )}

              {currentPage === 'account' && (
                <AccountPage onNavigate={navigateTo} />
              )}

              {currentPage === 'admin' && (
                <AdminDashboardPage onNavigate={navigateTo} />
              )}
            </div>

            {/* Global Luxury Footer */}
            <Footer onNavigate={navigateTo} />
          </div>
        </BookingProvider>
      </AuthProvider>
    </I18nProvider>
  );
}

export default App;

