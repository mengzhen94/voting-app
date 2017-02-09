'use strict';
(function(){
   angular.module("mypollApp", []).controller("allpoll", ["$scope", "$http", "$parse", function($scope, $http, $parse){
       
       $http.get('/allpolls', { cache: true}).then(function(response){

            $scope.pollsData = response.data; 
            $scope.polls = []; 
            $scope.pollsData.forEach(function(eachPoll){
                $scope.polls.push({
                    "newid": eachPoll["_id"],
                    "title": eachPoll.title
                });  
            });
    	});  
  	}]); 
})();