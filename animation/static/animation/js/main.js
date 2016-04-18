

//BG ANIMATIONS START
var e = document.body,
    counterUp = 0,
    counterDown = 0,
    translateValue = 0,
    events = 0,
    bg = $('.c-brewing-background'),
    fg = $('.c-brewing-foreground'),
    fgBg = [bg, fg],
    mouse = $('.c-mouse'),
    ev =$('.events').text(events);

// Set the transform value with tweenMax at beginning
TweenMax.set(fgBg, {transform: "translate3d(10px, 0px, 0px)"});
TweenMax.set(mouse, {transform: "translate3d(2210px, 0px, 0px)"});

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
    TweenMax.allTo(fgBg, 2, {transform: "translate3d(" + translateValue + "px, 0px, 0px)", onStart:tweenStart, onUpdate:$.throttle( 510, checkPosition)});
    checkBgPosition(n);
}

function checkPosition() {
    //Check the current transform value
    var n = parseInt(bg.css('transform').split(',')[4]);
    if (n < -7800) {
        translateValue = n + 8000;
        TweenMax.set(fgBg, {transform: "translate3d(" + translateValue + "px, 0px, 0px)"});
    } else if(n > 200) {
        translateValue = n - 8000;
        TweenMax.set(fgBg, {transform: "translate3d(" + translateValue + "px, 0px, 0px)"});
    }
    checkBgPosition(n);
    consoleLog('One scroll');
    consoleLog('n:' + n);
}

jQuery('.c-brewing-background-inner')
    .bind('move', function(e) {
        // move background horizontally
        var n = parseInt(bg.css('transform').split(',')[4]);
        TweenMax.set(fgBg, {transform: "translate3d(" + (n + e.deltaX) + "px, 0px, 0px)"});
        consoleLog('n:' + n + ' deltaX' + e.deltaX);
        checkBgPosition(n);
    })
    .bind('moveend', function() {
        checkPosition();
    });

var n = parseInt(bg.css('transform').split(',')[4]);
consoleLog('n:' + n);
//BG ANIMATIONS END


//INFORMATIVE FUNCTIONS

function consoleLog(e) {
    console.log(e);
}

//used to log the tween events at a time

function finishedTween() {
    events--;
    ev.text(events);
}

function tweenStart() {
    setTimeout( function(){
        finishedTween();
    }, 2000);
}

function checkBgPosition(n) {
    $('.bg-position').text(n);
}

//INFORMATIVE FUNCTIONS END

// ANIMATIONS FOREGROUND START


TweenMax.to(mouse, 2, {transform: "translate3d(2600px, 0px, 0px)", repeat:10 , yoyo:true, ease: Power0.easeNone, onRepeat:switchBackground} );

// Change background image according to animation direction
function switchBackground() {
    consoleLog('repeat');
    if (mouse.hasClass('right')) {
        mouse.removeClass('right');
    }
    else {
        mouse.addClass('right');
    }
}
// ANIMATIONS FOREGROUND END