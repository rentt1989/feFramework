var gulp = require('gulp');
    browserSync = require('browser-sync').create();
    less = require('gulp-less');
    concat = require('gulp-concat');
    watch = require('gulp-watch');
    uglify = require('gulp-uglify');
    browserify = require('browserify');
    sourcemaps = require('gulp-sourcemaps');
    sourcestream = require('vinyl-source-stream');
    buffer = require('vinyl-buffer');
    rev = require('gulp-rev');
    minifyCss = require('gulp-minify-css');
    minifyHtml = require('gulp-htmlmin');
    // templateCache = require('gulp-angular-templatecache');
    gulpSequence = require('gulp-sequence');
    path = require('./config.js');
    

//启动服务
gulp.task('serve',function(){
    browserSync.init({
        server: path.app_dir
    });

});

//压缩less
gulp.task('less',function(){
	return gulp.src(path.styles_dir+'/*.less')
	.pipe(less())
	.pipe(concat('app.css'))
	.pipe(gulp.dest(path.compile_dir));

});
//压缩js
gulp.task('js',function(){
    return gulp.src(path.scripts_dir+'/**/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest(path.compile_dir))
});
//打包依赖js
gulp.task("browserify", function () {
    var b = browserify({
      entries: path.browserify_dir + "/require.js",
      debug: true /*告知browserify在运行同时生成内联sourcemap用于调试*/
    });
     
    return b.bundle()
      .pipe(sourcestream("bundle.js"))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(path.compile_dir));
});
//监控
gulp.task('watch',function(){
    //监控css文件
    gulp.watch([path.styles_dir + '/*.less'],['less']).on('change',browserSync.reload);
    //监控js
    gulp.watch([path.scripts_dir + '/**/*.js', path.broserify_dir+'/*.js'],['js']).on('change',browserSync.reload);
    //监控html文件
    gulp.watch([path.views_dir + '/*.html', path.app_dir+'/*.html']).on('change',browserSync.reload);
});
//


// //模板缓存文件
// gulp.task('template', function () {
//  return gulp.src('./views/*.html')
//  .pipe(templateCache({module: 'app'}))
//  .pipe(gulp.dest('./dest/js'))
// });



