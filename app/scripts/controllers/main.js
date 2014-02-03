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

	convertionService.convertTagcoin = function(){
		console.log('tag');
	};

	convertionService.convertCurrency = function(){
		console.log('curr');
	}

	return convertionService;
});

vskype.controller('ConvertionCtrl', function($scope, convert) {
	$scope.convert = convert;
});
