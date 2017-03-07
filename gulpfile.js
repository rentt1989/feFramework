var gulp = require('gulp');
    browserSync = require('browser-sync').create();
    webserver = require('gulp-webserver');
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
    templateCache = require('gulp-angular-templatecache');
    del = require('del');
    replace = require('gulp-replace');
    revCollector = require('gulp-rev-collector');
    useref = require('gulp-useref');
    gulpif = require('gulp-if');
    gulpSequence = require('gulp-sequence');

//启动服务
gulp.task('default',['browserify','watch'],function(){
    browserSync.init({
        server: './'
    });
    
});
//打包
gulp.task('build',['build:clean','build:js','build:css','build:html'],function(){

})

//压缩less
gulp.task('less',function(){
	gulp.src('./styles/*.less')
	.pipe(less())
	.pipe(concat('app.css'))
	.pipe(gulp.dest('./compile/'));
});
//压缩js
gulp.task('js',function(){
    gulp.src(['./scripts/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./compile/'))
});
//打包依赖js
gulp.task("browserify", function () {
    var b = browserify({
      entries: "./config/require.js",
      debug: true /*告知browserify在运行同时生成内联sourcemap用于调试*/
    });
     
    return b.bundle()
      .pipe(sourcestream("bundle.js"))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("./compile"));
});
//监控
gulp.task('watch',function(){
    //监控css文件
    gulp.watch(['./styles/*.less'],['less']).on('change',browserSync.reload);
    //监控js
    gulp.watch(['./scripts/**/*.js','./config/*.js'],['js']).on('change',browserSync.reload);
    //监控html文件
    gulp.watch(['./views/*.html','./*.html']).on('change',browserSync.reload);
});
//

//打包js和css
gulp.task('build:js',function(){
    return gulp.src('./index.html')
    .pipe(useref())
    .pipe(gulpif('*.css',minifyCss()))
    .pipe(gulpif('*.css',rev()))
    .pipe(gulpif('*.js',uglify()))
    .pipe(gulpif('*.js',rev()))
    .pipe(gulp.dest('./dest/'))
    .pipe(rev.manifest()) 
    .pipe(gulp.dest("./rev"));  
});

//打包html
gulp.task('build:index-html',function(){
    return gulp.src('./views/*.html')
    .pipe(replace('./views','/modules'))
    .pipe(minifyHtml())
    .pipe(gulp.dest('./dest/modules/'));
})
gulp.task('build:module-html',function(){
    return gulp.src(['./dest/index.html'])
    .pipe(replace('./views','./modules'))
    .pipe(minifyHtml())
    .pipe(gulp.dest('./dest'));
})

//清空dest目录
gulp.task('build:clean',function(){
    return del('./dest');
})

//模板缓存文件
gulp.task('template', function () {
 return gulp.src('./views/*.html')
 .pipe(templateCache({module: 'app'}))
 .pipe(gulp.dest('./dest/js'))
});

//在html内打上版本号
gulp.task('rev:html',function(){
    return gulp.src(['./rev/*.json','./dest/index.html'])
    .pipe(revCollector({
        replaceReved: true
    }))
    .pipe(gulp.dest('./dest/'))
});
//打包集合
gulp.task('build',gulpSequence('build:clean','build:js','build:index-html','build:module-html','rev:html'));
