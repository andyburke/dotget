const child_process = require( 'child_process' );

describe( 'help', () => {
	it( 'should output help when --help is specified', () => {
		const result = child_process.execSync( 'node index.js --help' ).toString();

		expect( result ).toMatch( /Usage/ );
	} );

	it( 'should display help if <variable> argument is missing', () => {
		try {
			child_process.execSync( 'node index.js' );
		}
		catch ( error ) {
			expect( error.status ).toBe( 1 );
			expect( error.stderr.toString() ).toMatch( /You must specify a variable name to get/ );
			expect( error.stdout.toString() ).toMatch( /Usage/ );
		}
	} );
} );
