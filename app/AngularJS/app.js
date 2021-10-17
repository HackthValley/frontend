var app = angular.module("mainApp", ["ngRoute"]);
app.constant('BASE', 'http://localhost:5000/');
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'mainController',
      templateUrl: './AngularJS/Views/view.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
