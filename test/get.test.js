const assert = require( 'assert' );
const child_process = require( 'child_process' );

module.exports = ( test ) => {
	test.group( 'get' );
	
	test( 'should get an environment variable', () => {
		const result = child_process.execSync( 'node index.js --file test/.env FOO' ).toString();

		assert.equal( result, 'bar\n' );
	} );

	test( 'should get an expanded environment variable', () => {
		const result = child_process.execSync( 'node index.js --file test/.env FOOBAR' ).toString();

		assert.equal( result, 'bar-bar\n' );
	} );
};