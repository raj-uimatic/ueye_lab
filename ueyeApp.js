//$url = 'http://localhost/portfolio'; //localhost
$url = 'http://lab.ueye.co'; //live
var _modUeyeApp = angular.module('ueyeApp', ['angular-loading-bar','ngRoute', 'ngAnimate']);


/**
*
* To redirect new url without page refresh. (in real it doesn't gets redirected. View of template gets render in ng-view )
* Status ==> Requires testing
*
**/

	_modUeyeApp.config(['$routeProvider',function($routeProvider){
		  $routeProvider
			  .when('/portfolio/:pid',{
					templateUrl: 'views/portfolio-details.html',
					reloadOnSearch: false,
			  });
			  /*.when('/about',{
					templateUrl: 'about.html',
					reloadOnSearch: false
			  });*/
			 /*   .otherwise({
				  redirectTo: '/',
				   templateUrl: 'message.html',
				  controller: function ($scope) {
						$scope.message = 'Welcome!!';
					}
				}); */
		}],
		['$locationProvider', function($locationProvider) {
				$locationProvider.html5Mode(true);			
		}]
	);


/**
*
* Status ==> Negi Sir
*
**/	

	_modUeyeApp.directive('imageonload', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.bind('load', function() {
					element.parent().find('i').addClass('fadeOut');
					element.removeClass('fadeOut');
					//call the function that was passed
					//scope.$apply(attrs.imageonload);
				});
			}
		};
	});



/**
*
* To get parameter name from URL
* Status ==> All done
*
**/
	
	function getParameterByName(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	

/**
*
* This is just a DEMO service created for testing.
* Status ==> Done
*
**/
	
	_modUeyeApp.service('MathService', function() {
		this.add = function(a, b) { return a + b; };		
		this.subtract = function(a, b) { return a - b; };		
		this.multiply = function(a, b) { return a * b; };		
		this.divide = function(a, b) { return a / b; };
	});

	
/**
*
* To create utility (Global) function/variables to be used anywhere inside _modUeyeApp (in any controller)
* @MathService ==> already created service (DEMO)
* Status ==> Done
*
**/	
	_modUeyeApp.service('urlServices', function(MathService){
		this.baseUrl = $url;
		this.modelUrl = this.baseUrl+"/models";		
		this.viewsUrl = this.baseUrl+"/views";
		this.assetsUrl = this.baseUrl+"/assets";
		this.jsUrl = this.assetsUrl+"/js";
		this.cssUrl = this.assetsUrl+"/css";
		this.imagesUrl = this.assetsUrl+"/images";
		this.square = function(a) { return MathService.multiply(a,a); };
	});	

	
/**
*
* Ueye Service contains all the common function which may be required in more then one controller
* @urlServices ==> already created service
* Status ==> Done
*
**/
	_modUeyeApp.service('Ueye', function(urlServices){
		this.array_unique = function(arr) {
							var result = [];
							for (var i = 0; i < arr.length; i++) {
								if (result.indexOf(arr[i]) == -1) {
									result.push(arr[i]);
								}
							}
							return result;
						};						

/**
*
* To get list of all platforms
* @data ==> it contains all contents of model 'portfolio.json'
* Status ==> Done
**/	
		this.getPlatform = function(data) {
						var log = [];
						angular.forEach(data, function(value, key) {
							angular.forEach(value.developed_in, function(v, k) {
								this.push(v.pf);
							}, log);
						});						
						return this.array_unique(log);
					}
	});	
 
