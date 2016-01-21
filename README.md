Front End Gulp Boilerplate
==========================

Front-end boilerplate for Gulp with everything you need to get started.

* First download or clone this repo :)
* Then run `npm install` to install dev dependencies. Use sudo if needed.

You'll need to have Gulp installed. If you already have Gulp installed, you can skip the following line. It is as simple as running:
* `npm install -g gulp`

During development mode, run the default task so you'll have watchers and browser sync. Simply do the following:
* Run `gulp` to start it up
* Try to modify html, scss and javascript files and see how the page gets updated with BrowserSync

When you're ready to deploy, simply do the following:
* Run `gulp deploy`
* All of the files you need will be in /dist with your images optimized, css compressed and js compressed

Version
==========================
1.3.2

News
==========================
Version 2.0 is currently under development! It'll be a big release and will include some pretty cool and easy features. It'll make using and customizing Harvest a breeze. A peak on what's to come:
* Generator-based so it's simple to configure how you want
* Modular tasks makes it easy to tweak it without digging through everything
* More options! Including LESS, SCSS, Stylus, ES2015, Browserify, and many more options that will be supported out of the box
* More suprises :)

The current phases of work is being maintained on thos KANBAN: https://tree.taiga.io/project/ryanbenson-harvest-20/kanban so if you want to see how things are proressing you can see what's going on. If you have any ideas or thoughts let me know, as now is the time.

Thanks for everyone's support and appreciation for this project!

More Information
==========================
Check out the website http://www.ryanbensonmedia.com/harvest for more information.

Revision History
==========================
June 24, 2015
* Fixed missing images folder in app when I removed placeholder

May 8, 2015
* Fixed install instructions on README
* Minor revisions to README

April 15, 2015
* Merged PR from @telephant00
* Adds SCSS Source Maps

April 13, 2015
* Merged PR from @telephant00
* Fixed image dev task, it wasn't pushing images to a dest
* Removed README from images folder, causing segfault errors

April 9, 2015
* Removed LiveReload in favor of BrowserSync

March 6, 2015
* Removed del lib, it was causing issues with deployments
* Added sequence and shell libraries
* Moved deployment task to use sequence
* Using CLI to remove and setup dist folders on deployment, resolved bugs

February 11, 2015
* Updated npm dependency versions
* Updated to latest HTML5 Boilerplate (slightly modified)
* Updated CSS and JS vendors
* Removed a couple unused modules
* Started using version numbers and git flow

January 16, 2014
* Merge pull request from @quakenul fixing concat order issue with JS

November 20, 2014
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
