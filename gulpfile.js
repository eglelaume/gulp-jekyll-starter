var gulp = require('gulp'),
	gutil = require('gulp-util'),
	spawn = require('win-spawn'),
	concat = require('gulp-concat'),
	refresh = require('gulp-livereload'),
	server = require('express')(),
	lrserver = require('tiny-lr')(), 
	livereload = require('connect-livereload'),
	livereloadport = 35729,
  	serverport = 3000;
 
server.use(livereload({
  port: livereloadport
}));

server.use(require('express').static('./build'));

gulp.task('jekyllBuild', function() {  
   	spawn('jekyll', ['build'], {stdio: 'inherit'})
   		.on('close', function (code) {
   			refresh(lrserver)
   		});
})

gulp.task('serve', function() {
  server.listen(serverport);
  lrserver.listen(livereloadport);
});

gulp.task('default', function(){
  gulp.run('serve', 'jekyllBuild');
   	gulp.watch('src/**/*.html', function(event) {
		gulp.run('jekyllBuild');
	})
});
