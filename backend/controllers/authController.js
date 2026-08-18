const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { email, password, username, name } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email: normalizedEmail,
      password: hashedPassword,
      username: username || '',
      name: name || '',
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server error during registration.' });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!normalizedEmail || !password) {
      return res.status(400).json({ message: 'Please provide email and password.' });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'auragen_secret_key',
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
      },
      message: 'Login successful',
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server error during login.' });
  }
};

// GET /api/auth/google/callback
exports.googleCallback = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=google`
      );
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET || "auragen_secret_key",
      {
        expiresIn: "7d",
      }
    );

    const frontendUrl =
      process.env.FRONTEND_URL ||
      "http://localhost:3000";

    return res.redirect(
      `${frontendUrl}/auth/callback?token=${encodeURIComponent(
        token
      )}`
    );
  } catch (error) {
    console.error(
      "Google callback error:",
      error
    );

    return res.redirect(
      `${process.env.FRONTEND_URL}/login?error=google`
    );
  }
};

// GET /api/auth/github/callback
exports.githubCallback = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/login?error=github`
      );
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET || "auragen_secret_key",
      {
        expiresIn: "7d",
      }
    );

    const frontendUrl =
      process.env.FRONTEND_URL ||
      "http://localhost:3000";

    return res.redirect(
      `${frontendUrl}/auth/callback?token=${encodeURIComponent(
        token
      )}`
    );
  } catch (error) {
    console.error("GitHub callback error:", error);

    return res.redirect(
      `${process.env.FRONTEND_URL}/login?error=github`
    );
  }
};