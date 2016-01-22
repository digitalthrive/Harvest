import gulp from 'gulp';
import fs from 'fs';
import prompt from 'gulp-prompt';
import childProcess from 'child_process';

const exec = childProcess.exec;

gulp.task('configure', (cb) => {
  gulp.src('package.json')
      .pipe(prompt.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of the project?',
          default: 'Harvest'
        }
      ],
      (config) => {
        console.log(config);
        cb(null);
      }
    ))
});
