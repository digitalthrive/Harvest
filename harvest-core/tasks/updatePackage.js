import async from 'async';
import fs from 'fs';
import coreConfig from '../config/config';
import childProcess from 'child_process';

const exec = childProcess.exec;

export default function(config, cb) {
  const baseDevDependencies = coreConfig.baseDevDependencies;
  config.devDependencies = baseDevDependencies;
  const {name, version, description, main, author, license, devDependencies} = config;
  const packageJsonData = {name, version, description, main, author, license, devDependencies};

  async.series([
    (cb) => {
      fs.writeFile('package.json', JSON.stringify(packageJsonData, null, 2), (err) => {
        cb(err, true);
      });
    },
    (cb) => {
      let sudo = '';
      if(config.sudo === 'Yes') sudo = 'sudo ';
      exec(sudo + 'npm install; npm prune;', (err, stdout, stderr) => {
          if(stdout) console.log(stdout);
          if(stderr) console.log(stderr);
          cb(err, true);
        });
    }
  ], (err, results) => {
    cb(err, results);
  });
};
