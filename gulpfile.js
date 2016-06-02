var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

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
