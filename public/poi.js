var app = angular.module('POI', []);
var geocodeAPIKey = 'AIzaSyBX6KJp8ln193CGKR2p9Bb0cKleF8XpFWA';

app.controller('poiController', function($scope, $http, $httpParamSerializerJQLike, $window) {
  $scope.help = '';
  $scope.username = angular.fromJson($window.sessionStorage.getItem("username"));;
  $scope.address = '';
  $scope.radius = 1;
  $scope.results = [];
});