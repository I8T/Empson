app.controller('wineryCtrl', function ($scope, $window, $modal, $sce, $filter, $routeParams, Data) {
	$scope.producerName = $routeParams.id;
	$scope.hideWinery = false;
	$scope.hideReviews = true;
	$scope.hideWines = false;
	$scope.hideMap = true;
	$scope.searchText = '';
	$scope.address = "new york";

	$scope.content=[
			{
				name:'1.5 ml',
				value:'1.5ml',
			},
			{
				name:'375 ml',
				value:'375ml',
			},
			{
				name:'750 ml',
				value:'750ml',
			},
			{
			name:'Other',
			value:'',
		}
	];
	$scope.$watch('searchText', function()
	{
				if($scope.searchText.value=="")
				{
					$(".otherdiv").show();
				}
				else
				{
					$(".otherdiv").hide();
				}
  });
	var geocoder = new google.maps.Geocoder();

	//get the winery information
	Data.get('winery/'+$routeParams.id).then(function(data){
        $scope.winery = data.data[0];
		$scope.wineryDescription = $sce.trustAsHtml($scope.winery.description);
		$scope.wineryQuickFacts = $sce.trustAsHtml($scope.winery.quickFacts);
		$scope.address = $scope.winery.address;
		geocoder.geocode( { 'address': $scope.address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var latitude = results[0].geometry.location.lat();
				var longitude = results[0].geometry.location.lng();
				$window.map = new google.maps.Map(document.getElementById('map'), {
					center: {lat: latitude, lng: longitude},
					zoom: 8
				});
			}
		});
		$scope.hideMap = true;
    });

	// get the winery labels
	Data.get('wines/'+$routeParams.id).then(function(data){
        $scope.wines = data.data;
				$scope.hideWines = true;
    });

	// get the winery reviews
	Data.get('reviews/'+$routeParams.id).then(function(data){
        $scope.reviews = data.data;
    });

	// get the winery bios
	Data.get('bios/'+$routeParams.id).then(function(data){
        $scope.bios = data.data;
    });

	// get the winery maps
	Data.get('maps/'+$routeParams.id).then(function(data){
  		$scope.maps = data.data;
    });

	// get the winery labels
	Data.get('labels/'+$routeParams.id).then(function(data){
        $scope.labels = data.data;
    });

	// get the winery bottleshots
	Data.get('bottleshots/'+$routeParams.id).then(function(data){
        $scope.bottleShots = data.data;
    });

	// get the winery images
	Data.get('images/'+$routeParams.id).then(function(data){
        $scope.images = data.data;
    });

	// get the winery sellsheets
	Data.get('sellsheets/'+$routeParams.id).then(function(data){
        $scope.sellSheets = data.data;
    });
	// get the winery training cards
	Data.get('trainingcards/'+$routeParams.id).then(function(data){
        $scope.trainingCards = data.data;
    });
	// get the winery videos
	Data.get('videos/'+$routeParams.id).then(function(data){
        $scope.videos = data.data;
    });
	// get the miscellaneous pos
	Data.get('miscpos/'+$routeParams.id).then(function(data){
        $scope.miscpos = data.data;
    });
	// get the maps
	Data.get('maps/'+$routeParams.id).then(function(data){
        $scope.maps = data.data;
    });
	// get the winemaker
	Data.get('maker/'+$routeParams.id).then(function(data){
		$scope.maker = data.data;
	});


	$scope.selectWine = function (wineName)
	{
		$scope.searchText = wineName;
		$scope.selWineName = wineName;
	}

	$scope.showWines = function () {
		$scope.hideWinery = true;
		$scope.hideReviews = true;
		$scope.hideWines = false;
		$scope.hideMap = true;
		$scope.searchText = $scope.wines[0].name;
		$scope.selWineName = $scope.wines[0].name;
	}

	$scope.showMap = function () {
		$scope.hideWinery = true;
		$scope.hideReviews = true;
		$scope.hideWines = true;
		$scope.hideMap = false;
		$scope.geocoder.geocode( { "address": $scope.winery.address }, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
				var location = results[0].geometry.location;
				$window.map.panTo(location);
			}
		});

	}

	$scope.showReviews = function () {
		$scope.hideWinery = true;
		$scope.hideWines = true;
		$scope.hideReviews = false;
		$scope.hideMap = true;
	}

	$scope.showWinery = function () {
		$scope.hideWinery = false;
		$scope.hideWines = true;
		$scope.hideReviews = true;
		$scope.hideMap = true;
	}

	$scope.showMap = function () {
		$scope.hideWinery = true;
		$scope.hideWines = true;
		$scope.hideReviews = true;
		$scope.hideMap = false;

		geocoder.geocode( { 'address': $scope.address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var latitude = results[0].geometry.location.lat();
				var longitude = results[0].geometry.location.lng();
				$window.map = new google.maps.Map(document.getElementById('map'), {
					center: {lat: latitude, lng: longitude},
					zoom: 8
				});
			}
		});
	}


	$scope.openLabels = function (l,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/labels.html',
          controller: 'labelsViewCtrl',
          size: size,
          resolve: {
            item: function () {
              return l;
            }
          }
        });
    };



	$scope.openBottleShots = function (b,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/bottleshots.html',
          controller: 'bottleShotsViewCtrl',
          size: size,
          resolve: {
            item: function () {
              return b;
            }
          }
        });
    };

	$scope.openImages = function (i,size) {
		//alert(i);
        var modalInstance = $modal.open({
          templateUrl: 'partials/images.html',
          controller: 'imagesViewCtrl',
          size: size,
          resolve: {
            item: function () {
              return i;
            }
          }
        });
				//alert(i);
    };

	$scope.openSellSheets = function (s,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/sellsheets.html',
          controller: 'sellSheetsViewCtrl',
          size: size,
          resolve: {
            item: function () {
              return s;
            }
          }
        });
    };

	$scope.openTrainingCards = function (t,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/trainingCards.html',
          controller: 'trainingCardsViewCtrl',
          size: size,
          resolve: {
            item: function () {
              return t;
            }
          }
        });
    };


		/*$scope.openMaps = function (b,size) {
			//console.log(b);
					var modalInstance = $modal.open({
						templateUrl: 'partials/maps.html',
						controller: 'mapsViewCtrl',
						size: size,
						resolve: {
							item: function () {
								return b;
							}
						}
					});
			};*/

		/*$scope.openMaps = function (m,size) {
			console.log(m);
					var modalInstance = $modal.open({
						templateUrl: 'partials/maps.html',
						controller: 'labelsViewCtrl',
						size: 'lg',
						resolve: {
							item: function () {
								return m;
							}
						}
					});
			};*/

	$scope.openVideos = function (v,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/videos.html',
          controller: 'videosViewCtrl',
          size: 'lg',
          resolve: {
            item: function () {
              return v;
            }
          }
        });
    };

	$scope.openMiscPos = function (mp,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/miscpos.html',
          controller: 'miscPosViewCtrl',
          size: size,
          resolve: {
            item: function () {
              return mp;
            }
          }
        });
    };

	$scope.openBios = function (b,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/bios.html',
          controller: 'biosViewCtrl',
          size: size,
          resolve: {
            item: function () {
              return b;
            }
          }
        });
    };

	$scope.openWineryVisit = function (wv,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/my-winery-visits.html',
          controller: 'wineryVisitViewCtrl',
          size: size,
          resolve: {
            item: function () {
              return wv;
            }
          }
        });
    };
});

