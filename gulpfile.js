const gulp = require('gulp'),
    rename = require('gulp-rename'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

function cssStyle(done) {
    gulp.src('scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(scss({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }).on('error', console.error.bind(console)))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream());

    done();
}

function sync(done) {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 3000
    });
    done();
}
function browserReload(done) {
    browserSync.reload();
    done();
}
function watchFiles() {
    gulp.watch('./scss/**/*', cssStyle);
    gulp.watch('**/*.html', browserReload);
    gulp.watch('**/*.js', browserReload);
}



gulp.task('default', gulp.parallel(watchFiles, sync));