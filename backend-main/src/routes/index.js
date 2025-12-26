const express = require('express');
const router = express.Router();

// Import other route files
const aiRoutes = require('./ai');



// Use the imported routes
router.use('/ai', aiRoutes);

module.exports = router;