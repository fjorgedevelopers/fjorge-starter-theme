// run gulp to compile styles to /css/style.css

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');

// source files
var input_sass_stylesheet = './src/sass/style.scss';
var input_sass_components = './src/sass/**/*.scss';
var input_js = './src/js/**/*.js';

// distribution directories
var destination_sass = './dist/css/';
var destination_js = './dist/js/';

// tasks
gulp.task('sass', function() {
    return gulp
        .src(input_sass_stylesheet)
        .pipe(sass({
            sourceComments: 'map',
            sourceMap: 'sass',
            outputStyle: 'nested'
        })
        .on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(destination_sass));
});

gulp.task('production', function() {
    return gulp
        .src(input_sass_stylesheet)
        .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(destination_sass));
});

gulp.task('scripts', function() {
return gulp.src(input_js)
    .pipe(concat('compiled.js'))
    .pipe(gulp.dest(destination_js));
});

gulp.task('watch-sass-components', function() {
    return gulp
        .watch(input_sass_components, ['sass'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('watch-sass-stylesheet', function() {
    return gulp
        .watch(input_sass_stylesheet, ['sass'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('watch-js', function() {
    return gulp
        .watch(input_js, ['scripts'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('default', ['sass', 'scripts', 'watch-sass-components', 'watch-sass-stylesheet', 'watch-js']);
