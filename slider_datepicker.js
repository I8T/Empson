$(window).load(function(){

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
