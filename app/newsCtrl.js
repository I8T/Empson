app.controller('newsCtrl', function ($scope, $modal, $filter, Data) {
    $scope.newsItem = {};
    Data.get('news').then(function(data){
        $scope.newsList = data.data;
    });
    
     $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Name",predicate:"name",sortable:true},
                    {text:"Link",predicate:"link",sortable:true},
                    {text:"Date",predicate:"mydate",sortable:true},
                    {text:"Hot",predicate:"isHot",sortable:true}
                ];

});
