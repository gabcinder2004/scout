const Product = require('../../models/aha/product.model');

export function createMany(products) {
  return new Promise(resolve => {
    const promises = [];
    products.forEach(product => {
      promises.push(this.upsert(product));
    });

    Promise.all(promises).then(values => {
      resolve(values);
    });
  });
}

export function upsert(product) {
  return new Promise((resolve, reject) => {
    const p = new Product({
      _id: product.id,
      _changedDate: new Date(),
      product,
    });

    Product.findOneAndUpdate({ _id: product.id }, p, { upsert: true }, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(p);
    });
  });
}

export function getAll() {
  return new Promise((resolve, reject) => {
    Product.find({}, '_id, _changedDate product.name product.created_at product.product_line product.reference_prefix')
      .then(products => {
        resolve(products);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getById(id) {
  return new Promise((resolve, reject) => {
    Product.findOne({ _id: id })
      .then(product => {
        resolve(product);
      })
      .catch(err => {
        reject(err);
      });
  });
}
