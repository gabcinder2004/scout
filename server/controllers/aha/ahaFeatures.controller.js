import { queryAha, API_URL } from './';
import * as featureDAL from '../../dataAccess/aha/feature.dal';
import * as time from '../../util/time';

export function getBasicFeaturesByReleases(req, res) {
  featureDAL
    .getAllByReleaseId(req.query.release)
    .then(features => {
      if (!features || features.length === 0) {
        queryAha(`${API_URL}/releases/${req.query.release}/features?per_page=200`)
          .then(data => {
            featureDAL
              .upsertFeaturesForRelease(req.query.release, data.features)
              .then(p => {
                res.status(200).json(p);
              })
              .catch(err => {
                res.status(500).json({ err: `Error: ${err}` });
              });
          })
          .catch(err => {
            res.status(500).json({ err });
          });
      } else {
        res.status(200).json(features);
      }
    })
    .catch(err => {
      res.status(500).json({ err: `Error: ${err}` });
    });
}

export function getDetailedFeaturesById(req, res) {
  featureDAL.findById(req.params.id).then(feature => {
    if (
      !feature ||
      !feature._changedDate ||
      time.diffByDays(new Date(), feature._changedDate) >= 1
    ) {
      queryAha(`${API_URL}/features/${req.params.id}`)
        .then(response => {
          featureDAL
            .upsertDetailedFeature(response.feature)
            .then(p => {
              res.status(200).json(p);
            })
            .catch(err => {
              res.status(500).json({ err: `Error: ${err}` });
            });
        })
        .catch(err => {
          res.status(500).json(err);
        });
    } else {
      res.status(200).json(feature);
    }
  });
}

export function getDetailedFeaturesByRefNum(req, res) {
  featureDAL.findByRefNum(req.query.ref).then(feature => {
    console.log(feature);
    console.log(time.diffByDays(new Date(), feature._changedDate));
    if (
      !feature ||
      !feature._changedDate ||
      time.diffByDays(new Date(), feature._changedDate) >= 1
    ) {
      queryAha(`${API_URL}/features/${req.query.ref}`)
        .then(response => {
          featureDAL
            .upsertDetailedFeature(response.feature)
            .then(p => {
              res.status(200).json(p);
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({ err });
            });
        })
        .catch(err => {
          res.status(500).json(err);
        });
    } else {
      res.status(200).json(feature);
    }
  });
}
