var app = angular.module('SignUp', []);

app.controller('signUpController', function($scope, $http, $httpParamSerializerJQLike) {
  $scope.help = '';
  $scope.username = '';
  $scope.password = '';
  $scope.confirmpass = '';
  $scope.email = '';

  $scope.signup = function() {
    if ($scope.username === '' || $scope.password === '' 
        || $scope.confirmpass === '' || $scope.email === '') {
      $scope.help = 'Please enter all credentials';
    } else if ($scope.password !== $scope.confirmpass) {
      $scope.help = 'Passwords do not match'
    } else {
      $scope.help = '';
      var data = $httpParamSerializerJQLike({
        'username': $scope.username,
        'password': $scope.password,
        'email': $scope.email
      });

      $http({
        method: 'POST',
        url: '/api/signup',
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(function(res) {
        if (res.data.isAuthenticated) {
          $scope.help = 'Success!';
        } else {
          $scope.help = 'Uh oh an error occurred while creating your account :(';
        }
      });
    }
  }
});