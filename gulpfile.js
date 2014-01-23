var coffee, concat, connect, gulp, gutil, http, lr, open, path, refresh, sass, server, uglify;

gulp = require('gulp');

gutil = require('gulp-util');

coffee = require('gulp-coffee');

concat = require('gulp-concat');

uglify = require('gulp-uglify');

sass = require('gulp-sass');

refresh = require('gulp-livereload');

open = require('gulp-open');

connect = require('connect');

http = require('http');

path = require('path');

lr = require('tiny-lr');

server = lr();

gulp.task('webserver', function() {
  var app, base, directory, hostname, port;
  port = 3000;
  hostname = null;
  base = path.resolve('app');
  directory = path.resolve('app');
  app = connect().use(connect["static"](base)).use(connect.directory(directory));
  return http.createServer(app).listen(port, hostname);
});

gulp.task('livereload', function() {
  return server.listen(35729, function(err) {
    if (err != null) {
      return console.log(err);
    }
  });
});

gulp.task('scripts', function() {
  return gulp.src('app/scripts/coffee/**/*.coffee').pipe(concat('scripts.coffee')).pipe(coffee()).pipe(uglify()).pipe(gulp.dest('app/scripts/js')).pipe(refresh(server));
});

gulp.task('styles', function() {
  return gulp.src('app/styles/scss/init.scss').pipe(sass({
    includePaths: ['app/styles/scss/includes']
  })).pipe(concat('styles.css')).pipe(gulp.dest('app/styles/css')).pipe(refresh(server));
});

gulp.task('html', function() {
  return gulp.src('*.html').pipe(refresh(server));
});

gulp.task('default', function() {
  gulp.run('webserver', 'livereload', 'scripts', 'styles');
  gulp.watch('app/scripts/coffee/**', function() {
    return gulp.run('scripts');
  });
  gulp.watch('app/styles/scss/**', function() {
    return gulp.run('styles');
  });
  return gulp.watch('app/*.html', function() {
    return gulp.run('html');
  });
});