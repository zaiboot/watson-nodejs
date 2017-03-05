var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jsHint = require('gulp-jshint');
var jscs = require('gulp-jscs');

var jsFiles = ['*.js','src/**/*.js'];

gulp.task('style', function() {
    return gulp.src(jsFiles)
      .pipe(jsHint({    node: true   }
      ))
      .pipe(jsHint.reporter('jshint-stylish', {
        verbose: true,
        node: true
    }));
      //.pipe(jscs());

});
/* task for  injecting code changes on .js or css files.
gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');
    var injectSrc = gulp.src(['./public/css/*.css','./public/js/*.js'], {read: false});
    var injectOptions = {
        ignorePath: '/public'
    };

    var options = {
        bowerJson: require('../demo01.ui/bower.json'),
        directory: '../demo01/public/lib',
        ignorePath: '../../public'

    };
    return gulp.src('./src/views/*.jade')
        //.src('./src/views/*.html')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});*/

//gulp.task('serve', ['style', 'inject'], function() {
 gulp.task('serve', ['style'], function() {
    var options = {
        script: 'server.js',
        delayTime : 1,
        env:{
            'PORT': 3000
        },
        watch: jsFiles
    };
    return nodemon(options)
        .on('restart', function(ev) {
            console.log('restarted');
        });
});