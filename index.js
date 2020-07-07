#!/usr/bin/env node

const dotenv = require( 'dotenv' );
const dotenv_expand = require( 'dotenv-expand' );
const pkg = require( './package.json' );
const program = require( 'commander' );
const path = require( 'path' );

let variable = null;

const dotget = program
	.exitOverride( ( error ) => {
		switch( error.code ) {
			case 'commander.missingArgument':
				dotget.help();
				break;
			case 'commander.help':
			case 'commander.helpDisplayed':
				break;
			default:
				throw error;
		}

		process.exit( typeof error.exitCode === 'number' ? error.exitCode : 1 );
	} )
	.name( 'dotget' )
	.version( pkg.version )
	.usage( '[-f/--file <filename>[, -f/--file <additional filename> ...]] <variable name>' )
	.option( '-f, --file <filename>', 'specify one or more .env files to ingest', ( value, previous ) => previous.concat( [ value ] ), [] )
	.arguments( '<variable>' )
	.action( ( arg ) => {
		variable = arg;
	} );

dotget.parse( process.argv );

if ( !Array.isArray( program.file ) || program.file.length === 0 ) {
	program.file = [ '.env' ];
}

program.file.forEach( ( file ) => {
	dotenv_expand( dotenv.config( {
		path: path.resolve( file )
	} ) );
} );

const value = process.env[ variable ];
console.log( typeof value !== 'undefined' ? value : '' );
