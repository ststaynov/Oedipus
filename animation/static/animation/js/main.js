

/* BG ANIMATIONS START */
var e = document.body,
    counterUp = 0,
    counterDown = 0,
    translateValue = 0,
    events = 0,
    bg = $('.c-brewing-background'),
    fg = $('.c-brewing-foreground'),
    btl = $('.c-beer-bottle'),
    btlContainer = $('.c-beer-bottle-container'),
    navLine = $('.e-navigation-line'),
    fgBg = [bg, fg, btlContainer],
    mouse = $('.c-mouse'),
    btlnav = $('.e-navigation-bottle'),
    ev = $('.events').text(events);

/* set the transform value with tweenMax at beginning */
TweenMax.set(fgBg, {transform: "translate3d(10px, 0px, 0px)"});
TweenMax.set(mouse, {transform: "translate3d(2210px, 0px, 0px)"});

/* hinds & hanlers */
/* keep the scroll execution limited to 80 miliseconds with $.throttle ^ keeps the events limited to max ~20 at a time */
$('body').bind('DOMMouseScroll mousewheel', $.throttle( 80, scrolling ));
$( window ).resize(function() {
    animateNavigation(translateValue);
});

function scrolling(s) {
    events+=2;
    ev.text(events);

    /* Keep track of the scrolling events */
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
    animateNavigation(translateValue);
    TweenMax.allTo(fgBg, 2, {transform: "translate3d(" + translateValue + "px, 0px, 0px)", onStart:tweenStart, onUpdate:$.throttle( 510, checkPosition)});
    TweenMax.to(btl, 2, {transform: "translate3d(" + -translateValue + "px, 0px, 0px)", onStart:tweenStart, onUpdate:$.throttle( 510, checkPosition)});
    checkBgPosition(n);
}

function checkPosition() {
    /* Check the current transform value */
    var n = parseInt(bg.css('transform').split(',')[4]);
    if (n < -7800) {
        translateValue = n + 8000;
        TweenMax.set(fgBg, {transform: "translate3d(" + translateValue + "px, 0px, 0px)"});
        TweenMax.set(btl, {transform: "translate3d(" + -translateValue + "px, 0px, 0px)"});
        btlNavigationSet(translateValue);
    } else if (n > 200) {
        translateValue = n - 8000;
        TweenMax.set(fgBg, {transform: "translate3d(" + translateValue + "px, 0px, 0px)"});
        TweenMax.set(btl, {transform: "translate3d(" + -translateValue + "px, 0px, 0px)"});
        btlNavigationSet(translateValue);
    }
    checkBgPosition(n);
    // consoleLog('One scroll');
    // consoleLog('n:' + n);
}

jQuery('.c-brewing-background-inner')
    .bind('move', function(e) {
        // move background horizontally
        var n = parseInt(bg.css('transform').split(',')[4]);
        TweenMax.set(fgBg, {transform: "translate3d(" + (n + e.deltaX) + "px, 0px, 0px)"});
        TweenMax.set(btl, {transform: "translate3d(" + -(n + e.deltaX) + "px, 0px, 0px)"});
        // consoleLog('n:' + n + ' deltaX' + e.deltaX);
        checkBgPosition(n);
        animateNavigation(n + e.deltaX);
    })
    .bind('moveend', function() {
        checkPosition();
        translateValue = n;
    });

var n = parseInt(bg.css('transform').split(',')[4]);
// consoleLog('n:' + n);
/* BG ANIMATIONS END */


/* INFORMATIVE FUNCTIONS */

function consoleLog(e) {
    console.log(e);
}

/* used to log the tween events at a time */

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

/* INFORMATIVE FUNCTIONS END */

/* FOREGROUND ANIMATIONS START */


TweenMax.to(mouse, 3, {transform: "translate3d(2600px, 0px, 0px)", repeat:-1 , yoyo:true, ease: Power0.easeNone, onRepeat:switchDirection});

/* change background image according to animation direction */
function switchDirection() {
    if (mouse.hasClass('right')) {
        mouse.removeClass('right');
    }
    else {
        mouse.addClass('right');
    }
}

/* FOREGROUND ANIMATIONS END */

/* NAVIGATION ANIMATIONS START */
var percentToTravel = 0;
var roadToTravel = 0;
var maxroad = 0;

function animateNavigation(value) {
    maxroad = parseInt(navLine.css('width'));
    /* calculate what is value from 100% (8000px) ^ calculate what is the road to pass for the percent that we get */
    percentToTravel = parseInt(-value/80);
    roadToTravel = (maxroad/100) * percentToTravel;
    TweenMax.to(btlnav, 2, {left: roadToTravel + "px", ease: Power0.easeNone});
    // consoleLog(percentToTravel);
}

function btlNavigationSet(translateValue) {
    if (translateValue < 0) {
        TweenMax.set(btlnav, {left: maxroad + "px"});
    }
    else if (translateValue > 0) {
        TweenMax.set(btlnav, {left: "0px"});
    }
    // consoleLog(roadToTravel);
}

/* NAVIGATION ANIMATIONS END*/