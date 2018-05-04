import { Router } from 'express';
const ahaRoutes = require('./aha');

const router = new Router();

router.use('/aha', ahaRoutes);

module.exports = router;
