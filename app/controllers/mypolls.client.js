'use strict';


(function(){
	console.log("show my polls!!");
	//var apiUrl = appUrl + '/showmypolls';
	var apiUrl = '/showmypolls';

	function showMyPolls (data) {
		console.log("client-data:", data);
   }
	ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, showMyPolls));


})();