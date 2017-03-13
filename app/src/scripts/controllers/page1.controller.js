'use strict';
angular.module('app.controllers')
.controller('Page1Ctrl',['$scope','$q',function($scope,$q){
	var deferred = $q.defer();
	console.log(deferred);
	console.log($q);
;}]);