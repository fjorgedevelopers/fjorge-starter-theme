// run gulp to compile styles to /css/style.css

/****************************************
        DEPENDENCIES
*****************************************/
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');


/****************************************
        SOURCE PATHS
*****************************************/
// source files
var input_sass_stylesheet = './src/sass/style.scss';
var input_sass_components = './src/sass/**/*.scss';
var input_vendor_css = './src/vendor/css/**/*.css';

var input_custom_js =   [
                            './src/js/main.js',
                        ];
var input_vendor_js =  [
                            './src/vendor/js/**/*.js',
                        ];                        


/****************************************
        DISTRIBUTION DIRECTORIES
*****************************************/
var destination_sass = './dist/css/';
var destination_js = './dist/js/';


/****************************************
        TASKS
*****************************************/
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
        .pipe(gulp.dest(destination_sass))

        // minify for production
        .pipe(rename('style.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(destination_sass));
});

gulp.task('scripts', function() {
return gulp.src(input_custom_js)
    .pipe(concat('custom.js'))
    .pipe(gulp.dest(destination_js))

    // minify for production
    .pipe(rename('custom.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(destination_js));
});

gulp.task('vendor-scripts', function() {
    return gulp.src(input_vendor_js)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(destination_js));
});

// COMPILE & MINIFY CSS LIBRARIES
gulp.task('vendor-css', function() {
    return gulp.src(input_vendor_css)
        .pipe(concat('vendor.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(destination_sass));
});


/****************************************
        WATCH TASK
*****************************************/
gulp.task('watch', function () {
    gulp.watch(input_custom_js, ['scripts'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
    gulp.watch(input_vendor_js, ['vendor-scripts'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
    gulp.watch(input_sass_components, ['sass'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
    gulp.watch(input_sass_stylesheet, ['sass'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('default', ['sass', 'scripts', 'vendor-scripts', 'vendor-css', 'watch']);
