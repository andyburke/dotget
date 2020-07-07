const assert = require( 'assert' );
const child_process = require( 'child_process' );

module.exports = ( test ) => {
	test.group( 'files' );

	test( 'should get an environment variable from a different .env file', () => {
		const result = child_process.execSync( 'node index.js --file test/.env.other OTHER' ).toString();
	
		assert.equal( result, 'foo\n' );
	} );
	
	test( 'should get environment variables from multiple .env files', () => {
		const command = 'node index.js --file test/.env --file test/.env.other';
		const other_result = child_process.execSync( `${ command } OTHER` ).toString();
	
		assert.equal( other_result, 'foo\n' );
	
		const foo_result = child_process.execSync( `${ command } FOO` ).toString();
	
		assert.equal( foo_result, 'bar\n' );
	} );
};