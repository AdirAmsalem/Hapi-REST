// Load modules
var app = require('../app/config');
var utilities = app.getLocal('utilities');

describe('Local: Utilities', function() {

	// convertId method
	it('convertId(): Should fail to convert and return false', function() {
		expect(utilities.convertId()).toBe(false);
	});

	it('convertId(123): Should fail to convert and return false', function() {
		expect(utilities.convertId(123)).toBe(false);
	});

	it('convertId(\'000000000000000000000000\'): Should successfully convert', function() {
		expect(utilities.convertId('000000000000000000000000')).not.toBe(false);
	});

	// isEmptyObject method
	it('isEmptyObject(): Should return true', function() {
		expect(utilities.isEmptyObject()).toBe(true);
	});

	it('isEmptyObject({}): Should return true', function() {
		expect(utilities.isEmptyObject()).toBe(true);
	});

	it('isEmptyObject({ foo: \'bar\' }): Should return false', function() {
		expect(utilities.isEmptyObject({ foo: 'bar' })).toBe(false);
	});
});