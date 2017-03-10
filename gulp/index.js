//注意引用顺序

require('require-dir')('./tasks');

var gulp = require('gulp');



//启动服务
gulp.task('default',gulpSequence('browserify','watch','serve'));

//打包
gulp.task('build',gulpSequence('build:clean','build:js','build:module-html','build:img','revCollector'));
