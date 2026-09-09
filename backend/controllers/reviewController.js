import { dbStore } from '../services/storage.js';

export const getVehicleReviews = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const reviews = dbStore.find('reviews', { vehicleId });
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reviews.' });
  }
};

export const createReview = async (req, res) => {
  try {
    const { vehicleId, rating, title, titleAr, comment, commentAr } = req.body;

    if (!vehicleId || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Vehicle, rating, and review comment are required.' });
    }

    const vehicle = dbStore.findById('vehicles', vehicleId);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found.' });
    }

    const newReview = dbStore.create('reviews', {
      vehicleId,
      userId: req.user.id,
      userName: req.user.name,
      userAvatar: req.user.avatar,
      rating: Number(rating),
      title: title || 'Exceptional Experience',
      titleAr: titleAr || 'تجربة استثنائية راقية',
      comment,
      commentAr: commentAr || comment,
      date: new Date().toISOString(),
      verified: true
    });

    // Recalculate vehicle average rating
    const allReviews = dbStore.find('reviews', { vehicleId });
    const avg = (allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length).toFixed(2);
    dbStore.updateById('vehicles', vehicleId, {
      rating: parseFloat(avg),
      reviewCount: allReviews.length
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your prestigious review.',
      review: newReview
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Review submission failed: ' + error.message });
  }
};

