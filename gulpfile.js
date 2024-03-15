const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const htmlmin = require("gulp-htmlmin");
const replace = require("gulp-replace");
const postcss = require("gulp-postcss");
const pxtorem = require("postcss-pxtorem");

//compila o sass / minifica css e troca px por rem
function compilaSass() {
  return gulp
    .src("assets/css/scss/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(
      autoprefixer({
        cascade: false,
        overrideBrowserslist: ["last 2 versions", "not dead"],
      })
    )
    .pipe(postcss([pxtorem()]))
    .pipe(gulp.dest("assets/css"));
}
//otimiza imagens e converte para webp
function otimizaImagens() {
  return gulp
    .src("img_nao_otimizadas/*.{png,jpg,jpeg}")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 90, progressive: true }),
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(webp())
    .pipe(gulp.dest("assets/img"));
}
//javascript para navegadores modernos
function gulpJSModerno() {
  return gulp
    .src("assets/js/main/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("assets/js"));
}
//javascript para navegadores antigos
function gulpJSLegado() {
  return gulp
    .src("assets/js/main/*.js")
    .pipe(concat("main-legado.js"))
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("assets/js"));
}
//adcionar plugins externos
function pluginJS() {
  return gulp
    .src(["js/plugins/*.js"])
    .pipe(concat("plugins.js"))
    .pipe(uglify())
    .pipe(gulp.dest("assets/js/"));
}
//minificar o html no final
function minificaHTML() {
  return gulp
    .src("*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(
      replace(/[\s\S]*/, function (match) {
        return match.replace(/<!DOCTYPE html>/, "");
      })
    )
    .pipe(gulp.dest("./"));
}

function watch() {
  gulp.watch("assets/css/scss/**/*.scss", compilaSass);
  gulp.watch("assets/js/main/*.js", gulpJSModerno);
  gulp.watch("assets/js/main/*.js", gulpJSLegado);
  gulp.watch("assets/js/plugins/*.js", pluginJS);
  gulp.watch("img_nao_otimizadas/*.{png,jpg,jpeg}", otimizaImagens);
}
exports.minificarHTML = minificaHTML;
exports.sass = compilaSass;
exports.mainjsModerno = gulpJSModerno;
exports.mainjsLegado = gulpJSLegado;
exports.pluginjs = pluginJS;
exports.watch = watch;
exports.imagens = otimizaImagens;

exports.default = gulp.parallel(
  watch,
  otimizaImagens,
  compilaSass,
  gulpJSModerno,
  gulpJSLegado,
  pluginJS
);
