//initialize all of our variables
var app, base, coffee, concat, connect, directory, gulp, gutil, hostname, http, lr, open, path, refresh, sass, server, uglify, imagemin, cache, minifyCSS, clean;

//load all of our dependencies
//add more here if you want to include more libraries
gulp        = require('gulp');
gutil       = require('gulp-util');
coffee      = require('gulp-coffee');
concat      = require('gulp-concat');
uglify      = require('gulp-uglify');
sass        = require('gulp-sass');
refresh     = require('gulp-livereload');
open        = require('gulp-open');
connect     = require('connect');
http        = require('http');
path        = require('path');
lr          = require('tiny-lr');
imagemin    = require('gulp-imagemin');
cache       = require('gulp-cache');
minifyCSS   = require('gulp-minify-css');
clean       = require('gulp-clean');

//start our server
server = lr();

//this starts the webserver so we can run localhost:3000 and sync with the LiveReload plugin
gulp.task('webserver', function() {
    //the port to run our local webserver on
    var port = 3000;
    hostname = null;
    //the directory to our working environment
    base = path.resolve('app');
    directory = path.resolve('app');
    //start up the server
    app = connect().use(connect["static"](base)).use(connect.directory(directory));
    http.createServer(app).listen(port, hostname);
});

//connecting to the live reload plugin, basically notifies the browser to refresh when we want it to
gulp.task('livereload', function() {
    //this is the default port, you shouldn't need to edit it
    server.listen(35729, function(err) {
        if (err != null) {
            return console.log(err);
        }
    });
});

//compressing images
gulp.task('images-deploy', function() {
    gulp.src(['app/images/*.jpg', 'app/images/*.png'])
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images'));
});

//compiling our Javascripts
gulp.task('scripts', function() {
    //this is where our dev JS scripts are
    gulp.src('app/scripts/src/**/*.js')
                //this is the filename of the compressed version of our JS
               .pipe(concat('app.js'))
               //catch errors
               .on('error', gutil.log)
               //compress :D
               .pipe(uglify())
               //where we will store our finalized, compressed script
               .pipe(gulp.dest('app/scripts'))
               //notify LiveReload to refresh
               .pipe(refresh(server));
});

//compiling our Javascripts for deployment
gulp.task('scripts-deploy', function() {
    //this is where our dev JS scripts are
    gulp.src('app/scripts/src/**/*.js')
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
    gulp.src('app/styles/scss/init.scss')
                //include SCSS and list every "include" folder
               .pipe(sass({
                      includePaths: [
                          'app/styles/scss/'
                      ]
               }))
               //catch errors
               .on('error', gutil.log)
               //the final filename of our combined css file
               .pipe(concat('styles.css'))
               //where to save our final, compressed css file
               .pipe(gulp.dest('app/styles'))
               //notify LiveReload to refresh
               .pipe(refresh(server));
});

//compiling our SCSS files for deployment
gulp.task('styles-deploy', function() {
    //the initializer / master SCSS file, which will just be a file that imports everything
    gulp.src('app/styles/scss/init.scss')
                //include SCSS includes folder
               .pipe(sass({
                      includePaths: [
                          'app/styles/scss',
                      ]
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
    gulp.src('app/*.html')
        .pipe(refresh(server))
       //catch errors
       .on('error', gutil.log);
});

//migrating over all HTML files for deployment
gulp.task('html-deploy', function() {
    gulp.src('app/*.html')
        .pipe(gulp.dest('dist'));
    gulp.src('app/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});

//cleans our dist directory in case things got deleted
gulp.task('clean', function() {
  return gulp.src(['dist/*'], {read: false})
    .pipe(clean());
});

//this is our master task when you run `gulp` in CLI / Terminal
//this is the main watcher to use when in active development
gulp.task('default', function() {
    //a list of commands to run when it starts up, so it will:
    //  startup the web server,
    //  start up livereload
    //  compress all scripts and SCSS files
    gulp.start('webserver', 'livereload', 'scripts', 'styles');
    //a list of watchers, so it will watch all of the following files waiting for changes
    gulp.watch('app/scripts/src/**', function() {
        return gulp.start('scripts');
    });
    gulp.watch('app/styles/scss/**', function() {
        return gulp.start('styles');
    });
    gulp.watch('app/*.html', function() {
        return gulp.start('html');
    });
});

//this is our deployment task, it will set everything for deployment-ready files
gulp.task('deploy', function() {
    //there are no watchers, just compilers
    gulp.start('clean', 'scripts-deploy', 'styles-deploy', 'html-deploy', 'images-deploy');
});
