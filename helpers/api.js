const axios = require('axios');
const config = require('../config.js');

axios.defaults.headers.common.authorization = config.API_TOKEN;

// broken down by widget to minimize toe-on-toe action

// INTERACTION WIDGET HELPER

const sendClickData = async (data) => {
  try {
    const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/interactions';
    const response = await axios.post(url, data);
    console.log(response.status);
  } catch (error) {
    console.log(error);
  }
};

// PRODUCTS DETAIL WIDGET HELPERS

const getProductData = (id, cb) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${id}`)
    .then((response) => {
      cb(null, response);
    })
    .catch((err) => cb(err, null));
};

const getStyles = (id, cb) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${id}/styles`)
    .then((response) => {
      cb(null, response);
    })
    .catch((err) => cb(err, null));
};

const getRelated = (id, cb) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${id}/related`)
    .then((response) => {
      cb(null, response);
    })
    .catch((err) => cb(err, null));
};

// RATINGS/REVIEWS WIDGET HELPERS
const getReviews = (id, cb) => {
  // IOCE - input a product id and a callback
  // output is an array of all reviews for the input product id
  // method of operation is a recursive call to each page until reviews array is empty... asynchronously
  // /api/fec2/hr-bld/reviews?product_id=####
  const reviews = [];
  const innerRecursiveFunc = (pageCount) => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/?page=${pageCount}&product_id=${id}`)
      .then((response) => {
        // base case reviews empty
        if (response.data.results.length === 0) {
          cb(null, reviews.flat());
          return;
        }
        // recursive
        if (response.data.results.length > 0) {
          reviews.push(response.data.results);
          innerRecursiveFunc(pageCount + 1);
        }
      })
      .catch((err) => {
        // err does not get triggered if the page is empty.  Only if the request fails at the server.
        cb(err, null);
      });
  };
  innerRecursiveFunc(1);
};

const getReviewsMeta = (id, cb) => {
  axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/meta?product_id=${id}`)
    .then((response) => {
      cb(null, response);
    })
    .catch((err) => {
      cb(err, null);
    });
};

const markHelpful = (reviewId, cb) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/${reviewId}/helpful`)
    .then((response) => {
      cb(null, response);
    })
    .catch((err) => {
      cb(err, null);
    });
};
const reportReview = (reviewId, cb) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/${reviewId}/report`)
    .then((response) => {
      cb(null, response);
    })
    .catch((err) => {
      cb(err, null);
    });
};

module.exports = {
  getProductData,
  getStyles,
  getRelated,
  getReviews,
  getReviewsMeta,
  markHelpful,
  reportReview,
  sendClickData
};
