var gulp = require('gulp'),
    path = require('../config.js'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    replace = require('gulp-replace'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    revReplace = require("gulp-rev-replace");

//打包js和css
gulp.task('build:js', ['less', 'js', 'browserify'],function() {
    return gulp.src(path.app_dir + '/index.html')
        .pipe(useref())
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulpif('*.css', rev()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.js', rev()))
        .pipe(replace('../src/views','./modules'))
        .pipe(replace('src/views', './modules'))
        .pipe(gulp.dest(path.dest_dir))
        .pipe(rev.manifest({merge:true}))
        .pipe(gulp.dest(path.rev_dir+'/js'));
});

//打包html
gulp.task('build:module-html', function() {
    return gulp.src(path.views_dir+'/*.html')
        .pipe(replace('src/views', './modules'))
        .pipe(minifyHtml())
        .pipe(gulp.dest(path.dest_modules_dir));
})
//打包图片
gulp.task('build:img',function(){
    return gulp.src(path.img_dir+'/*.{png,jpg,gif,ico}')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest(path.dest_img))
    .pipe(rev.manifest({
        merge:true
    }))
    .pipe(gulp.dest(path.rev_dir+'/img'))
})

//在html内打上版本号
gulp.task('revReplace', function() {
    return gulp.src([path.dest_dir+'/**/*'])
        .pipe(revReplace({
            manifest: gulp.src(path.rev_dir+'/**/rev-manifest.json')
        }))
        .pipe(gulp.dest(path.dest_dir))
});
//删除版本号
gulp.task('rev:clean',function(){
    return del(path.rev_dir);
})
//删除临时文件
gulp.task('tmp:clean',function(){
    return del(path.dest_tmp);
})

//清空dest目录
gulp.task('build:clean', function() {
    return del(path.dest_dir);
})