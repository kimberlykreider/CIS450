var app = angular.module('Date', []);
var geocodeAPIKey = 'AIzaSyBX6KJp8ln193CGKR2p9Bb0cKleF8XpFWA';

app.controller('dateController', function($scope, $http, $httpParamSerializerJQLike) {
  $scope.help = '';
  //$scope.username = ;
  $scope.email = '';
  $scope.address = '';
  $scope.radius = 10;
  $scope.results = '';
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
          $scope.help = 'GEOCode Latitude: ' + lat + 
            ' Longitude: ' + lng;
          var query = 'SELECT * FROM (SELECT Business, POI, Neighborhood FROM joined' 
            +  'WHERE latitude<=(' + lat + '+0.01) AND latitude>=(' + lat + '-0.01) AND' 
            + 'longitude<=(' + lng + '+0.01) AND longitude>=(' + lng + '-0.01) ORDER BY' 
            + 'Business_Rating, Distance DESC) WHERE ROWNUM <= 5';
          
          var data = $httpParamSerializerJQLike({
            query: query
          });
          
          $http({
            method: 'GET',
            url: '/api/data',
            data: data,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(res) {
            //if ()
          });
        } else {
          $scope.help = 'UH OH an error occurred in trying to get the geocode';
        }
      });
    }
  }
});