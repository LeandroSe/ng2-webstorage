import {beforeEachProviders, describe, inject, it} from '@angular/core/testing';
import {WebStorageService} from './webStorage';
import {STORAGE} from '../enums/storage';


describe('service:webStorage', () => {

	describe('issues', () => {

		describe('#5:localstorage variable not created for JSON stringified array', () => {
			var localstorage = new WebStorageService(STORAGE.local),
				key = 'boundValue';

			beforeEach(() => {
				localstorage.clear();
			});

			it('should store and retrieve an int', () => {

				let toStore = 1;
				expect(() => localstorage.store(key, toStore)).not.toThrow();
				expect(localstorage.retrieve(key)).toEqual(toStore);

			});

			it('should store and retrieve a string', () => {

				let toStore = 'foobar';

				expect(() => localstorage.store(key, toStore)).not.toThrow();
				expect(localstorage.retrieve(key)).toEqual(toStore);

			});

			it('should store and retrieve a basic object', () => {

				let toStore = {foo: 'foo'},
					json = JSON.stringify(toStore);

				expect(() => localstorage.store(key, json)).not.toThrow();

				let retrieved = localstorage.retrieve(key);
				expect(retrieved).toEqual(json);

				let parsed = JSON.parse(retrieved);
				expect(parsed).toEqual(jasmine.objectContaining(toStore));

			});

			it('should store and retrieve an array', () => {

				let toStore = ['foo'],
					json = JSON.stringify(toStore);

				expect(() => localstorage.store(key, json)).not.toThrow();

				let retrieved = localstorage.retrieve(key);
				expect(retrieved).toEqual(json);

				let parsed = JSON.parse(retrieved);

				expect(parsed).toContain('foo');
				expect(parsed.length).toEqual(1);
			});

		});
	});

});
