/*
 * Harvest : Front-End boilerplate
 * Author: Ryan Benson
 */

// Core libraries
import gulp from 'gulp';
import prompt from 'gulp-prompt';
import async from 'async';
import prompts from './harvest-core/config/prompts';

// Tasks
import updatePackage from './harvest-core/tasks/updatePackage';
import writeCoreConfig from './harvest-core/tasks/writeCoreConfig';

/*
 * Task: configure
 * Allows you to configure the entire boilerplate and workflow
 */
gulp.task('configure', (cb) => {
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
    ))
});
