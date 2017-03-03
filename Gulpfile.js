// run gulp to compile styles to /css/style.css

var gulp = require('gulp');
var sass = require('gulp-sass');
var input = './sass/**/*.scss';

gulp.task('sass', function() {
    return gulp
        .src('sass/style.scss')
        .pipe(sass({
            sourceComments: 'map',
            sourceMap: 'sass',
            outputStyle: 'nested'
        })
            .on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});

gulp.task('production', function() {
    return gulp
        .src('sass/style.scss')
        .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});

gulp.task('watch', function() {
    return gulp
        .watch(input, ['sass'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('default', ['sass', 'watch' ]);