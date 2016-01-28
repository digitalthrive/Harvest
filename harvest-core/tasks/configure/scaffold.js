import fs from 'fs';
import async from 'async';

const isDir = (path, cb) => {
  fs.stat(path, (err, stats) => {
    if(err) return cb(err, null);
    return cb(err, stats.isDirectory());
  })
};

const mkdir = (path, cb) => {
  fs.mkdir(path, (err) => cb(err));
};

const readOrMakeDir = (path, cb) => {
  isDir(path, (err, results) => {
    if(err.code === 'ENOENT') mkdir(path, (err) => cb(err));
  });
};

const move = (source, dest, cb) => {
  /* needs to implement moving template to source */
};

export default function(config, cb) {
  async.parallel([
    (cb) => {
      readOrMakeDir(config.src, (err) => cb(err));
    },
    (cb) => {
      readOrMakeDir(config.dist, (err) => cb(err));
    }
  ], (err, results) => {
    console.log('Finished with the directories');
    cb(err, results);
  });

};
