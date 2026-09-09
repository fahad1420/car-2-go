import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { dbStore } from '../services/storage.js';

const JWT_SECRET = process.env.JWT_SECRET || 'car2go_super_secure_jwt_secret_key_2026_luxury';

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, idNumber, drivingLicenseNumber } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
    }

    const existing = dbStore.find('users', { email: email.toLowerCase().trim() });
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'An account with this email address already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = dbStore.create('users', {
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: phone || '',
      idNumber: idNumber || '',
      drivingLicenseNumber: drivingLicenseNumber || '',
      role: 'customer',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=18181b&textColor=e2f163`
    });

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        avatar: newUser.avatar,
        idNumber: newUser.idNumber,
        drivingLicenseNumber: newUser.drivingLicenseNumber
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Registration failed: ' + error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const users = dbStore.find('users', { email: email.toLowerCase().trim() });
    const user = users[0];

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Please verify your email and password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Please verify your email and password.' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        idNumber: user.idNumber,
        drivingLicenseNumber: user.drivingLicenseNumber
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed: ' + error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = dbStore.findById('users', req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User profile not found.' });
    }
    const { password, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve profile.' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, idNumber, drivingLicenseNumber, currentPassword, newPassword } = req.body;
    const user = dbStore.findById('users', req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const updates = {};
    if (name) updates.name = name;
    if (phone !== undefined) updates.phone = phone;
    if (idNumber !== undefined) updates.idNumber = idNumber;
    if (drivingLicenseNumber !== undefined) updates.drivingLicenseNumber = drivingLicenseNumber;

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ success: false, message: 'Current password is required to set a new password.' });
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
      }
      updates.password = await bcrypt.hash(newPassword, 10);
    }

    const updated = dbStore.updateById('users', req.user.id, updates);
    const { password, ...safeUser } = updated;

    res.json({ success: true, user: safeUser, message: 'Profile updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Profile update failed: ' + error.message });
  }
};

