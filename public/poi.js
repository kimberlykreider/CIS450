var app = angular.module('Poi', []);
var geocodeAPIKey = 'AIzaSyBX6KJp8ln193CGKR2p9Bb0cKleF8XpFWA';

app.controller('poiController', function($scope, $http, $httpParamSerializerJQLike, $window) {
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
          //var rad= 0.01;
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
            $scope.help = 'Please choose one of the location options above.'
            return;
          }

          var query = ' SELECT  Name, Lattitude, Longitude ' +
            'FROM places ' +
            'WHERE lattitude<=('+maxLat+') AND lattitude>=('+minLat +
            ') AND longitude<=('+maxLng+') AND longitude>=('+minLng +
            ') AND FEATURE_CODE IN ';

          switch (type) {
            case 'Outdoors':
              query = query + '(\'STM\', \'LAKE\', \'PND\', \'PRK\', \'TRL\', \'FRM\', \'BDG\', \'RECG\', \'GDN\', \'PIER\', \'HILL\', \'PK\', \'BCHS\')';
              break;
            case 'Shopping':
              query = query + '(\'CTRB\', \'MALL\', \'MKT\', \'AMUS\', \'SPA\')';
              break;
            case 'Cultural':
              query = query + '(\'LIBR\', \'MUS\', \'THTR\')';
              break;
            case 'Historical':
              query = query + '(\'RUIN\', \'CSTL\', \'SQR\', \'CAVE\', \'FT\', \'MNMT\', \'PAL\')';
              break;
          }
            
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

            $http({
              method: 'GET',
              url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key='+geocodeAPIKey,
            }).then(function(res) {
              console.log(res.data);
              for (var i = 0; i < $scope.results.length; i++) {
                $scope.results[i][1] = res.data.results[i].formatted_address;
              }
            })
            
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