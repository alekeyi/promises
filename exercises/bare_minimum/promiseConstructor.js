/**
 * Implement these promise-returning functions.
 * Any successful value should be made available in the next `then` block chained
 * to the function invocation, while errors should be available in the `catch` block
 */

var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFileAsync = function(filePath) {
  // TODO

  fs = Promise.promisifyAll(require('fs'));

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(data.split('\n')[0]);
      }
    })
  })

  // return new Promise((resolve, reject) => {
  //   fs.readFileAsync(filePath, 'utf8').then((data) => {
  //     resolve(data.split('\n')[0]);
  //   }).catch((err) => {
  //     reject(err);
  //   })
  // })
  
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCodeAsync = function(url) {
  // TODO
  request = Promise.promisifyAll(require('request'));

  return new Promise((resolve, reject) => {
    request(url, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response.statusCode);
      }
    });
  });
};


//   return new Promise((resolve, reject) => {
//     request.getAsync(url).then((response) => {
//       resolve(response.statusCode);
//     }).catch((err) => {
//       reject(err);
//     })
//   })
// };

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCodeAsync: getStatusCodeAsync,
  pluckFirstLineFromFileAsync: pluckFirstLineFromFileAsync
};
