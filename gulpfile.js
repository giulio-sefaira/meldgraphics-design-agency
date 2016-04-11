'use strict';
var gulp				  = require('gulp'),
    ts            = require('gulp-typescript'),
    concat 			  = require('gulp-concat'),
    uglify 				= require('gulp-uglify'),
    gutil 				= require('gulp-util'),
    cssmin 				= require('gulp-cssmin'),
    autoprefixer 	= require('gulp-autoprefixer'),
    browserSync 	= require('browser-sync').create(),
    sass 				  = require('gulp-sass'),
    wiredep 			= require('wiredep').stream,
    useref 				= require('gulp-useref'),
    rename 				= require('gulp-rename'),
    gulpif 				= require('gulp-if'),
    base64 				= require('gulp-base64'),
    imageop 			= require('gulp-image-optimization'),
    pngquant 			= require('imagemin-pngquant'),
    changed 			= require('gulp-changed'),
    Config        = require('./gulpfile.config'),
    tsProject     = ts.createProject('tsconfig.json'),
    order         = require("gulp-order");

var config = new Config();

gulp.task('scripts', function() {
	return gulp.src([config.typescript,
                   config.libraryTypeScriptDefinitions])
    .pipe(order([
      'app/app.ts',
      '**/*.ts'
    ]))
    .pipe(ts(tsProject))
    .dts
    .pipe(concat('main.js'))
    // .pipe(uglify())
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.tsOutputPath))
    .pipe(browserSync.stream());
});

gulp.task('styles', function() {
  return gulp.src(config.scss)
  	.pipe(sass({
  		// outputStyle: 'compressed'
  		 includePaths: [
        './bower_components/compass-breakpoint/stylesheets'
  		 ]
  	}))
    /*.pipe(autoprefixer({
      browsers: ['last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
      cascade: false
    }))*/
    // pipe(cssmin())
		// .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.scssOutputPath))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
	return gulp.src(config.html)
		.pipe(wiredep({
	      directory: './bower_components'
	    }))
		.pipe(useref())
	 //  .pipe(gulpif('*.js', uglify()))
	 //  .pipe(gulpif('*.css', cssmin()))
		.pipe(gulp.dest(config.sourceApp))
		.pipe(browserSync.stream());
});

// Optimization of images
gulp.task('images', function () {
  return gulp.src(config.images)
      .pipe(changed(config.imageOutputPath))
      .pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
	    }))
      .pipe(gulp.dest(config.imageOutputPath));
});

gulp.task('copy-images', function () {
  return gulp.src(config.images)
      .pipe(changed(config.imageOutputPath))
      .pipe(gulp.dest(config.imageOutputPath));
});

// Base64 code images into stylesheet file
gulp.task('base64', ['images'], function () {
  return gulp.src(config.sourceApp + 'css/*.css')
      .pipe(base64({
          baseDir: config.sourceApp + 'img',
          extensions: ['svg', 'png', /\.jpg#datauri$/i],
          exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
          maxImageSize: 8*1024, // bytes 
          debug: true
      }))
      .pipe(gulp.dest(config.scssOutputPath));
});


/**
 * Watch task for coffee, scss files
 *
 */
gulp.task('watch', function() {
	gulp.watch(config.typescript, ['scripts'], browserSync.reload);
	gulp.watch(config.scss, ['styles'], browserSync.reload);
	gulp.watch(config.html, ['html'], browserSync.reload);
	gulp.watch(config.images, ['copy-images'], browserSync.reload);
});

/**
 * Default task
 *
 */
gulp.task('default', ['scripts', 'styles', 'html', 'base64', 'watch'], function() {

  browserSync.init({
    server: './app'
  });

});