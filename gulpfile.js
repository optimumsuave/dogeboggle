var gulp 				= require('gulp');
var sass 				= require('gulp-sass');
var watch 				= require('gulp-watch');
var watchify 			= require('watchify');
var source 				= require('vinyl-source-stream');
var streamify   		= require('gulp-streamify');
var browserify 			= require('browserify');
var babelify 			= require('babelify');
var uglify 				= require('gulp-uglify');
var gutil 				= require('gulp-util');

var production = process.env.NODE_ENV === 'production';

var watching = false;
gulp.task('enable-watch-mode', function() { watching = true });
gulp.task('enable-prod', function() { production = true });

function handleError(task) {
	return function(err) {
		gutil.log(gutil.colors.red(err));
	};
}

function buildScripts(watching){
	var bundler, rebundle;
	bundler = browserify('src/js/App.js', {
		paths: ['node_modules/','src/js/'], 
		debug: !production, 
		cache: {},
		packageCache: {},
		fullPaths: watching
  	});

  	if(watching) {
		bundler = watchify(bundler);
		bundler.on("time", function(time){ 
			gutil.log("Done in "+time/1000 + " sec");
		});
	}

	bundler.transform(babelify);

	rebundle = function() {
    	gutil.log('Rebundle...');
		var stream = bundler.bundle();
		stream.on('error', handleError('Browserify'));
		stream = stream.pipe(source('bundle.js'))

		// .pipe(streamify(uglify()));
		return stream.pipe(gulp.dest('./build'));
	};
	bundler.on('update', rebundle);
	return rebundle();
}

gulp.task('sass', function () {
	gulp.src('src/scss/main.scss')
	.pipe(sass({
		errLogToConsole: true,
		outputStyle: 'compressed'
	}))
	.pipe(gulp.dest('./build'));
});

gulp.task('copyIndex', function() {
  gulp.src('src/index.html').pipe(gulp.dest('./build'));
});

gulp.task('copyImages', function() {
  gulp.src('src/images/*').pipe(gulp.dest('./build/assets/'));
});

gulp.task('browserify', function() {
	return buildScripts(watching);
});

gulp.task('prod', ['enable-prod', 'sass', 'copyIndex', 'browserify']);

gulp.task('watch', ['sass', 'copyIndex', 'copyImages', 'enable-watch-mode', 'browserify'], function() {
	gulp.watch('src/scss/*.scss', function() {
		gulp.start('sass');
	});
	gulp.watch('src/images/*.png', function() {
		gulp.start('copyImages');
	});
	gulp.watch('src/index.html', function() {
		gulp.start('copyIndex');
	});
});

gulp.task('default', ['watch']);