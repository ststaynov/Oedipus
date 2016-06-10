/**
 * Created by stoyans on 13/04/16.
 */


var gulp = require('gulp');
var sass = require('gulp-sass');
var util = require('gulp-util');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');

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


gulp.task('compress-js', function() {
  return gulp.src('animation/static/animation/js/main.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('animation/static/animation/js/'));
});

gulp.task('compress-css', function() {
	gulp.src('animation/static/animation/css/base.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('animation/static/animation/css/'));
});

gulp.task('compress', function() {
    gulp.run('compress-css');
    gulp.run('compress-js');
});