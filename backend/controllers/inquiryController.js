import { dbStore } from '../services/storage.js';

export const submitInquiry = async (req, res) => {
  try {
    const { name, email, phone, serviceType, message, requestedDates } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and inquiry message are required.' });
    }

    const inquiry = dbStore.create('inquiries', {
      name,
      email,
      phone: phone || '',
      serviceType: serviceType || 'General Concierge',
      message,
      requestedDates: requestedDates || '',
      status: 'Unread', // Unread, Contacted, Resolved
      createdAt: new Date().toISOString()
    });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been relayed to our VIP Concierge team. We will contact you shortly.',
      inquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Inquiry submission failed: ' + error.message });
  }
};

