"use strict";

const gulp = require( 'gulp' );
const concat = require( 'gulp-concat' );
const sass = require( 'gulp-sass' );
const sourcemaps = require( 'gulp-sourcemaps');
const autoprefixer = require( 'gulp-autoprefixer' );

sass.compiler = require( 'node-sass' );

gulp.task( 'sass', () => { 
  return gulp.src( 'sass/*.scss' )
    .pipe( sourcemaps.init() )
    //.pipe( sass( { outputStyle: 'compressed' } ).on( 'error', sass.logError ) )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( autoprefixer( 'last 2 versions', { grid: "autoplace" } ) )
    .pipe( concat( 'style.css' ) )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( 'dist' ) );
} );

gulp.task( 'watch', () => {
  gulp.watch( 'sass/*.scss', gulp.series( 'sass' ) );
} );

gulp.task( 'default', gulp.series( 'sass', 'watch' ) );