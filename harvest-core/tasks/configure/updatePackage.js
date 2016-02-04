/*
 * Task: updatePackage
 * Updates the package.json file and runs NPM taks (install and cleanup)
 */

// Core libraries
import async from 'async';
import fs from 'fs';
import coreConfig from '../../config/config';
import childProcess from 'child_process';

// We need the exec to process the CLI tasks for NPM
const exec = childProcess.exec;

const addLibs = (npmDevDep, config) => {
  if(config.css === 'SCSS') npmDevDep['gulp-sass'] = '^2.2.0';
  if(config.css === 'LESS') npmDevDep['gulp-sass'] = '^3.0.5';
  if(config.css === 'Stylus') npmDevDep['gulp-sass'] = '^2.3.0';
  if(config.js === 'Browserify') npmDevDep['browserify'] = '^13.0.0';
  if(config.js === 'Browserify') npmDevDep['vinyl-source-stream'] = '^1.1.0';
  if(config.js === 'Webpack') npmDevDep['gulp-webpack'] = '^1.5.0';
  if(config.js === 'JS PM') npmDevDep['gulp-jspm'] = '^0.5.6';
};

/*
 * default
 * Public method that updates the NPM package and runs CLI tasks
 * @params: config (object) - config from the CLI prompts
 * @params: cb     (function) - callback for async
 */
export default function(config, cb) {
  config.devDependencies = coreConfig.baseDevDependencies;

  config.devDependencies = addLibs(config.devDependencies, config);

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
