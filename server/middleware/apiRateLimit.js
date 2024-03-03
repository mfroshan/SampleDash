const rateLimit = require('express-rate-limit');

const customLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // maximum number of requests allowed in the windowMs
  message: 'Too many requests, please try again later.',
  headers: true, // Send custom rate limit headers with the response
  handler: (req, res) => {
    // Customize the response when the rate limit is exceeded
    res.status(429).json({
      error: 'Too many requests, please try again later.',
    });
  },
});

module.exports = customLimiter;