app.controller('labelsViewCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.labels = angular.copy(item);

	$scope.cancel = function () {
		$modalInstance.dismiss('Close');
	};
    $scope.title = 'Labels';
});

app.controller('mapsViewCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.maps = angular.copy(item);

	$scope.cancel = function () {
		$modalInstance.dismiss('Close');
	};
    $scope.title = 'Labels';
});

app.controller('bottleShotsViewCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.bottleShots = angular.copy(item);

	$scope.cancel = function () {
		$modalInstance.dismiss('Close');
	};
    $scope.title = 'Bottle Shots';
});

app.controller('imagesViewCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.images = angular.copy(item);

	$scope.cancel = function () {
		$modalInstance.dismiss('Close');
	};
    $scope.title = 'Gallery';
});

app.controller('sellSheetsViewCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.sellSheets = angular.copy(item);

	$scope.cancel = function () {
		$modalInstance.dismiss('Close');
	};
    $scope.title = 'Sell Sheets';
});

app.controller('trainingCardsViewCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.trainingCards = angular.copy(item);

	$scope.cancel = function () {
		$modalInstance.dismiss('Close');
	};
    $scope.title = 'Training Cards';
});

 app.controller('videosViewCtrl', function ($scope, $sce, $modalInstance, item, Data) {
	$scope.videos = angular.copy(item);
    $scope.cancel = function () {
		$modalInstance.dismiss('Close');
	};
    $scope.title = 'Videos';
	$scope.getVideoAsHtml = function(srcHtml) {
		return $sce.trustAsHtml(srcHtml);
	}
});

app.controller('biosViewCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.bios = angular.copy(item);

	$scope.cancel = function () {
		$modalInstance.dismiss('Close');
	};
    $scope.title = 'Bios';

});

app.controller('miscPosViewCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.miscpos = angular.copy(item);

	$scope.cancel = function () {
		$modalInstance.dismiss('Close');
	};
    $scope.title = 'Miscellaneous POS';

});
