'use strict';

var vskype = angular.module('vskypeApp');

vskype.controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
});

vskype.factory('convert', function($http){
	var convertionService = {};

	convertionService.getBTCValOfTag = function(tag){
		$http({
			method: 'GET',
			url: 'http://www.cryptocoincharts.info/v2/api/tradingPair/TAG_BTC'
		})
			.then(function(res){
				var data = res.data;
				return data['price'];
			});
	};

	convertionService.convertBTCToUSD = function(btc){
		$http({
			method: 'GET',
			url: 'http://data.mtgox.com/api/2/BTCUSD/money/ticker_fast'
		})
			.success(function(result){
				convertionService.usdVal = result['data']['last_all']['value'] * btc;
			});
	};

	convertionService.convertTagcoin = function(tag){
		$http({
			method: 'GET',
			url: 'http://www.cryptocoincharts.info/v2/api/tradingPair/TAG_BTC'
		})
			.success(function(res){
				var TAG_BTC = res['price'] * tag;
				console.log('1 tag = ' + res['price']);
				console.log(tag + 'tags = ' + TAG_BTC);
				$http({
					method: 'GET',
					url: 'http://data.mtgox.com/api/2/BTCUSD/money/ticker_fast'
				})
					.success(function(res){
						var BTC_USD = res['data']['last_all']['value'] * TAG_BTC;
						console.log(res['data']['last_all']['value']);
						console.log(BTC_USD);
						if(isNaN(BTC_USD)){
							$('#currValue').val('');
						} else {
							$('#currValue').val(Number(BTC_USD).toFixed(8));
						}
					})
					.error(function(){
						console.log('can\'t fetch data');
					});
			})
			.error(function(){
				console.log('can\'t fetch data');
			});
		
	};

	convertionService.convertCurrency = function(curr){
		var currValue = curr * convertionService.usdVal;
		if(isNaN(currValue)){
			$('#tagValue').val('');
		} else {
			$('#tagValue').val(Number(currValue).toFixed(8));
		}
	}

	return convertionService;
});

vskype.controller('ConvertionCtrl', function($scope, $http, convert) {
	$scope.convert = convert;
});