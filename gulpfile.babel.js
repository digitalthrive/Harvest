import gulp from 'gulp';
import fs from 'fs';
import prompt from 'gulp-prompt';
import childProcess from 'child_process';
import async from 'async';
import config from './harvest-core/config/config';
import prompts from './harvest-core/config/prompts';

const exec = childProcess.exec;

gulp.task('configure', (cb) => {
  const baseDevDependencies = config.baseDevDependencies;

  gulp.src('package.json')
      .pipe(prompt.prompt(
        prompts,
        (config) => {
          config.devDependencies = baseDevDependencies;

          const {name, version, description, main, author, license, devDependencies} = config;
          const packageJsonData = {name, version, description, main, author, license, devDependencies};

          async.parallel([
            function(cb) {
              fs.writeFile('package.json', JSON.stringify(packageJsonData, null, 2), (err) => {

                let sudo = '';
                if(config.sudo === 'Yes') sudo = 'sudo ';
                exec(sudo + 'npm install; npm prune;', (err, stdout, stderr) => {
                    if(stdout) console.log(stdout);
                    if(stderr) console.log(stderr);
                    cb(err, true);
                  }
                );
              });
            },
            function(cb) {
              fs.writeFile('harvest.json', JSON.stringify(config, null, 2), (err) => {
                cb(err, true);
              });
            }
          ],
          function(err, results) {
            console.log('DONE!');
          });
        }
    ))
});
