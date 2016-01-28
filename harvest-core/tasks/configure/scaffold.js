import fs from 'fs';

const isDir = (path, cb) => {
  fs.stat(path, (err, stats) => {
    if(err) return cb(err, null);
    return cb(err, stats.isDirectory());
  })
};

const mkdir = (path, cb) => {
  fs.mkdir(path, (err) => cb(err));
};

export default function(config, cb) {
  isDir(config.src, (err, results) => {
    console.log(err);
    console.log(results);
  });

  cb(null);
};
