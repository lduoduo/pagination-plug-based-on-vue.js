var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
//异常处理
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

var livereload = require('gulp-livereload');

gulp.task('css', function() {
    gulp.src('less/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public'))
        .pipe(livereload());
});
gulp.task('js', function() {
    gulp.src('home/js/*.js').pipe(livereload());
})

gulp.task('default', function() {
    livereload.listen();
    gulp.watch('less/*.less', ['css']);
    gulp.watch('home/js/*.js', ['js']);
})