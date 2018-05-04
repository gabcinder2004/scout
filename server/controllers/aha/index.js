import axios from 'axios';

import * as AhaProducts from './ahaProducts.controller';
import * as AhaFeatures from './ahaFeatures.controller';
import * as AhaReleases from './ahaReleases.controller';

export const API_URL = 'https://ultimatesoftware.aha.io/api/v1';

export function queryAha(url) {
  return new Promise((resolve, reject) => {
    console.log(`querying ${url}`);
    axios
      .get(`${url}`, {
        headers: {
          Authorization:
            'Bearer 9cb8e58ea1a6f992d7027702ed48024e1f9d972ba0f84203f54b320e1ecb3225'
        }
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
    Products: AhaProducts,
    Releases: AhaReleases,
    Features: AhaFeatures,
    queryAha: queryAha,
    API_URL: API_URL
}
