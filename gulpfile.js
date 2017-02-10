var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');

gulp.task('build', function () {
    return browserify({entries: './app_js/index.jsx', extensions: ['.jsx'], debug: false})
        .transform('babelify', {presets: ['es2017', 'es2016', 'es2015', 'stage-0', 'stage-1', 'stage-2', 'react']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'));
});

gulp.task('buildCSS', function() {
	gulp.src('./app_js/**/*.css')	
		.pipe(concat('app.css'))
		.pipe(gulp.dest('public/css/'));
})

gulp.task('watch', ['build'], function () {
    gulp.watch('./app_js/**/*.jsx', ['build']);
});

gulp.task('watchCSS', ['buildCSS'], function () {
	gulp.watch('./app_js/**/*.css', ['buildCSS']);
})

gulp.task('default', ['watch', 'watchCSS']);