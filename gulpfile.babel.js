/*
 * Harvest : Front-End boilerplate
 * Author: Ryan Benson
 */

// Core libraries
import gulp from 'gulp';

// Tasks
import configure from './harvest-core/tasks/configure';

/*
 * Task: configure
 * Allows you to configure the entire boilerplate and workflow
 */
gulp.task('configure', configure());
