Front End Gulp Boilerplate
==========================

Front-end boilerplate for Gulp with everything you need to get started.

* First download or clone this repo :)
* Then run `sudo npm install` to install dev dependencies. You have to use sudo because some of the dependencies install executable binaries.
* Make sure you install [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) plugin for Google Chrome and enable it (click it so the middle dot is black)

During development mode, run the default task so you'll have watchers and live reload. Simply do the following:
* Run `gulp` to start it up
* Open page from http://localhost:8080 in Chrome
* Try to modify html, scss and javascript files and see how the page gets updated with LiveReload

When you're ready to deploy, simply do the following:
* Run `gulp deploy`
* All of the files you need will be in /dist with your images optimized, css compressed and js compressed

More Information
==========================
Check out the website http://www.ryanbensonmedia.com/harvest for more information. And more detailed documentation is coming soon!

Revision History
==========================
Nov 20, 2014
* Added auto-prefixer support

October 17, 2014
* Removed recently deprecated `gulp-clean` module
* Using `del` module instead
* Updated gulpfile to use del method to cleanse the dist folder prior to the deployment task

September 25, 2014
* Merged pull request form @hhff
  * Improved gitignore for sass cache
  * Improved font-face mixing
  * Updated images and fonts gulp task for nested files

August 14, 2014:
* Finally figured out how to get all of the dependencies into dev, not production

June 20, 2014:
* Updated dependencies
* Completely changed how webserver and livereload works
* Refactored a lot of the build task, it is much more modular and flexible
* Added some extra boilerplate
* Removed a lot of the footprint styles, including the entire Skeleton framework
* Fixed SASS crashing on syntax/coding error
* Using default port number now (8080) for web server

February 03, 2014:
* Added caching of images so the deploy feature won't compress the same images multiple times
* Added cleaning of the `dist` folder in case things got deleted at some point
* Made the dev & dist scripts and css compressed file in the same place so no edits to the href/src needs to be done anymore
* Added graceful errors during watch, so SCSS or JS errors no longe break the `watch`
* Updated `gulpfile.js` since gulp.run() is deprecated now
* Added fonts to the `deploy`

February 04, 2014:
* Removed coffee dependency
* Removed some fingerprinted CSS
* Fixed some CSS/HTML references
* Cleaned up the builder and watcher and fixed watcher bugs, namely issue compression w/ SVGs
* Merged pull request from @Contra who added some best practices, thanks! :)

February 25, 2014
* I've been using this more in development and production, so this has been fine tuned a bit
* I added fonts and other misc assets that should be moved from `dev` to `dist` upon deployment
* I removed image caching because there was an issue where it would randomly break all of the images. I'll figure this but out later though.
* Updated npm dependencies accordingly
