Front End Gulp Boilerplate
==========================

Front-end boilerplate for Gulp with everything you need to get started.

* First download or clone this repo :)
* Then run `npm install` to install dev dependencies.
* Make sure you install [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) plugin for Google Chrome and enable it (click it so the middle dot is black)

During development mode, run the default task so you'll have watchers and live reload. Simply do the following:
* Run `gulp` to start it up
* Open page from http://localhost:3000 in Chrome
* Try to modify html, scss and javascript files and see how the page gets updated with LiveReload

When you're ready to deploy, simply do the following:
* Run `gulp deploy`
* All of the files you need will be in /dist with your images optimized, css compressed and js compressed
