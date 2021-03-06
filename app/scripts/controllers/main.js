'use strict';

var vskype = angular.module('vskypeApp');

vskype.factory('convert', function($firebase, firebaseUrl, $routeParams, $timeout) {
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

    if($routeParams.crypto_code){
        conv.crypto_code = $routeParams.crypto_code;
    } else {
        conv.crypto_code = "BTC";
    }
    
    conv.onLoadConvertion = function(amount){
        if(!amount){
            amount = 1;
        } else {
            amount = amount;
        }

        if($routeParams.currency_code){
            var currency = $routeParams.currency_code;
        } else {
            var currency = "USD";
        }

        if($routeParams.crypto_code){
            var crypto = $routeParams.crypto_code;
        } else {
            var crypto = "BTC";
        }

        conv.convertTagcoin(amount, crypto, currency);
    };

    conv.convertTagcoin = function(amount, crypto, currency) {
        conv.currate = $firebase(new Firebase(firebaseUrl + 'usd_currency/' + currency));
        conv.currate.$on('loaded', function(){
            $('#loading').addClass('animated fadeOut');
            $('#loading').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
                function(){
                    $(this).hide()
                }
            );
            conv.currency_code = currency;
            conv.crypto_code = crypto;
            if(amount){
                conv.tag=amount;
            }

            if(crypto == "TAG"){
                var convertedTagtoBTC = amount * conv.tag_btc.price;
                var convertedBTCtoUSD = convertedTagtoBTC * conv.btc_usd.price;
                var convertedUSDtoCur = convertedBTCtoUSD * conv.currate.rate;
                conv.convertedTag = convertedUSDtoCur;
            } else if(crypto == "BTC"){
                var convertedUSDtoCur = (amount * conv.btc_usd.price) * conv.currate.rate;
                conv.convertedTag = convertedUSDtoCur;
            }

            if(isNaN(conv.convertedTag)){
                conv.currency = "";
            } else {
                conv.currency = Number(conv.convertedTag).toFixed(2);
            }
        });
        
        $('#tagValue').focus(function(){
            $timeout(function(){
                conv.convertTagcoin(conv.tag, conv.crypto_code, conv.currency_code);
            }, 10000);
        });
    };

    conv.convertCrypto = function(amount, crypto, currency) {       
        conv.currate = $firebase(new Firebase(firebaseUrl + 'usd_currency/' + currency));
        conv.currate.$on('loaded', function(){
            conv.currency_code = currency;
            conv.crypto_code = crypto;
            if(amount){
                conv.currency=amount;
            }

            var convertedCur = amount / conv.currate.rate;
            if(crypto == "TAG"){
                conv.convertedCurr = (convertedCur / conv.btc_usd.price) / conv.tag_btc.price;
            } else if(crypto == "BTC"){
                conv.convertedCurr = convertedCur / conv.btc_usd.price;
            }

            if(isNaN(conv.convertedTag)){
                conv.tag = "";
            } else {
                conv.tag = Number(conv.convertedCurr).toFixed(8);
            }
        });

        $('#currValue').focus(function(){
            $timeout(function(){
                conv.convertCrypto(conv.currency, conv.crypto_code, conv.currency_code);
            }, 10000);
        });
    }

    return conv;
});

vskype.controller('MainCtrl', function ($scope, convert, $timeout) {
    $('#currValue').focus(function(){
        $('#tagValue').removeAttr('ng-change');
        $('#currValue').attr('ng-change','convert.convertCrypto(convert.currency, convert.crypto_code, convert.currency_code)');
    });

    $('#tagValue').focus(function(){
        $('#currValue').removeAttr('ng-change');
        $('#tagValue').attr('ng-change','convert.convertTagcoin(convert.tag, convert.crypto_code, convert.currency_code)');
    });

    $scope.convert = convert;
});
