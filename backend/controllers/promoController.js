import { dbStore } from '../services/storage.js';

export const validatePromo = async (req, res) => {
  try {
    const { code, amount } = req.body;
    if (!code) {
      return res.status(400).json({ success: false, message: 'Promo code is required.' });
    }

    const promo = dbStore.find('promos', { code: code.trim().toUpperCase(), active: true })[0];
    if (!promo) {
      return res.status(404).json({ success: false, message: 'Invalid or expired promotional privilege code.' });
    }

    if (new Date(promo.validUntil) < new Date()) {
      return res.status(400).json({ success: false, message: 'This privilege code has expired.' });
    }

    const baseAmount = Number(amount) || 0;
    const discount = baseAmount > 0
      ? Math.min((baseAmount * promo.discountPercent) / 100, promo.maxDiscount || Infinity)
      : 0;

    res.json({
      success: true,
      valid: true,
      code: promo.code,
      discountPercent: promo.discountPercent,
      maxDiscount: promo.maxDiscount,
      calculatedDiscount: discount,
      description: promo.description
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to validate promo code.' });
  }
};

