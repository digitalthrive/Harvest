import gulp from 'gulp';
import prompt from 'gulp-prompt';
import async from 'async';
import prompts from '../config/prompts';

import updatePackage from './configure/updatePackage';
import writeCoreConfig from './configure/writeCoreConfig';

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
