'use strict';
angular.module('app',
	['ngRoute','app.controllers'])
.config(['$routeProvider',function ($routeProvider) {
	$routeProvider
	.when('/page1',{
		templateUrl:"../views/page1.html",
		controller: "Page1Ctrl"
	})
	.when('/page1',{
		templateUrl:"../views/page2.html",
		controller: "Page2Ctrl"
	})
	.otherwise({
		redirectTo: "/" 
	})

}])


'use strict';
angular.module('app.controllers',[])
.controller('MainController',['$scope',function($scope){

}]);
'use strict';
angular.module('app.controllers')
.controller('Page1Ctrl',['$scope',function($scope){

}]);
'use strict';
angular.module('app.controllers')
.controller('Page2Ctrl',['$scope',function($scope){

}]);