import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db_store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class StorageEngine {
  constructor() {
    this.state = {
      users: [],
      vehicles: [],
      bookings: [],
      reviews: [],
      promos: [],
      inquiries: [],
      settings: {
        companyName: 'CAR 2 GO Luxury Mobility',
        taxRate: 0.15, // 15% VAT KSA
        currency: 'SAR',
        contactPhone: '+966 800 227 246',
        conciergeEmail: 'concierge@car2go.sa',
        depositRate: 2000,
        hubs: [
          { id: 'ruh-airport', name: 'Riyadh - King Khalid International Airport (Terminal 1-5 VIP)', city: 'Riyadh', country: 'Saudi Arabia', coordinates: [24.9576, 46.6988] },
          { id: 'ruh-olaya', name: 'Riyadh - Al Olaya Prestige Showroom', city: 'Riyadh', country: 'Saudi Arabia', coordinates: [24.7136, 46.6753] },
          { id: 'jed-corniche', name: 'Jeddah - North Corniche Waterfront Hub', city: 'Jeddah', country: 'Saudi Arabia', coordinates: [21.5433, 39.1728] },
          { id: 'alula-resort', name: 'AlUla - Banyan Tree & Desert Resort Pavilion', city: 'AlUla', country: 'Saudi Arabia', coordinates: [26.6190, 37.9220] },
          { id: 'dmm-khobar', name: 'Eastern Province - Al Khobar Corniche Concierge', city: 'Khobar', country: 'Saudi Arabia', coordinates: [26.2818, 50.2084] },
          { id: 'dxb-difc', name: 'Dubai - DIFC Gate Precinct Hub', city: 'Dubai', country: 'UAE', coordinates: [25.2048, 55.2708] },
          { id: 'doh-pearl', name: 'Doha - The Pearl Island Concierge', city: 'Doha', country: 'Qatar', coordinates: [25.3713, 51.5488] }
        ]
      }
    };
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.state = { ...this.state, ...parsed };
      }
    } catch (e) {
      console.error('[Storage] Error loading store file, starting with default state:', e.message);
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (e) {
      console.error('[Storage] Error persisting store file:', e.message);
    }
  }

  // Generic helpers
  find(collection, query = {}) {
    let items = this.state[collection] || [];
    return items.filter(item => {
      for (const key of Object.keys(query)) {
        if (query[key] !== undefined && item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  }

  findById(collection, id) {
    const items = this.state[collection] || [];
    return items.find(item => item._id === id || item.id === id) || null;
  }

  create(collection, data) {
    const newItem = {
      _id: 'c2g_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
    };
    if (!this.state[collection]) {
      this.state[collection] = [];
    }
    this.state[collection].unshift(newItem);
    this.save();
    return newItem;
  }

  updateById(collection, id, updates) {
    const items = this.state[collection] || [];
    const index = items.findIndex(item => item._id === id || item.id === id);
    if (index === -1) return null;
    this.state[collection][index] = {
      ...this.state[collection][index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.state[collection][index];
  }

  deleteById(collection, id) {
    const items = this.state[collection] || [];
    const index = items.findIndex(item => item._id === id || item.id === id);
    if (index === -1) return false;
    this.state[collection].splice(index, 1);
    this.save();
    return true;
  }

  setCollection(collection, data) {
    this.state[collection] = data;
    this.save();
  }
}

export const dbStore = new StorageEngine();

