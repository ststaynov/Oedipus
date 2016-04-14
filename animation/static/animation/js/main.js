

//Animation Development
var e = document.body,
    counterUp = 0,
    counterDown = 0,
    translateValue = 0,
    events = 0,
    bg = $('.c-brewing-background'),
    ev =$('.events').text(events);

TweenMax.set(bg, {transform: "translate3d(10px, 0px, 0px)"});

// Keep the scroll execution limited to 80 miliseconds with $.throttle ^ keeps the events limited to max ~20 at a time
$('body').bind('DOMMouseScroll mousewheel', $.throttle( 80, scrolling ));

function scrolling (s){
    events++;
    ev.text(events);

    //Keep track of the scrolling events
    if(s.originalEvent.wheelDelta /120 > 0) {
        $('.up').text(counterUp);
        counterUp++;
        moveBackground(f="forward");
    }
    else {
        $('.down').text(counterDown);
        counterDown++;
        moveBackground();
    }
}

function moveBackground(f) {
    r = f==="forward" ? translateValue = translateValue + 200 : translateValue = translateValue - 200;
    TweenMax.to($('.c-brewing-background'), 2, {transform: "translate3d(" + translateValue + "px, 0px, 0px)", onStart:tweenStart, onUpdate:$.throttle( 1010, checkPosition)});
}

function tweenStart() {
    setTimeout( function(){
        finishedTween();
    }, 2000);
}

//used to log the tween events at a time
function finishedTween() {
    events--;
    //console.log("Tween Finished");
    ev.text(events);
}

function checkPosition() {
    //Check the current transform value
    var n = parseInt(bg.css('transform').split(',')[4]);
    if (n < -7800) {
        translateValue = n + 8000;
        TweenMax.set(bg, {transform: "translate3d(" + translateValue + "px, 0px, 0px)"});
    } else if(n > 200) {
        translateValue = n - 8000;
        TweenMax.set(bg, {transform: "translate3d(" + translateValue + "px, 0px, 0px)"});
    }
    console.log('One scroll');
    console.log('n:' + n);
}

jQuery('.c-brewing-background-inner')
    .bind('move', function(e) {
        // move .mydiv horizontally
        var n = parseInt(bg.css('transform').split(',')[4]);
        TweenMax.set(bg, {transform: "translate3d(" + (n + e.deltaX) + "px, 0px, 0px)"});
        console.log('n:' + n + ' deltaX' + e.deltaX);
    })
    .bind('moveend', function() {
        checkPosition();
    });

var n = parseInt(bg.css('transform').split(',')[4]);
console.log('n:' + n);