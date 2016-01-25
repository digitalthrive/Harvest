/*
 * Harvest : Front-End boilerplate
 * Author: Ryan Benson
 */

// Core libraries
import gulp from 'gulp';
import prompt from 'gulp-prompt';
import async from 'async';
import prompts from '../config/prompts';

// Sub tasks
import updatePackage from './configure/updatePackage';
import writeCoreConfig from './configure/writeCoreConfig';

/*
 * default
 * Public method that updates the NPM package and runs CLI tasks
 * @params: nil
 */
export default function() {
  gulp.src('package.json')
      .pipe(prompt.prompt(
        prompts,
        (config) => {
          async.parallel([
            async.apply(updatePackage, config),
            async.apply(writeCoreConfig, config)
          ],
          (err, results) => {
            console.log('DONE!');
          });
        }
    ));
};
