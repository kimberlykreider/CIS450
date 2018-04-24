var app = angular.module('Date', []);
var geocodeAPIKey = 'AIzaSyBX6KJp8ln193CGKR2p9Bb0cKleF8XpFWA';

app.controller('dateController', function($scope, $http, $httpParamSerializerJQLike, $window) {
  $scope.help = '';
  $scope.username = angular.fromJson($window.sessionStorage.getItem("username"));;
  $scope.email = '';
  $scope.address = '';
  $scope.radius = 1;
  $scope.results = "hello";
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
          var maxLat = lat + rad;
          var minLat = lat - rad;
          var maxLng = lng + rad;
          var minLng = lng - rad;
          
          var query = 'SELECT * FROM ' 
            + '(SELECT Business, POI, Neighborhood ' 
            + 'FROM joined ' 
            + 'WHERE (latitude<=(' + maxLat + ') AND latitude>=(' + minLat + ') AND ' 
            + 'longitude<=(' + maxLng + ') AND longitude>=(' + minLng + ')) ORDER BY ' 
            + '\'Business_Rating\', Distance DESC) WHERE ROWNUM <= 10';
          
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
            $scope.results = res.data.data.rows;
            if ($scope.results.length === 0) {
              $scope.help = "We're sorry but the city you searched for is not currently supported :(";
            }
          });

          $http({
            method: 'GET',
            url: 'http://api.wunderground.com/api/87addce8194b8474/geolookup/forecast/q/' + lat +',' + lng + '.json',
          }).then((res) => {
            $scope.weather = res.forcast.simpleforcast;
          });

        } else {
          $scope.help = 'UH OH an error occurred in trying to get the geocode';
        }
      });
    }
  }
});