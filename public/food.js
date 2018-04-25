var app = angular.module('Food', []);
var geocodeAPIKey = 'AIzaSyBX6KJp8ln193CGKR2p9Bb0cKleF8XpFWA';

app.controller('foodController', function($scope, $http, $httpParamSerializerJQLike, $window) {
  $scope.help = '';
  $scope.username = angular.fromJson($window.sessionStorage.getItem("username"));
  $scope.address = angular.fromJson($window.sessionStorage.getItem("address"));
  $scope.radius = angular.fromJson($window.sessionStorage.getItem("rad"));
  $scope.results = [];
  $scope.weather = '';

  $scope.search = function() {
    if ($scope.address === '') {
      $scope.help = 'Please enter an address';
    } else {
      $scope.help = '';
      var data = $httpParamSerializerJQLike({
        address: $scope.address,
        key: geocodeAPIKey
      });
      $http({
        method: 'GET',
        url: 'https://maps.googleapis.com/maps/api/geocode/json?' + data,
      })
      .then(function(res) {
        var results = res.data.results[0];
        if (results) {
          var lat = results.geometry.location.lat;
          var lng = results.geometry.location.lng;
          //1 degree is approximately 69 miles
          var rad = $scope.radius / 69;
          //var rad = 0.01;
          var maxLat = lat + rad;
          var minLat = lat - rad;
          var maxLng = lng + rad;
          var minLng = lng - rad;
          var type = '';

          var radios = document.getElementsByName('type'); 
          for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
              type = radios[i].value;
            }
          }

          if (type === '') {
            $scope.help = 'Please choose one of the food options above.'
            return;
          }

          var query = 'SELECT business.name, business.neighborhood, ' + 
            'business.address, business.city, business.state, business.postal_code, ' +
            'business.stars FROM business LEFT JOIN category ON  business.id = category.business_id ' +
            'WHERE category.category=\'' + type + '\' AND ' +
            'business.latitude<=(' + maxLat + ') AND ' +
            'business.latitude>=(' + minLat + ') AND ' +
            'business.longitude<=('+ maxLng + ') AND ' +
            'business.longitude>=(' + minLng + ') ORDER BY business.stars DESC';

            console.log(type);
            console.log(maxLat);
            
          var data = $httpParamSerializerJQLike({
            'query': query
          });
          
          $http({
            method: 'POST',
            url: '/api/data',
            data: data,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(res) {
            console.log(res);
            $scope.results = res.data.data.rows;

            if ($scope.results.length === 0) {
              $scope.help = "We're sorry but the city you searched for is not currently supported :(";
            }
          });
        } else {
          $scope.help = 'UH OH an error occurred in trying to get the geocode';
        }
      });
    }
  }
  
});