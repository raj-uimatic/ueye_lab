
_modUeyeApp.controller('PortfolioListController', function($scope, $http, $timeout, cfpLoadingBar, $location, urlServices, Ueye) {
    var portfolioList = this;
    $scope.siteUrl = $url;
    $scope.UrlFilter = getParameterByName('p');
    cfpLoadingBar.start();
	$scope.row = true;  // to show/hide default contents on index page
	
    $http.get(urlServices.modelUrl+'/portfolio.json').success(function(data, status, headers, config) {
        //console.log(data);
        $scope.distinctPlateform = Ueye.getPlatform(data);
        $scope.portfolioList = data;
        cfpLoadingBar.complete();
    }).error(function(data, status, headers, config) {
        alert('Error while fetching records');
        cfpLoadingBar.complete();
    });



/**
*
* Status ==> Negi Sir
*
**/	

    $scope.imageLoaded = function(el) {
        $scope.sourceLoaded = true;
    }
	

/**
*
* Status ==> Negi Sir (not in use, has been replaced by $scope.urlFilterPf)
*
**/	

    $scope.filterPortfolio = function($index) {
        if ($location.url()) {
            var q = (($location.url()).split('=')[1]).split(',');
            var val = 0;
            for (var i = 0; i < (q.length); i++) {
                if (q[i] == $index) {
                    val = $index;
                }
            }
            return val;
        } else {
            return $index;
        }
    }
	

/**
*
* To apply filters on portfolio page by passing filter data in URL
* Status ==> Requires testing and optimization
*
**/

	$scope.urlFilterPf = function($id,$pf) {
		var urlFilterData = getParameterByName('p').split(',');
		urlFilterData = urlFilterData.filter(Boolean);
		if(urlFilterData.length < 1){
			$scope.showFilter = function(){ return true; };
			return true;
		}else{
			$scope.showFilter = function(){ return false; };
		}
		var status1 = urlFilterData.indexOf($id) > -1 ? true : false;
		if(status1){
			return true;
		}else{	
			var status2 = false;
			angular.forEach($pf,function(v,k){			
				if(urlFilterData.indexOf(v.pf) > -1){
					status2 = true;				
				}
			});
		}
		if(status2){
			return true;		
		}else{
			return false;		
		}		
    }
	
	
/**
*
* To get protfolioId to be used in portfolio-details page
* Status ==> Requires testing
*
**/	

	var isQueryString = $location.absUrl().indexOf("?");	
	//$scope.portfolioID  = (isQueryString < 0) ? $location.path().split('/').pop() : getParameterByName('pid'); // to be used if we are using both angular-routing ( don not refresh browser) and regular redirection with query string	
	$scope.portfolioID  = $location.path().split('/').pop(); // to be used if only angular-routing is used because it does not support query string
	//$scope.portfolioID = getParameterByName('pid'); // to be used if page gets refreshed (regular redirection with query string)
	

/**
* Smooth redirect
* Status ==> Requires testing and still working on it
**/

	$scope.$on('$routeChangeStart', function(scope, next, current){
		// loader code will be added here
		// $scope.sourceLoaded = true;
	});

	$scope.$on('$routeChangeSuccess', function(scope, next, current){
		if(typeof(next) === 'undefined'){
			$scope.row = true;
		}else{
			$scope.row = false;
		}
	});
	
});