'use strict';

angular.module('vskypeApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
