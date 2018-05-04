const Release = require('../../models/aha/release.model');
const Product = require('../../models/aha/product.model');

export function upsertReleasesForProduct(productId, releases) {
  return new Promise((resolve, reject) => {
    Product.findOne({ _id: productId })
      .then(product => {
        const p = product;
        p.releases = releases;
        p.save();
        resolve(p.releases);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function upsertDetailedReleaseById(releaseId, release) {
  return new Promise((resolve, reject) => {
    const r = new Release({
      _id: release.id,
      _changedDate: new Date(),
      release,
    });

    Release.findOneAndUpdate({ _id: r.id }, r, { upsert: true }, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(r);
    });
  });
}

export function findById(id) {
  return new Promise((resolve, reject) => {
    Release.findOne({ _id: id }).then((release, err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(release);
    });
  });
}

export function getAllByProductId(productId) {
  return new Promise((resolve, reject) => {
    Product.findOne({ id: productId }, (err, doc) => {
      if (err) {
        reject(err);
      }

      if (doc && doc.product.releases) {
        resolve(doc.product.releases);
      } else {
        resolve(null);
      }
    });
  });
}
