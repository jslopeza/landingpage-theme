var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-server-livereload');

gulp.task('sass', function() {
	return gulp.src('./app/sass/**/*.scss')
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(gulp.dest('./app/css'));
});

gulp.task('watch', function() {
  gulp.watch('./app/sass/**/*.scss', ['sass']);
});

gulp.task('webserver', function() {
	gulp.src('app')
		.pipe(server({
			livereload: true,
			defaultFile: 'index.html',
			open: true,
		}))
});

gulp.task('dev', ['sass', 'watch', 'webserver']);
