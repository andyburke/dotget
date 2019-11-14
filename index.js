#!/usr/bin/env node

const dotenv = require( 'dotenv' );
const dotenv_expand = require( 'dotenv-expand' );
const pkg = require( './package.json' );
const program = require( 'commander' );
const path = require( 'path' );

let variable = null;

program
	.name( pkg.name )
	.version( pkg.version )
	.usage( '[-f/--file <filename>[, -f/--file <additional filename> ...]] <variable name>' )
	.option( '-f, --file <filename>', 'specify one or more .env files to ingest', ( value, previous ) => { return previous.concat( [ value ] ); }, [] )
	.arguments( '<variable>' )
	.action( arg => {
		variable = arg;
	} )
	.parse( process.argv );

if ( typeof variable !== 'string' ) {
	console.error( 'You must specify a variable name to get!' );
	console.log( '' );
	process.exitCode = 1;
	program.help();
}

if ( !Array.isArray( program.file ) || program.file.length === 0 ) {
	program.file = [ '.env' ];
}

program.file.forEach( file => {
	dotenv_expand( dotenv.config( {
		path: path.resolve( file )
	} ) );
} );

const value = process.env[ variable ];
console.log( typeof value !== 'undefined' ? value : '' );
