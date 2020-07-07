'use strict';

const test = require( 'baretest' )( 'dotget' );

test.quiet( false );
test.bail( false );

require( './files.test.js' )( test );
require( './get.test.js' )( test );
require( './help.test.js' )( test );

( async function() {
	await test.run();
} )();