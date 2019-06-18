/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
Promise.promisifyAll(fs);


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return new Promise((resolve, reject) => {
    fs.readFileAsync(readFilePath, 'utf8').then((data) => {
      var firstLine = data.split('\n')[0];
      console.log("First line within first dot then", firstLine);
    }).then((firstLine) => {
      console.log("First Line within second dot then", firstLine);
      resolve(fs.writeFileAsync(writeFilePath, firstLine, 'utf8'));
    }).catch((err) => {
        reject(err);
    });
  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
