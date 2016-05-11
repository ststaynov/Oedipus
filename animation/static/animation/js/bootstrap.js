/**
 * Created by stoyans on 10/05/16.
 */

var elem = document.querySelector('.grid');

// element argument can be a selector string
//   for an individual element
var msnry = new Masonry( '.grid', {

      itemSelector: '.grid-item',
      columnWidth: '.grid-item',
      percentPosition: true,
      transitionDuration: 0
});



