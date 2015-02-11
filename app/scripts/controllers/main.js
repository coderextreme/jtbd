'use strict';

/**
 * @ngdoc function
 * @name healthjwcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the healthjwcApp
 */
angular.module('healthjwcApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $http.get('output.json')
      .success(function(record/*, status, headers, config*/) {
	    $scope.jsons = [];
	    $scope.jsons[0] =
		{ 'title': 'Input Medical Record',
		  'left': '365px',
		  'top': '250px',
		  'width': '200px',
		  'height': '300px',
		  'record' : record,
		};
	    $scope.jsons[1] =
		{ 'title': 'Output Medical Record',
		  'left': '615px',
		  'top': '250px',
		  'width': '200px',
		  'height': '300px',
		  'record' : {},
		};
    });
    $scope.onDragComplete=function(data,evt){
       //console.log('drag success, data:', data, 'event:', evt);
       data.top = evt.ty+'px';
       data.left = evt.tx+'px';
       evt.element[0].parentElement.style.top = evt.ty+'px';
       evt.element[0].parentElement.style.left = evt.tx+'px';
       evt.element[0].parentElement.style.position = 'absolute';
    };
    $scope.onDropComplete=function(data,evt){
       //console.log('drop success, data:', data, 'event:', evt);
       data.top = evt.ty+'px';
       data.left = evt.tx+'px';
       evt.element[0].parentElement.style.top = evt.ty+'px';
       evt.element[0].parentElement.style.left = evt.tx+'px';
       evt.element[0].parentElement.style.position = 'absolute';
    };
    $scope.copyIn = function(json, filter) {
		var selection = json.record;
		if (typeof(filter) !== 'undefined' && filter.trim() !== '') {
			var indexes = filter.split(/,/);
			//console.log(indexes, 'Begin copy in', selection);
			if (indexes.length > 1) {
				var upto = indexes.slice(0, indexes.length-1);
				//console.log(upto, 'Nested structure');
				for (var index in upto) {
					if (indexes[index].trim() === '') {
						break;
					}
					//console.log(index, indexes[index], selection);
					selection = selection[indexes[index]];
					//console.log("Result JSON", selection);
				}
			}
			//console.log(indexes.length-1, indexes[indexes.length-1], selection);
			selection[indexes[indexes.length-1]] = $scope.copy;
		} else {
			selection = $scope.copy;
			console.log("Result JSON", selection);
		}
		json.record = selection;
    };
    $scope.copyOut = function(json, filter) {
		if (typeof(filter) !== 'undefined' && filter.trim() !== '') {
			var indexes = filter.split(/,/);
			for (var index in indexes) {
				if (indexes[index].trim() === '') {
					break;
				}
				//console.log(index, indexes[index], json);
				json = json[indexes[index]];
			}
		}
		$scope.copy = json;
    };
  });
