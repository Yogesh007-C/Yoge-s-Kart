// Input validation middleware
const validator = require('validator');

const validateEmail = (email) => {
  return validator.isEmail(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateRegistration = (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateEmail,
};
