// Ścieżka do aktualnie wykonywanego zadania
//zmiana ścieżki
const entryPath = "src/styles";

const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

function compileSass(done) {
    //zmiana src  +
    gulp
        .src(entryPath + "/style.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("./public/css"));
    //zmiana pipe gulp dest
    done();
}

    // zmiana severa
function watcher(done) {
    browserSync.init({
        server: "./public/",
    });

    //tu zmieniamy by sie odswiezalo na bierzaco
    gulp.watch(entryPath + "/**/*.scss", gulp.series(compileSass, reload));
    gulp.watch("./public/*.html", gulp.series(reload));

    done();
}

function reload(done) {
    browserSync.reload();
    done();
}

exports.sass = gulp.parallel(compileSass);

exports.default = gulp.parallel(compileSass, watcher);