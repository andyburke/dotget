const child_process = require( 'child_process' );

describe( 'files', () => {
	it( 'should get an environment variable from a different .env file', () => {
		const result = child_process.execSync( 'node index.js --file test/.env.other OTHER' ).toString();

		expect( result ).toEqual( 'foo\n' );
	} );

	it( 'should get environment variables from multiple .env files', () => {
		const command = 'node index.js --file test/.env --file test/.env.other';
		const other_result = child_process.execSync( `${ command } OTHER` ).toString();

		expect( other_result ).toEqual( 'foo\n' );

		const foo_result = child_process.execSync( `${ command } FOO` ).toString();

		expect( foo_result ).toEqual( 'bar\n' );
	} );
} );
