const router = require('express').Router();
const categoryRoutes = require('./categoryRoutes');
const postRoutes = require('./postRoutes');
const userRoutes = require('./userRoutes');
const reportRoutes = require('./reportRoutes');

router.use('/categories', categoryRoutes);
router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/reports', reportRoutes);

module.exports = router;