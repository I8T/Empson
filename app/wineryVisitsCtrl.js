app.controller('wineryVisitsCtrl', function ($scope, $modal, $filter, Data) {

	Data.get('wineryVisits').then(function(data){
        $scope.wineryVisits = data.data;
    });
	$scope.open = function (wv,size) {
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

app.controller('wineryVisitViewCtrl', function ($scope, $modalInstance, item, Data) {

  $scope.wineryVisit = angular.copy(item);

	$scope.cancel = function () {
		$modalInstance.dismiss('Close');
	};
    $scope.title = 'Winery Visit';
});
