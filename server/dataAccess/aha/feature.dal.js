const Release = require('../../models/aha/release.model');
const Feature = require('../../models/aha/feature.model');

export function upsertFeaturesForRelease(releaseId, features) {
  return new Promise((resolve, reject) => {
    Release.findOne({ _id: releaseId })
      .then(release => {
        const r = release;
        r.features = features;
        r.save();
        resolve(r.features);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function upsertDetailedFeature(feature) {
  return new Promise((resolve, reject) => {
    const f = new Feature({
      _id: feature.id,
      _changedDate: new Date(),
      feature,
    });

    Feature.findOneAndUpdate({ _id: f.id }, f, { upsert: true }, (err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('found feature');
      resolve(f);
    });
  });
}

export function findById(id) {
  return new Promise((resolve, reject) => {
    Feature.findOne({ _id: id }).then((feature, err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(feature);
    });
  });
}

export function findByRefNum(refNum) {
  return new Promise((resolve, reject) => {
    Feature.findOne({ 'feature.reference_num': refNum }).then((feature, err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(feature);
    });
  });
}

export function getAllByReleaseId(releaseId) {
  return new Promise((resolve, reject) => {
    Release.findOne({ id: releaseId }, (err, doc) => {
      if (err) {
        reject(err);
      }

      if (doc && doc.release.features) {
        resolve(doc.release.features);
      } else {
        resolve(null);
      }
    });
  });
}
