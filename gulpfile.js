//initialize all of our variables
var app, base, concat, directory, gulp, gutil, hostname, path, refresh, sass, uglify, imagemin, cache, minifyCSS, del, connect, autoprefixer;

var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

//load all of our dependencies
//add more here if you want to include more libraries
gulp        = require('gulp');
gutil       = require('gulp-util');
concat      = require('gulp-concat');
uglify      = require('gulp-uglify');
sass        = require('gulp-sass');
imagemin    = require('gulp-imagemin');
cache       = require('gulp-cache');
minifyCSS   = require('gulp-minify-css');
connect     = require('gulp-connect');
del         = require('del');
autoprefixer = require('gulp-autoprefixer');

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});


//compressing images & handle SVG files
gulp.task('images', function(tmp) {
    console.log(tmp);
    gulp.src(['app/images/*.jpg', 'app/images/*.png'])
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }));
});

//compressing images & handle SVG files
gulp.task('images-deploy', function() {
    gulp.src(['app/images/**/*'])
        .pipe(gulp.dest('dist/images'));
});

//compiling our Javascripts
gulp.task('scripts', function() {
    //this is where our dev JS scripts are
    return gulp.src(['app/scripts/src/_includes/**/*.js', 'app/scripts/src/**/*.js')
                //this is the filename of the compressed version of our JS
               .pipe(concat('app.js'))
               //catch errors
               .on('error', gutil.log)
               //compress :D
               .pipe(uglify())
               //where we will store our finalized, compressed script
               .pipe(gulp.dest('app/scripts'))
               //notify LiveReload to refresh
               .pipe(connect.reload());
});

//compiling our Javascripts for deployment
gulp.task('scripts-deploy', function() {
    //this is where our dev JS scripts are
    return gulp.src('app/scripts/src/**/*.js')
                //this is the filename of the compressed version of our JS
               .pipe(concat('app.js'))
               //compress :D
               .pipe(uglify())
               //where we will store our finalized, compressed script
               .pipe(gulp.dest('dist/scripts'));
});

//compiling our SCSS files
gulp.task('styles', function() {
    //the initializer / master SCSS file, which will just be a file that imports everything
    return gulp.src('app/styles/scss/init.scss')
                //include SCSS and list every "include" folder
               .pipe(sass({
                      errLogToConsole: true,
                      includePaths: [
                          'app/styles/scss/'
                      ]
               }))
               .pipe(autoprefixer({
                   browsers: autoPrefixBrowserList,
                   cascade:  true
               }))
               //catch errors
               .on('error', gutil.log)
               //the final filename of our combined css file
               .pipe(concat('styles.css'))
               //where to save our final, compressed css file
               .pipe(gulp.dest('app/styles'))
               //notify LiveReload to refresh
               .pipe(connect.reload());
});

//compiling our SCSS files for deployment
gulp.task('styles-deploy', function() {
    //the initializer / master SCSS file, which will just be a file that imports everything
    return gulp.src('app/styles/scss/init.scss')
                //include SCSS includes folder
               .pipe(sass({
                      includePaths: [
                          'app/styles/scss',
                      ]
               }))
               .pipe(autoprefixer({
                   browsers: autoPrefixBrowserList,
                   cascade:  true
               }))
               //the final filename of our combined css file
               .pipe(concat('styles.css'))
               .pipe(minifyCSS())
               //where to save our final, compressed css file
               .pipe(gulp.dest('dist/styles'));
});

//basically just keeping an eye on all HTML files
gulp.task('html', function() {
    //watch any and all HTML files and refresh when something changes
    return gulp.src('app/*.html')
        .pipe(connect.reload())
       //catch errors
       .on('error', gutil.log);
});

//migrating over all HTML files for deployment
gulp.task('html-deploy', function() {
    //grab everything, which should include htaccess, robots, etc
    gulp.src('app/*')
        .pipe(gulp.dest('dist'));

    //grab any hidden files too
    gulp.src('app/.*')
        .pipe(gulp.dest('dist'));

    gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    //grab all of the styles
    gulp.src(['app/styles/*.css', '!app/styles/styles.css'])
        .pipe(gulp.dest('dist/styles'));
});

//cleans our dist directory in case things got deleted
gulp.task('clean', function() {
    del('dist');
});

//this is our master task when you run `gulp` in CLI / Terminal
//this is the main watcher to use when in active development
//  this will:
//  startup the web server,
//  start up livereload
//  compress all scripts and SCSS files
gulp.task('default', ['connect', 'scripts', 'styles'], function() {
    //a list of watchers, so it will watch all of the following files waiting for changes
    gulp.watch('app/scripts/src/**', ['scripts']);
    gulp.watch('app/styles/scss/**', ['styles']);
    gulp.watch('app/images/**', ['images']);
    gulp.watch('app/*.html', ['html']);
});

//this is our deployment task, it will set everything for deployment-ready files
gulp.task('deploy', ['clean'], function () {
  gulp.start('scripts-deploy', 'styles-deploy', 'html-deploy', 'images-deploy');
});
