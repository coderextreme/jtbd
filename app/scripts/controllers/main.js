'use strict';

/**
 * @ngdoc function
 * @name jtbd.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jtbd
 */
angular.module('jtbd')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $http.get('output.json')
      .then(function(record/*, status, headers, config*/) {
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
		  'record' : [],
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
		var higherselection = selection;
		if (typeof(filter) !== 'undefined' && filter.trim() !== '') {
			var indexes = filter.split(/,/);
			//console.log(indexes, 'Begin copy in', selection);
			if (indexes.length > 1) {
				var upto = indexes.slice(0, indexes.length-1);
				//console.log(upto, 'Nested structure');
				var filterInt = function (value) { if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) { return Number(value); } else { return NaN; } };
				for (var index in upto) {
					var ret = filterInt(index);
					if (!isNaN(ret)) {
						index = ret;
					}
					if (indexes[index].trim() === '') {
						break;
					}
					//console.log(index, indexes[index], selection);
					higherselection = selection;
					selection = selection[indexes[index]];
					//console.log("Result JSON", selection);
				}
			}
			//console.log(indexes.length-1, indexes[indexes.length-1], selection);
			var jsonstuff = JSON.parse($scope.copy);
			if (typeof selection === 'string' && jsonstuff.length === 1 && typeof jsonstuff === 'string') {
			    var a = selection.split('');
			    a[indexes[indexes.length-1]] = jsonstuff;
			    selection = a.join('');
			    if (typeof higherselection === 'object') {
					higherselection[indexes[indexes.length-2]] = selection;
			    }
			} else {
				selection[indexes[indexes.length-1]] = jsonstuff;
			}
		} else {
			selection =  JSON.parse($scope.copy);
			json.record = selection;
			console.log('Result JSON', selection);
		}
		// json.record = selection;
    };
    $scope.copyOut = function(json, filter) {
		var selection = json;
		if (typeof(filter) !== 'undefined' && filter.trim() !== '') {
			var indexes = filter.split(/,/);
			var filterInt = function (value) { if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) { return Number(value); } else { return NaN; } };
			for (var index in indexes) {
				var ret = filterInt(index);
				if (!isNaN(ret)) {
					index = ret;
				}
				if (indexes[index].trim() === '') {
					break;
				}
				selection = selection[indexes[index]];
			}
		}
		$scope.copy = JSON.stringify(selection);
    };
  });
