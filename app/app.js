var app = angular.module('empsonApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate', 'iso.directives', 'angularUtils.directives.dirPagination', 'smart-table']);
app.controller('homeCtrl',function($scope){
  $scope.menudata=[{
    'menu':'Home',
    'link':'#',
  },
  {
    'menu':'Portfolio',
    'link':'#/portfolio',
  },
  {
    'menu':'Reviews',
    'link':'#/reviews',
  },
  {
    'menu':'About',
    'link':'#/about',
  },
  {
    'menu':'Contact',
    'link':'#/contact',
  },
];
//active menu dynamically
  $scope.activeMenu = $scope.menudata[0].menu;
  $scope.setActive = function(menuItem) {
      $scope.activeMenu = menuItem;
   }
});
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
		when('/', {title: 'Home', templateUrl: 'partials/landing.html', controller: 'landingCtrl'}).
		when('/about', {title: 'About', templateUrl: 'partials/about.html'}).
		when('/privacy', {title: 'Privacy Policy', templateUrl: 'partials/privacy.html'}).
		when('/terms', {title: 'Terms & Conditions', templateUrl: 'partials/terms-conditions.html'}).
		when('/contact', {title: 'Contact Us', templateUrl: 'partials/contact-us.html'}).
		when('/news', {title: 'News', templateUrl: 'partials/news.html', controller: 'newsCtrl'}).
		when('/winery/:id', {title: 'Winery', templateUrl: 'partials/winery.html', controller: 'wineryCtrl'}).
		when('/winery-visits', {title: 'Winery Visits', templateUrl: 'partials/winery-visits.html', controller: 'wineryVisitsCtrl'}).
		when('/my-winery-visits/:id', {title: 'Winery Visits', templateUrl: 'partials/my-winery-visits.html', controller: 'wineryVisitsCtrl'}).
		when('/portfolio', {title: 'Portfolio', templateUrl: 'partials/portfolio.html', controller: 'producersCtrl'}).
		when('/reviews', {title: 'Reviews', templateUrl: 'partials/reviews.html', controller: 'reviewsCtrl'}).
		when('/calendar', {title: 'Calendar', templateUrl: 'partials/calendar.html'}).
		when('/where-to-buy', {title: 'Where to Buy', templateUrl: 'partials/where-to-buy.html', controller: 'whereToBuyCtrl'}).
		when('/sales-tools', {title: 'Sales Tools', templateUrl: 'partials/sales-tools.html'}).
		when('/build-sell-sheet', {title: 'Build Sell Sheet', templateUrl: 'partials/build-sell-sheet.html'}).
		otherwise({redirectTo: '/'});;
}])
.filter('unique', function() {
    return function(input, key) {
        var unique = {};
        var uniqueList = [];
        for(var i = 0; i < input.length; i++){
            if(typeof unique[input[i][key]] == "undefined"){
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
})
.filter('removeSpaces', [function() {
    return function(string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '');
    };
}])
.filter('html',function($sce){
    return function(input){
        return $sce.trustAsHtml(input);
    }
});


jssor_1_slider_init = function() {
  alert("hello");

    var jssor_1_options = {
      $AutoPlay: true,
      $AutoPlaySteps: 4,
      $SlideDuration: 160,
      $SlideWidth: 200,
      $SlideSpacing: 3,
      $Cols: 4,
      $ArrowNavigatorOptions: {
        $Class: $JssorArrowNavigator$,
        $Steps: 4
      },
      $BulletNavigatorOptions: {
        $Class: $JssorBulletNavigator$,
        $SpacingX: 1,
        $SpacingY: 1
      }
    };

    var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);

    /*responsive code begin*/
    /*you can remove responsive code if you don't want the slider scales while window resizing*/
    function ScaleSlider() {
        var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
        if (refSize) {
            refSize = Math.min(refSize, 809);
            jssor_1_slider.$ScaleWidth(refSize);
        }
        else {
            window.setTimeout(ScaleSlider, 30);
        }
    }
    ScaleSlider();
    $Jssor$.$AddEvent(window, "load", ScaleSlider);
    $Jssor$.$AddEvent(window, "resize", ScaleSlider);
    $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
    /*responsive code end*/
};
