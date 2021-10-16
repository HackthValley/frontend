var app = angular.module("mainApp", ["ngRoute"]);
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
