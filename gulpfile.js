var gulp					= require('gulp');
var coffee 				= require('gulp-coffee');
var concat 				= require('gulp-concat');
var uglify 				= require('gulp-uglify');
var gutil 				= require('gulp-util');
var cssmin 				= require('gulp-cssmin');
var autoprefixer 	= require('gulp-autoprefixer');
var browserSync 	= require('browser-sync').create();
var sass 					= require('gulp-sass');
var wiredep 			= require('wiredep').stream;
var useref 				= require('gulp-useref');
var rename 				= require('gulp-rename');
var gulpif 				= require('gulp-if');
var base64 				= require('gulp-base64');
var imageop 			= require('gulp-image-optimization');
var pngquant 			= require('imagemin-pngquant');
var changed 			= require('gulp-changed');

var paths = {
    scss: './src/sass/**/*.scss',
    coffee: './src/coffee/**/*.coffee',
    html: './src/html/**/*.html',
    images: './src/images/**/*'
};


gulp.task('scripts', function() {
	return gulp.src(paths.coffee)
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(concat('main.js'))
    // .pipe(uglify())
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./app/js'))
    .pipe(browserSync.stream());
});

gulp.task('styles', function() {
  return gulp.src(paths.scss)
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
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

gulp.task('html', function() {
	return gulp.src(paths.html)
		.pipe(wiredep({
	      directory: './bower_components'
	    }))
		.pipe(useref())
	 //  .pipe(gulpif('*.js', uglify()))
	 //  .pipe(gulpif('*.css', cssmin()))
		.pipe(gulp.dest('./app'))
		.pipe(browserSync.stream());
});

// Optimization of images
gulp.task('images', function () {
  return gulp.src(paths.images)
      .pipe(changed('./app/img'))
      .pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
	    }))
      .pipe(gulp.dest('./app/img'));
});

gulp.task('copy-images', function () {
  return gulp.src(paths.images)
      .pipe(changed('./app/img'))
      .pipe(gulp.dest('./app/img'));
});

// Base64 code images into stylesheet file
gulp.task('base64', ['images'], function () {
  return gulp.src('./app/css/*.css')
      .pipe(base64({
          baseDir: './app/img',
          extensions: ['svg', 'png', /\.jpg#datauri$/i],
          exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
          maxImageSize: 8*1024, // bytes 
          debug: true
      }))
      .pipe(gulp.dest('./app/css'));
});


/**
 * Watch task for coffee, scss files
 *
 */
gulp.task('watch', function() {
	gulp.watch(paths.coffee, ['scripts'], browserSync.reload);
	gulp.watch(paths.scss, ['styles'], browserSync.reload);
	gulp.watch(paths.html, ['html'], browserSync.reload);
	gulp.watch(paths.images, ['copy-images'], browserSync.reload);
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