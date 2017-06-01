app.controller('producersCtrl', function ($scope, $modal, $filter, Data) {
    $scope.producer = {};

    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.myInterval=3000;
    $scope.pageChangeHandler = function(num) {

    };

	Data.get('producers').then(function(data){
        $scope.producers = data.data;
    });

    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/producer.html',
          controller: 'producerViewCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
    };

    Data.get('country').then(function(data){
	        $scope.country = data.data;
	    });

			$scope.countryChange = function(){
        $scope.regionOption="";
        if($scope.countryOption!=null)
        {
          Data.get('regionsData/'+$scope.countryOption.countryID).then(function(data){
                $scope.region = data.data;
            });
            $(".regiondiv").show();
        }
        else {
              $(".regiondiv").hide();
            }
	    };
});

app.controller('producerViewCtrl', function ($scope, $modalInstance, item, Data) {
		$scope.p = angular.copy(item);

        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.title = 'View Producer';

});
