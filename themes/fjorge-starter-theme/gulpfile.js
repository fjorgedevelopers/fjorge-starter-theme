'Use strict'

var gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    jshint          = require('gulp-jshint'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    postcss         = require('gulp-postcss'),
    concat          = require('gulp-concat'),
    autoprefixer    = require('autoprefixer'),
    sassLint        = require('gulp-sass-lint'),
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglify'),
    notify          = require('gulp-notify'),
    del             = require('del'),
    // Static Server + watching scss/html files
    browserSync = require('browser-sync').create();
 

// Please configure the following Variables


// What is the name of your dev site ? 
var url = 'gulp-starter.dev';

// Where do your JS / CSS files live ? 
var files = {
    SCSS: './sass/stylesheets/**/*.scss',
    JS: './js'
}

var bases = {
    src: './',
    dist: './'
}


// **************************************** 
// ||           BrowserSync
// ****************************************

gulp.task('browser-sync', function() {
  var files = [
    '**/*.php',
    '**/*.{png,jpg,gif}',
  ];
  browserSync.init(files, {
    proxy: url,
  });
});



// **************************************** 
// ||           Javascript 
// ****************************************


// Delete the JS distribution folder for a fresh build
gulp.task('clean-js',function() {
    return del(['./dist/js'])    
})


// Run JSHint on the input code
gulp.task('jshint',['clean-js'], function() {
    return gulp.src('./js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
})

// Clean out the dist folder and minify JS files
gulp.task('js', ['clean-js'], function() {

  var source = '';                         

  return gulp.src([source + 'js/**/*.js'])                          // Get all js files
    .pipe(uglify())                                                 // Minify each file
    .pipe(rename(function(path){ path.extname = ".min.js"}))        // Rename them as such
    .pipe(gulp.dest(source + 'dist/js'))                            // Plop them in dist
    .pipe(notify({ message: 'JS task complete', onLast: true }));   // Notify of Completion

});


// **************************************** 
// ||           Styles
// ****************************************


gulp.task('lint-css' , function(){
    return gulp.src(files.SCSS)
    .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())

})

gulp.task('build-css', ['lint-css'], function() {

    return gulp.src(files.SCSS)

    // Compilation Phase
    .pipe(sourcemaps.init())
        .pipe(sass()                     //Run SASS 
            .on('error', sass.logError)) // and log the errors if there are any
    
    // Concat all of the files into one file (style.css)
    .pipe(concat('style.css')) 

    //Start the PostCss pipe! PostCSS Plugins need to be 'npm install'ed
    //declared at the top and then put in the array.
    .pipe(postcss([autoprefixer()]))

        //Source Maps for SASS files (so browser can interpret SASS files)
        .pipe(sourcemaps.write('./sass/maps'))
        // Write out 
        .pipe(gulp.dest('./'))
        .pipe(notify({ message: 'Style task complete', onLast: true }))   // Notify of Completion
        
        // Refresh Browser
        .pipe(browserSync.stream());

})

// **************************************** 
// ||           Watching 
// ****************************************

//Serve the files when buid-css and jshint tasks are complete
gulp.task('serve', ['build-css', 'jshint'], function() {
    gulp.watch('./js/**/*.js', ['clean-js', 'jshint', 'js', browserSync.reload])
    gulp.watch("./sass/stylesheets/**/*.scss", ['build-css', browserSync.reload])
})

gulp.task('default', ['browser-sync','serve'])


/******************************************************************************
| >   WATCH TASKS
******************************************************************************/

// Watch Task
// gulp.task('default', ['build-css'], function() {
    // gulp.watch(bases.src + 'sass/stylesheets/*.scss', ['build-css' , browserSync.reload]);
    // gulp.watch('./dist/js/**.*.js', ['jshint', 'js', browserSync.reload]);
    // gulp.watch(bases.src + 'js/app/**/*.js', ['jsHint']);
    // gulp.watch(bases.src + 'img/**/*.{png,jpg,gif}', ['images']);
// });
// Process scripts and concatenate them into one output file
// gulp.task('scripts', ['clean'], function() {
//     gulp.src(paths.scripts, {cwd: bases.app})
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'))
//         .pipe(uglify())
//         .pipe(concat('app.min.js'))
//         .pipe(gulp.dest(bases.dist + 'scripts/'));
// });

