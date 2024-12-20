'use strict';

angular.module('jtbd')
  .filter('array', function() {
	return function(input, filter) {
		if (typeof(filter) !== 'undefined' && filter.trim() !== '') {
			var indexes = filter.split(/,/);
			for (var index in indexes) {
				if (indexes[index].trim() === '') {
					break;
				}
				input = input[indexes[index]];
			}
		}
		return input;
	};
  });

angular.module('jtbd')
  .filter('select', function() {
	return function(input, filter) {
		var selected = input;
		if (typeof(filter) !== 'undefined' && filter.trim() !== '') {
			var indexes = filter.split(/,/);
			for (var index in indexes) {
				if (indexes[index].trim() === '') {
					break;
				}
				selected = selected[indexes[index]];
			}
		}
		return input;
	};
  });

