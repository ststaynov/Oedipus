/**
 * Created by stoyans on 13/04/16.
 */


var gulp = require('gulp');
var sass = require('gulp-sass');
var util = require('gulp-util');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

gulp.task('styles', function() {
    return gulp.src('animation/static/animation/scss/*.scss')
        .pipe(plumber({
            errorHandler: notify.onError('SASS is mad: <%= error.message %>')
        }))
        .pipe(sass())
        .pipe(gulp.dest('animation/static/animation/css/'))
        .on('error', util.log);
});

//Watch task
gulp.task('default',function() {
    gulp.run('styles');
    gulp.watch(['animation/static/animation/scss/*.scss','animation/static/animation/scss/**/*.scss'],['styles']);
});