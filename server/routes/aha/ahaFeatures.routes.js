import { Router } from 'express';
import * as AhaController from '../../controllers/aha';
const router = new Router();

router.route('/').get((req, res) => {
  if (req.query.release) {
    AhaController.Features.getBasicFeaturesByReleases(req, res);
  } else if (req.query.ref) {
    AhaController.Features.getDetailedFeaturesByRefNum(req, res);
  } else {
    res.sendStatus(500);
  }
});

router.route('/:id').get((req, res) => {
  AhaController.Features.getDetailedFeaturesById(req, res);
});

module.exports = router;
