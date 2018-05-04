import { Router } from 'express';
const ahaFeatures = require('./ahaFeatures.routes');
const ahaReleases = require('./ahaReleases.routes');
const ahaProducts = require('./ahaProducts.routes');
const router = new Router();

router.use('/features', ahaFeatures);
router.use('/releases', ahaReleases);
router.use('/products', ahaProducts);

module.exports = router;
