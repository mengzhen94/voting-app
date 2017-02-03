'use strict';

/*
immediately invoked function express (IIFE)
An IIFE is going to bind all the variables within to the local scope of that function. 
This means that any variables declared within this function will not conflict with 
other variables within the application that may share the same name or need to be re-used.
*/

(function(){
	//Integrating the API into AngularJS
	angular
	.module('clementineApp', ['ngResource'])
	.controller('clickController', 
		['$scope', '$http', function($scope, $http){

			$scope.getClicks = function(){
				$http.get('/api/:id/clicks').then(function(response){
					$scope.clicks = response.data.clicks;
				});
			}

			$scope.getClicks();
			
			$http.get("/api/:id").then(function(response){
				$scope.displayName = response.data.displayName;
			});

			$scope.addClick = function(){
				$http.post('/api/:id/clicks').then(function(){
					$scope.getClicks();
				});
			};

			$scope.resetClicks = function(){
				$http.delete('/api/:id/clicks').then(function(){
					$scope.getClicks();
				});
			}

			
		
		
	}]);

})();