import gulp from 'gulp';
import prompt from 'gulp-prompt';
import async from 'async';
import prompts from './harvest-core/config/prompts';

// tasks
import updatePackage from './harvest-core/tasks/updatePackage';
import writeCoreConfig from './harvest-core/tasks/writeCoreConfig';


gulp.task('configure', (cb) => {
  gulp.src('package.json')
      .pipe(prompt.prompt(
        prompts,
        (config) => {
          async.parallel([
            async.apply(updatePackage, config),
            async.apply(writeCoreConfig, config)
          ],
          function(err, results) {
            console.log('DONE!');
          });
        }
    ))
});
