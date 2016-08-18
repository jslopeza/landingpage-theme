var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var rimraf = require('gulp-rimraf');
var runSequence = require('run-sequence');
var cssmin = require('gulp-cssmin');
var jsmin = require('gulp-jsmin');
var fontmin = require('gulp-fontmin');

gulp.task('sass', function() {
	return gulp.src('./app/sass/**/*.scss')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
		.pipe(gulp.dest('./app/css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function() {
  browserSync.init({
    server: {
      baseDir: './app'
    }
  });

  gulp.watch('app/sass/**/*.scss', ['sass']);
  gulp.watch('app/**/*.js').on('change', browserSync.reload);
  gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('dev', ['sass', 'watch', 'webserver']);

gulp.task('clean', function(cb) {
  return gulp.src('./dist', {read: false})
    .pipe(rimraf({force: true}, cb));
});

gulp.task('copy-html', function() {
  return gulp.src('app/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('copy-image', function() {
  return gulp.src('app/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});

gulp.task('copy-js', function() {
  return gulp.src('app/js/*.js')
    .pipe(jsmin())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-font', function() {
  return gulp.src('app/fonts/**.*')
    .pipe(fontmin())
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy-css', function() {
  return gulp.src('app/css/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('build', function(cb) {
  runSequence('clean',
              ['copy-html', 'copy-image', 'copy-css', 'copy-js', 'copy-font'],
              cb);
});
