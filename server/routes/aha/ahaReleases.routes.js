import { Router } from 'express';
import * as AhaController from '../../controllers/aha';
const router = new Router();

// Get all features by release id or feature id
router.route('/').get((req, res) => {
  if (req.query.product) {
    AhaController.Releases.getBasicReleasesByProduct(req, res);
  } else if (req.query.id) {
    AhaController.Releases.getDetailedReleasesByReleaseId(req, res);
  } else {
    res.sendStatus(500);
  }
});

router.route('/:id').get((req, res) => {
  AhaController.Releases.getDetailedReleasesByReleaseId(req, res);
});

module.exports = router;
