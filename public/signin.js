var app = angular.module('SignIn', []);

app.controller('signInController', function($scope, $http, 
  $httpParamSerializerJQLike, $location, $window) {
  $scope.help = '';
  $scope.username = '';
  $scope.password = '';
  
  $scope.signin = function() {
    if ($scope.username === '' || $scope.password === '') {
      $scope.help = 'Please enter a username and password';
    } else {
      $scope.help = '';
      var data = $httpParamSerializerJQLike({
        'username': $scope.username,
        'password': $scope.password
      });

      $http({
        method: 'POST',
        url: '/api/signin',
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function(res) {
        if (res.data.isAuthenticated) {
          //$location.url('/auth/plan');
          $window.location = '/auth/plan'
          //$window.location.reload();
        } else {
          $scope.help = 'Invalid login credentials';
        }
      });
    }
  }

  $scope.signup = function() {
    $location.path = ('/signup');
  }
});
