// --------------------------------------------
// Dependencies
// --------------------------------------------
var gulp =          require('gulp'),
    sass =          require('gulp-ruby-sass'),
    plumber =       require('gulp-plumber'),
    uglify =        require('gulp-uglify'),
    concat =        require('gulp-concat'),
    autoprefixer =  require('gulp-autoprefixer'),
    minifycss =     require('gulp-minify-css'),
    rename =        require('gulp-rename'),
    notify =        require("gulp-notify"),
    imagemin =      require('gulp-imagemin'),
    pngcrush =      require('imagemin-pngcrush'),
    livereload =    require('gulp-livereload');



// --------------------------------------------
// Default Tasks (Can be run standalone)
// --------------------------------------------

//Compiles all Scss files
gulp.task('styles', function(){
    return sass('src/styles/main.scss')
        .pipe(plumber())

        .pipe(concat('main.css'))

        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('build/styles'))
        .pipe(minifycss())
        .pipe(gulp.dest('build/styles'))
        .pipe(livereload());
});


// Compress images task
gulp.task('images', function () {
    gulp.src('src/images/*')
        .pipe(plumber())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('build/images'))
        .pipe(notify("Completed Gulping your Images!"))
        .pipe(livereload());
});


//Concatnate and Compressn Vendor .js Task
gulp.task('vendors', function() {
    gulp.src(
        [
            'src/scripts/vendors/jquery.min.js',
            'src/scripts/vendors/*.js'
        ])
        .pipe(plumber())
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/scripts'))
        .pipe(livereload());
});


// Uglify js files
gulp.task('scripts', function(){
    gulp.src('src/scripts/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('build/scripts'))
        .pipe(livereload());
});



// Duplicate to the build and reload browser
gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('build/'))
        .pipe(livereload());
});





// --------------------------------------------
// Stand Alone Tasks
// --------------------------------------------

var livereload = require('gulp-livereload');

// Watches all files and reacts
gulp.task('watch', function(){
    var server = livereload();
    gulp.watch('src/scripts/*.js', ['scripts']);
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/*.html', ['html']);
});


// Default Task (Run 'gulp')
gulp.task('default',['html', 'styles', 'vendors', 'scripts', 'watch']);
