'use strict';

var vskype = angular.module('vskypeApp');

vskype.factory('convert', function($firebase, firebaseUrl, $route, $routeParams, $location) {
    var conv = {};
    
    conv.fb = $firebase(new Firebase(firebaseUrl));
    conv.tag_btc = $firebase(new Firebase(firebaseUrl + 'tag_btc'));
    conv.btc_usd = $firebase(new Firebase(firebaseUrl + 'btc_usd'));
    conv.usd_currency = $firebase(new Firebase(firebaseUrl + 'usd_currency'));
    conv.currencies = $firebase(new Firebase(firebaseUrl + 'currencies'));
   
    if($routeParams.currency_code){
        conv.currency_code = $routeParams.currency_code;
    } else {
        conv.currency_code = "USD";
    }

    conv.currate = $firebase(new Firebase(firebaseUrl + 'usd_currency/' + conv.currency_code));
    
    conv.convertTagcoin = function(amount) {
        var convertedTagtoBTC = amount * conv.tag_btc.price;
        var convertedBTCtoUSD = convertedTagtoBTC * conv.btc_usd.price;
        var convertedUSDtoCur = convertedBTCtoUSD * conv.currate.rate;
        conv.convertedTag = convertedUSDtoCur;

        if(isNaN(conv.convertedTag)){
            conv.currency = '';
        } else {
            conv.currency = Number(conv.convertedTag).toFixed(2);
        }
    };

    conv.convertedTagcoin = function(amount, currency) {
    };

    return conv;
});

vskype.controller('MainCtrl', function ($scope, convert) {
    $scope.tag = 1;
    $scope.convert = convert;
});
