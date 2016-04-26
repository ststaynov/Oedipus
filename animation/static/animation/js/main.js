

/* BG ANIMATIONS START */
var e = document.body,
    counterUp = 0,
    counterDown = 0,
    translateValue = 0,
    events = 0,
    $bg = $('.c-brewing-background'),
    $fg = $('.c-brewing-foreground'),
    $btl = $('.c-beer-bottle'),
    $btlContainer = $('.c-beer-bottle-container'),
    $navLine = $('.e-navigation-line'),
    fgBg = [$bg, $fg, $btlContainer],
    $mouse = $('.c-mouse'),
    $millmash = $('.c-milling-mashing'),
    $btlnav = $('.e-navigation-bottle'),
    $fl = ('.c-flying-lemon');
    $ev = $('.events').text(events);

/* set the transform value with tweenMax at beginning & transform all initial components to their places*/
TweenMax.set(fgBg, {transform: "translate3d(10px, 0px, 0px)"});
TweenMax.set($mouse, {transform: "translate3d(2210px, 0px, 0px)"});
TweenMax.set($millmash, {transform: "translate3d(847px, 400px, 0px)"});
TweenMax.set($fl, {transform: "translate3d(1507px, 400px, 0px)"});


/* hinds & hanlers */
/* keep the scroll execution limited to 80 miliseconds with $.throttle ^ keeps the events limited to max ~20 at a time */
$('body').bind('DOMMouseScroll mousewheel', $.throttle( 80, scrolling ));
$( window ).resize(function() {
    animateNavigation(translateValue);
});

function scrolling(s) {

    events+=2;
    $ev.text(events);

    /* Keep track of the scrolling events */
    consoleLog(s.originalEvent.wheelDelta);
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

    TweenMax.allTo(fgBg, 2, {transform: "translate3d(" + translateValue + "px, 0px, 0px)", onStart:tweenStart, onUpdate:$.throttle( 1510, checkPosition)});
    TweenMax.to($btl, 2, {transform: "translate3d(" + -translateValue + "px, 0px, 0px)", onStart:tweenStart, onUpdate:$.throttle( 1510, checkPosition)});
    displayBgPosition(n);
}

function checkPosition() {
    /* Check the current transform value */
    var n = parseInt($bg.css('transform').split(',')[4]);
    if (n < -7800) {
        /* sets new position at the start of the film  */
        translateValue = n + 8000;
        TweenMax.set(fgBg, {transform: "translate3d(" + translateValue + "px, 0px, 0px)"});
        TweenMax.set($btl, {transform: "translate3d(" + -translateValue + "px, 0px, 0px)"});
        btlNavigationSet(translateValue);
        checkbeerBottleState(translateValue);
    } else if (n >= 200) {
        /* sets new position at the end of the film  */
        translateValue = n - 8000;
        TweenMax.set(fgBg, {transform: "translate3d(" + translateValue + "px, 0px, 0px)"});
        TweenMax.set($btl, {transform: "translate3d(" + -translateValue + "px, 0px, 0px)"});
        btlNavigationSet(translateValue);
        checkbeerBottleState(translateValue);
    } else {
        checkbeerBottleState(n);
    }
    displayBgPosition(n);
}

jQuery('.c-brewing-background-inner')
    .bind('move', function(e) {
        // move background horizontally
        var n = parseInt($bg.css('transform').split(',')[4]);
        TweenMax.set(fgBg, {transform: "translate3d(" + (n + e.deltaX) + "px, 0px, 0px)"});
        TweenMax.set($btl, {transform: "translate3d(" + -(n + e.deltaX) + "px, 0px, 0px)"});
        checkbeerBottleState(n);
        displayBgPosition(n);
        animateNavigation(n + e.deltaX);
    })
    .bind('moveend', function() {
        var n = parseInt($bg.css('transform').split(',')[4]);
        translateValue = n;
        checkPosition();
    });

var n = parseInt($bg.css('transform').split(',')[4]);
/* BG ANIMATIONS END */


/* INFORMATIVE FUNCTIONS */

function consoleLog(e) {
    console.log(e);
}

/* used to log the tween events at a time */

function finishedTween() {
    events--;
    $ev.text(events);
}

function tweenStart() {
    setTimeout( function(){
        finishedTween();
    }, 2000);
}

function displayBgPosition(n) {
    $('.bg-position').text(n);
}

/* INFORMATIVE FUNCTIONS END */

/* FOREGROUND ANIMATIONS START */


TweenMax.to($mouse, 3, {transform: "translate3d(2600px, 0px, 0px)", repeat:-1 , yoyo:true, ease: Power0.easeNone, onRepeat:switchDirection});

/* change background image according to animation direction */
function switchDirection() {
    if ($mouse.hasClass('right')) {
        $mouse.removeClass('right');
    }
    else {
        $mouse.addClass('right');
    }
}

function checkbeerBottleState(n) {
    if (n < -300) {
        $btl.addClass('milled-mashed');
    }
    else if (n > -300) {
        $btl.removeClass('milled-mashed');
    }
}
/* FOREGROUND ANIMATIONS END */

/* NAVIGATION ANIMATIONS START */
var percentToTravel = 0;
var roadToTravel = 0;
var maxroad = 0;

function animateNavigation(value) {
    maxroad = parseInt($navLine.css('width'));
    /* calculate what is value from 100% (8000px) ^ calculate what is the road to pass for the percent that we get */
    percentToTravel = parseInt(-value/77);
    roadToTravel = (maxroad/100) * percentToTravel;
    TweenMax.to($btlnav, 2, {left: roadToTravel + "px", ease: Power0.easeNone});
    // consoleLog('percentToTravel: ' + percentToTravel);
    // consoleLog('translateValue: ' + value);
}

function btlNavigationSet(translateValue) {
    if (translateValue < 200) {
        percentToTravel = parseInt(-translateValue/77);
        s = (maxroad/100) * percentToTravel ;
        TweenMax.set($btlnav, {left: s   + "px"});
    }
    else if (translateValue >= 200) {
        percentToTravel = parseInt(-translateValue/77);
        s = (maxroad/100) * -percentToTravel ;
        TweenMax.set($btlnav, {left: s + "px"});
    }
    // consoleLog('On Value: ' + percentToTravel);
    // consoleLog('translateValue: ' + translateValue);
}

/* NAVIGATION ANIMATIONS END*/