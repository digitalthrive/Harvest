import gulp from 'gulp';
import fs from 'fs';
import prompt from 'gulp-prompt';
import childProcess from 'child_process';

const exec = childProcess.exec;

gulp.task('configure', (cb) => {
  console.log("Starts");
  cb(null);
});
