'use strict';
(function(){
   angular.module("mypollApp", []).controller("mypoll", ["$scope", "$http", "$parse", function($scope, $http, $parse){
       
       $http.get('/mypolls/api', { cache: true}).then(function(response){

           	$scope.displayName = response.data.github.displayName;
           	$scope.pollIDs = response.data.polls.pollIDs;
 			
    		$scope.pollobjs = []; 

    		$scope.pollIDs.forEach(function(id){
        
         		var getter = "/showpolls/" + id;
         		$http.get(getter, {cache: true}).then(function(res){
             
                	$scope.pollobjs.push({
                    	"newid": res.data["_id"],
                    	"title": res.data.title
                	});     
        		},function(err){throw err;});
        
    		});

    	});  
  	}]); 
})();