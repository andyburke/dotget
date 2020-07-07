const assert = require( 'assert' );
const child_process = require( 'child_process' );

module.exports = ( test ) => {
	test.group( 'help' );

	test( 'should output help when --help is specified', () => {
		const result = child_process.execSync( 'node index.js --help' ).toString();
	
		assert.match( result, /Usage/ );
	} );
	
	test( 'should display help if <variable> argument is missing', () => {
		try {
			child_process.execSync( 'node index.js', {
				stdio: 'ignore'
			} );
		}
		catch ( error ) {
			assert.equal( error.status, 1 );
			assert.match( error.stderr.toString(), /You must specify a variable name to get/ );
			assert.match( error.stdout.toString(), /Usage/ );
		}
	} );

};
