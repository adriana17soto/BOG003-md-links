const path = require("path");
const fs = require("fs");
const resolve = require("path").resolve;
//const { resolve } = require('path');

const fileHound = require("filehound");
const axios = require("axios");
const marked = require("marked");
//const { RSA_NO_PADDING } = require("constants");
//const { options } = require("marked");
//const { default: axios } = require("axios");

/*const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    fileOrDirectory(path)
      .then((files) => {
        //console.log(files)
        resolve(files);
      })
      .catch((err) => {
        reject(err);
      });
  });
};*/



/*

const fs = require("fs");

fs.readFile('filetest.md', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
});
*/
