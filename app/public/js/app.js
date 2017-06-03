(function() {
	var app = angular.module('internetStore',[]);//, ['swapiDirective']);

	app.config(function($interpolateProvider) {
	  $interpolateProvider.startSymbol('{[{');
	  $interpolateProvider.endSymbol('}]}');
	});

	app.factory('httpq', function($http, $q){
		return {
			get : function() {
				var deffered = $q.defer();
				$http.get.apply(null,arguments)
				.then(deffered.resolve)
				.catch(deffered.resolve);
				return deffered.promise;
			}
		}
	});

	app.controller('StoreController', function(httpq){

		//function Request() {
			//httpq.get('http://localhost:3044/api/administration')
			var mthis = this;
			mthis.category_l1 = [];
					mthis.category_l2 = [];
					mthis.category_l3 = [];
			httpq.get('http://localhost:3044/api/administration')
				.then(function(datas){
					//alert(datas.data[0].name);
					mthis.category = datas.data;
					
					alert('asdfasd');
					for(i=0; i<mthis.data.length; i++) {
						if(mthis.data[i].id_parent===0) {
							mthis.category_l1.push(mthis.data[i]);
						} else if(mthis.data[mthis.data[i].id_parent]===0) {
							mthis.category_l2.push(mthis.data[i]);
						} else {
							mthis.category_l3.push(mthis.data[i]);
						}
					}

					alert(mthis.category_l1);
					

					//alert(datas.data);
					//alert(JSON.parse(datas));
					//mthis.category=JSON.parse(datas);
					//alert(datas);
					/*starWars.obj = datas.data;
					starWars.peoples = starWars.peoples.concat(datas.data.results);
					if(starWars.obj.next!=null) {
						starWars.requestPeople(numPage+1);
					}*/
				})
				.catch(function(){
					alert("error");
				})
				.finally(function(){
				});
		//	alert(mthis.category);

		//}

		//Request();

	});

})();