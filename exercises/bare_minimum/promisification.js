/**
 * Create the promise returning `Async` suffixed versions of the functions below,
 * Promisify them if you can, otherwise roll your own promise returning function
 */ 

var fs = require('fs');
var request = require('request');
var crypto = require('crypto');
var Promise = require('bluebird');

var randomBytesAsync = Promise.promisifyAll(crypto.randomBytes);
Promise.promisifyAll(request);
Promise.promisifyAll(fs);

// (1) Asyncronous HTTP request
var getGitHubProfile = function(user, callback) {
  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true  // will JSON.parse(body) for us
  };

  request.get(options, function(err, res, body) {
    if (err) {
      callback(err, null);
    } else if (body.message) {
      callback(new Error('Failed to get GitHub profile: ' + body.message), null);
    } else {
      callback(null, body);
    }
  });
};

var getGitHubProfileAsync = function(user) {

  var options = {
    url: 'https://api.github.com/users/' + user,
    headers: { 'User-Agent': 'request' },
    json: true  // will JSON.parse(body) for us
  };

  return new Promise((resolve, reject) => {
    
    request.getAsync(options, function(err, res, body) {
      if (err) {
        reject(err);
      } else if (body.message) {
        reject(new Error('Failed to get GitHub profile: ' + body.message), null);
      } else {
        resolve(body);
      }
    });

  })
}


// (2) Asyncronous token generation
var generateRandomToken = function(callback) {
  crypto.randomBytes(20, function(err, buffer) {
    if (err) { return callback(err, null); }
    callback(null, buffer.toString('hex'));
  });
};

var generateRandomTokenAsync = function() {

  return new Promise((resolve, reject) => {

    randomBytesAsync(20, (err, buffer) => {
      if (err){
        reject(err);
      } else {
        resolve(buffer.toString('hex'));
      }
    //   resolve(buffer.toString('hex'));
    // }).catch((err) => {
    //   reject(err);
    // });
    });
  });
} // TODO


// (3) Asyncronous file manipulation
var readFileAndMakeItFunny = function(filePath, callback) {
  fs.readFile(filePath, 'utf8', function(err, file) {
    if (err) { return callback(err); }
   
    var funnyFile = file.split('\n')
      .map(function(line) {
        return line + ' lol';
      })
      .join('\n');

    callback(funnyFile);
  });
};

var readFileAndMakeItFunnyAsync = function(filePath) {

  return new Promise((resolve, reject) => {

    fs.readFileAsync(filePath, 'utf8', function(err, file) {
      if (err) {
        reject(err);
      } else {
        var funnyFile = file.split('\n').map(function(line) {
          return line + ' lol';
        }).join('\n');

        resolve(funnyFile);
      }
    })
  })

}

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getGitHubProfileAsync: getGitHubProfileAsync,
  generateRandomTokenAsync: generateRandomTokenAsync,
  readFileAndMakeItFunnyAsync: readFileAndMakeItFunnyAsync
};
