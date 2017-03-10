//注意引用顺序
var gulp = require('gulp');
// require('./config.js');
// require('./compile.js');
// require('./build.js');



//启动服务
gulp.task('default',gulpSequence('browserify','watch','serve'));

//打包
gulp.task('build',gulpSequence('build:clean','build:js','build:module-html','rev:html'));
