import jwt from 'jsonwebtoken';
import { dbStore } from '../services/storage.js';

const JWT_SECRET = process.env.JWT_SECRET || 'car2go_super_secure_jwt_secret_key_2026_luxury';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = dbStore.findById('users', decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'User session invalid or user not found.' });
    }

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      avatar: user.avatar
    };
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Restricted access: Administrator privileges required.' });
  }
  next();
};

