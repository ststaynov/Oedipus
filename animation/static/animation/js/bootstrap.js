/**
 * Created by stoyans on 10/05/16.
 */

$(function() {
    'use strict';

    var elem = document.querySelector('.grid');

    // element argument can be a selector string
    //   for an individual element
    var $msnry;

    $msnry = $('#grid-items-container').masonry({
          itemSelector: '.c-quote-grid-item',
          columnWidth: '.c-quote-sizer',
          percentPosition: true
        });

    $msnry.masonry('layout');  // snap everything because padding bottom sometimes borks masonry

    console.log('working');
});

