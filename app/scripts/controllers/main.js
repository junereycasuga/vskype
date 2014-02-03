'use strict';

var vskype = angular.module('vskypeApp');

vskype.controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
});

vskype.factory('convert', function(){
	var convertionService = {};

	convertionService.convertTagcoin = function(tag){
		var tagValue = tag * 40;
		$('#currValue').val(tagValue);
	};

	convertionService.convertCurrency = function(curr){
		var currValue = curr * 40;
		$('#tagValue').val(currValue);
	}

	return convertionService;
});

vskype.controller('ConvertionCtrl', function($scope, convert) {
	$scope.convert = convert;
});