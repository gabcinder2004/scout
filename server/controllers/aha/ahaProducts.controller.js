import * as productDAL from '../../dataAccess/aha/product.dal';
import { queryAha, API_URL } from './';
import * as time from '../../util/time';

function updateProducts(data, res) {
  productDAL
      .createMany(data.products)
      .then(products => {
        res.status(200).json(products);
      })
      .catch(err => {
        console.log('updateProducts: error');
        console.log(err);
        res.status(500).json({ err });
      });
}

function upsertProduct(product, res) {
  productDAL
      .upsert(product)
      .then((p) => {
        res.status(200).json(p);
      })
      .catch(err => {
        console.log('updateProducts: error');
        console.log(err);
        res.status(500).json({ err });
      });
}

export function getBasicProducts(req, res) {
  productDAL.getAll().then(savedProducts => {
    if (savedProducts.length === 0) {
      queryAha(`${API_URL}/products?per_page=100`)
          .then(data => {
            updateProducts(data, res);
          })
          .catch(err => {
            console.log('getProducts: error');
            console.log(err);
            res.status(500).json({ err });
          });
    } else {
      res.status(200).json(savedProducts);
    }
  });
}


export function getDetailedProductById(req, res) {
  productDAL.getById(req.params.id)
    .then(result => {
      if (!result || !result.product.default_capacity_units || time.diffByDays(new Date(), result._changedDate) >= 1) {
        queryAha(`${API_URL}/products/${req.params.id}`)
          .then(data => {
            upsertProduct(data.product, res);
          })
          .catch(err => {
            console.log('getProducts: error');
            console.log(err);
            res.status(500).json({ err });
          });
      } else {
        res.status(200).json(result);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
}

