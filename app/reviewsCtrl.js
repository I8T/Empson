
app.controller('reviewsCtrl', function ($scope, $modal, $filter, Data) {
  $(function() {


            $( "#slider-3" ).slider({
               range:true,
               min: 1990,
               max: 2016,
               values: [ 2001, 2009 ],
               slide: function( event, ui ) {
                  $( "#price" ).val( "" + ui.values[ 0 ] + "-" + ui.values[ 1 ] );
               }
            });
            $( "#price" ).val( "" + $( "#slider-3" ).slider( "values", 0 ) +
               " - " + $( "#slider-3" ).slider( "values", 1 ) );

            $( "#slider-4" ).slider({
               range:true,
               min: 0,
               max: 100,
               values: [ 0, 100 ],
               slide: function( event, ui ) {
                  $( "#score" ).val( "" + ui.values[ 0 ] + " - " + ui.values[ 1 ] );
               }
            });

            $( "#score" ).val( "" + $( "#slider-4" ).slider( "values", 0 ) +
               " - " + $( "#slider-4" ).slider( "values", 1 ) );

            $( "#datepicker-8" ).datepicker({
              viewMode: 'years',
               format: 'MM yyyy'
            });

            $( "#datepicker-9" ).datepicker({
                viewMode: 'years',
               format: 'MM yyyy'
            });
         });

         //slider

         //dateChange
        //  var maxdate,mindate;
        //  $scope.rangeDateReview=function(minDate,maxdate)
        //  {
        //          Data.get('rangeReviews'+maxdate+maxdate).then(function(data){
        //             $scope.reviews = data.data;
        //         }).finally(function () {
        //         $scope.loading = false;
        //       });
        //  }
         //
        //  $scope.$watch('maxdate',function()
        //  {
         //
        //    maxdate=$scope.maxdate;
        //    $scope.rangeDateReview(mindate,maxdate);
         //
        //  })
        //  $scope.$watch('mindate',function()
        //  {
         //
        //    mindate=$scope.mindate;
        //    $scope.rangeDateReview(mindate,maxdate);
         //
        //  })



       $scope.getVintageOpt=function()
         {
           var vintageselected=angular.element('#price').val(),
           data=vintageselected.split("-");
           $scope.minValue=data[0];
           $scope.maxValue=data[1];
         }
         $scope.getVintageOpt();
         $scope.loading = true;

         //Score data

         $scope.clikedScore=function()
         {
           var scoreselected=angular.element('#score').val(),
           data=scoreselected.split("-");
           $scope.minScore=data[0];
           $scope.maxScore=data[1];
         }
         $scope.clikedScore();

         Data.get('reviews').then(function(data){
            $scope.reviews = data.data;
    		}).finally(function () {
    		$scope.loading = false;
    	});
/****************pagination******************/
  $scope.filteredReviews = [];
  $scope.currentPage = 1;
  $scope.numPerPage = 5;
  $scope.maxSize = 3;
    //pagination

    $scope.curPage = 0;
    $scope.pageSize = 10;

    $scope.numberOfPages = function(rlength) {
        if(rlength)
        {
          return Math.ceil(rlength/$scope.pageSize);
        }
			};
    //End of pagination

 /****************pagination******************/
	Data.get('distinctProducers').then(function(data){
        $scope.producers = data.data;
    });

	Data.get('distinctVintages').then(function(data){
        $scope.vintages = data.data;
    });

	Data.get('distinctScores').then(function(data){
        $scope.scores = data.data;
    });

		Data.get('country').then(function(data){
	        $scope.country = data.data;
	    });

			$scope.countryChange = function(id,name){
        $scope.selectedcountry=name;

					Data.get('regionsData/'+id).then(function(data){
								$scope.region = data.data;

				});

	    };

      $scope.selectedRegion=function(name)
      {
        $scope.selectedregion=name;
      }
			//reviews
			Data.get('wineryVisits').then(function(data){
							$scope.winery = data.data;
					}).finally(function () {
					$scope.loading = false;
				});

		//Wine Data
			$scope.wineData=function(wineryName,name)
			{
        $scope.selectedwinery=name;

				Data.get('winesdata/'+wineryName).then(function(data){
			        $scope.wines = data.data;
			    });
			}
      //selected wine
      $scope.clickedwine=function(name)
      {
        $scope.selectedwine=name;
      }
	     $scope.open = function (w,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/wines.html',
          controller: 'wineViewCtrl',
          size: size,
          resolve: {
            item: function () {
              return w;
            }
          }
        });
    };

    //publication data
    Data.get('publication').then(function(data){
            $scope.publication = data.data;
        }).finally(function () {
        $scope.loading = false;
      });
      $scope.clickedpublication=function(id)
      {
        $scope.selectedpublicaton=id;
      }


});

/******Wine View Controller*******/
app.controller('wineViewCtrl', function ($scope, $sce, $modalInstance, item, Data) {

  $scope.wine = angular.copy(item);
  $scope.wineDescription = $sce.trustAsHtml($scope.wine.description)

	$scope.cancel = function () {
		$modalInstance.dismiss('Close');
	};
    $scope.title = 'Wine';
});

/******Pagination Filtration**********/
app.filter('pagination', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

/****Score Filtration***********/
app.filter('filterScore', function() {
    return function(reviews,min,max) {
      var filtered=[];
      angular.forEach(reviews, function(review) {
          if( review.score >= min && review.score <= max ) {
              filtered.push(review);
          }
      });
      return filtered;
  }
});

/****Vintage Filtration***********/
app.filter('filterVintage', function() {
    return function(reviews,minYear,maxYear) {
      var filteredVintages=[];
      angular.forEach(reviews, function(review) {
          if( review.vintage >= minYear && review.vintage <= maxYear ) {
              filteredVintages.push(review);
          }
      });
      return filteredVintages;
  }
});
