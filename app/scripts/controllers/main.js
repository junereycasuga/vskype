'use strict';

var vskype = angular.module('vskypeApp');

vskype.factory('convert', function($firebase, firebaseUrl) {
    var conv = {};
    
    conv.tag_btc = $firebase(new Firebase(firebaseUrl + 'tag_btc'));
    conv.btc_usd = $firebase(new Firebase(firebaseUrl + 'btc_usd'));
    conv.usd_currency = $firebase(new Firebase(firebaseUrl + 'usd_currency'));
    conv.currencies = $firebase(new Firebase(firebaseUrl + 'currencies'));

    conv.convertTagcoin = function(arg) {
        var convertedTagtoBTC = arg * conv.tag_btc.price;
        var convertedBTCtoUSD = convertedTagtoBTC * conv.btc_usd.price;
        conv.convertedTag = convertedBTCtoUSD;
        
        if(isNaN(conv.convertedTag)){
            $('#currValue').val('');
        } else {
            $('#currValue').val(Number(conv.convertedTag).toFixed(2));
        }
    };

    return conv;
});

vskype.controller('MainCtrl', function ($scope, convert) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
    ];

    $scope.convert = convert;
});
