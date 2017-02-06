'use strict';


(function(){
	console.log("show one poll!!");
	//var apiUrl = appUrl + '/showmypolls';
	var apiUrl = '/showpolls/:id';

	function showOnePoll (data) {
		console.log("client-data:", typeof data);
		console.log("client-data:", data);

   }
	ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, showOnePoll));


})();