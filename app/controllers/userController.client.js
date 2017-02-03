'use strict';
/*
The GitHub API :

id: The numeric ID associated with the GitHub account.
displayName: The full name (i.e. first and last) for the GitHub account.
username: The GitHub username for the account
public_repos: The number of public repositories associated with the GitHub account

*/
/*
immediately invoked function express (IIFE)
An IIFE is going to bind all the variables within to the local scope of that function. 
This means that any variables declared within this function will not conflict with 
other variables within the application that may share the same name or need to be re-used.
*/

(function(){
	//Integrating the API into AngularJS
	angular
	.module('profileApp', ['ngResource'])
	.controller('profileController', 
		['$scope', '$http', function($scope, $http){

			$http.get("/api/:id").then(function(response){
				//console.log("response:" + JSON.stringify(response));
				var results = response.data;
				$scope.profileId = results.id;
				$scope.profileUsername = results.username;
				$scope.displayName = results.displayName;
				$scope.profileRepos = results.publicRepos;
			});

	}]);

})();