'use strict';
(function(){
   angular.module("mypollApp", []).controller("eachpoll", ["$scope", "$http","$parse",  function($scope, $http, $parse){

		var thisId = window.location.pathname.slice(7);
   		var url = "/showpolls/" + thisId;
   		//console.log("thisUrl: ",url);

   		$scope.options = []; 

        $http.get(url, {cache: true}).then(function(res){

            $scope.title = res.data.title;
            $scope.id = res.data["_id"];
            //$scope.url = '/polls/' + res.data["_id"].toString();
            res.data.options.forEach(function(option){
            	$scope.options.push({
                	"op": option.text,
                  "num": option.votes
            	});
            });



        },function(err){throw err;});
        
  	}]); 
})();