var gulp 		= require("gulp"),
	htmlmin 	= require("gulp-htmlmin"),
	csso 		= require('gulp-csso'),
	uglify		= require('gulp-uglify');

gulp.task('html', function() {
	return gulp.src('*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'))
});

gulp.task('css', function() {
	return gulp.src('css/*')
		.pipe(csso())
		.pipe(gulp.dest('dist/css'))
});

gulp.task('copyFonts', function() {
	return gulp.src('fonts/*')
		.pipe(gulp.dest('dist/fonts'))
});

gulp.task('jasmineJS', function() {
	return gulp.src('jasmine/lib/jasmine-2.1.2/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/jasmine/lib/jasmine-2.1.2'))
});

gulp.task('jasmineCSS', function() {
	return gulp.src('jasmine/lib/jasmine-2.1.2/*.css')
		.pipe(csso())
		.pipe(gulp.dest('dist/jasmine/lib/jasmine-2.1.2'))
});

gulp.task('copyJasmineIcon', function() {
	return gulp.src('jasmine/lib/jasmine-2.1.2/*.png')
		.pipe(gulp.dest('dist/jasmine/lib/jasmine-2.1.2'))
});

gulp.task('jasmineSpec', function() {
	return gulp.src('jasmine/spec/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/jasmine/spec'))
});

gulp.task('appJS', function() {
	return gulp.src('js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
});

gulp.task('build', ['html', 'css', 'copyFonts', 'jasmineJS', 'jasmineCSS', 'copyJasmineIcon', 'jasmineSpec', 'appJS']);

gulp.task('default', ['build']);

gulp.task('default', ['build']);
