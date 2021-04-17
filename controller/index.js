const router = require('express').Router();

// Setup our overall router controls
const apiRoutes = require('./api/workouts');
const homeRoutes = require('./homeRoutes');
// Require any other routes created

router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;
