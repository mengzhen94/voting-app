'use strict';
(function(){
   angular.module("mypollApp",["chart.js"])
   .config(["ChartJsProvider", function (ChartJsProvider) {
        
        ChartJsProvider.setOptions({
            responsive: true,
            animationEasing: "easeOutQuart",
            animationSteps: 40
        });
        
}]).controller("eachpoll", ["$scope", "$http","$parse",  function($scope, $http, $parse){

        var thisId = window.location.pathname.slice(7);
        var url = "/showpolls/" + thisId;
        //console.log("thisUrl: ",url);

        $scope.options = []; 
        $scope.labels = []; 
        $scope.data = []; 

        $http.get(url, {cache: true}).then(function(res){

            $scope.title = res.data.title;
            $scope.id = res.data["_id"];
            //$scope.url = '/polls/' + res.data["_id"].toString();
            res.data.options.forEach(function(option){
                 $scope.labels.push(option.text);
                 $scope.data.push(option.votes);
                $scope.options.push({
                    "op": option.text,
                  "num": option.votes
                });
            });

        },function(err){throw err;});
        
    }]); 
})();