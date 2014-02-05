'use strict';

var vskype = angular.module('vskypeApp');

vskype.controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
    ];
});

vskype.factory('getData', function($http){
	var getDataService = {};

	getDataService.getBTCValOfTag = function(callback){
		$http.get('http://www.cryptocoincharts.info/v2/api/tradingPair/TAG_BTC').success(callback);
	};

	getDataService.getUSDValOfBTC = function(callback){
		$http.get('http://data.mtgox.com/api/2/BTCUSD/money/ticker_fast').success(callback);
	};

	return getDataService;
});

vskype.factory('convert', function($http, getData){
	var convertionService = {};

	convertionService.getBTCValOfTagCallback = function(res){
		var TAG_BTC = res['price'];
		getData.getUSDValOfBTC(function(res2){
			var BTC_USD = res2['data']['last_all']['value'];
			convertionService.convertTagcoin = function(tag){
				var TAG_BTC2 = TAG_BTC * tag;
				var BTC_USD2 = BTC_USD * TAG_BTC2;
				if(isNaN(BTC_USD)){
					$('#currValue').val('');
				} else {
					$('#currValue').val(Number(BTC_USD2).toFixed(2));
				}
			}
		});
	};

	setInterval(function(){
		getData.getBTCValOfTag(convertionService.getBTCValOfTagCallback);
	}, 10000);

	convertionService.convertCurrency = function(curr){
		var currValue = curr * convertionService.usdVal;
		if(isNaN(currValue)){
			$('#tagValue').val('');
		} else {
			$('#tagValue').val(Number(currValue).toFixed(8));
		}
	};

	return convertionService;
});

vskype.controller('ConvertionCtrl', function($scope, $http, convert) {
	$scope.convert = convert;
});