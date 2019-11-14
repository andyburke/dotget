const child_process = require( 'child_process' );

describe( 'get', () => {
	it( 'should get an environment variable', () => {
		const result = child_process.execSync( 'node index.js --file test/.env FOO' ).toString();

		expect( result ).toEqual( 'bar\n' );
	} );

	it( 'should get an expanded environment variable', () => {
		const result = child_process.execSync( 'node index.js --file test/.env FOOBAR' ).toString();

		expect( result ).toEqual( 'bar-bar\n' );
	} );
} );
