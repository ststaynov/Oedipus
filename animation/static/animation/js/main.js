

/* BG ANIMATIONS START */
var e = document.body,
    counterUp = 0,
    counterDown = 0,
    translateValue = 0,
    events = 0,
    $bg = $('.c-brewing-background'),
    $fg = $('.c-brewing-foreground'),
    $btl = $('.c-action'),
    $btlContainer = $('.c-action-container'),
    $navLine = $('.e-navigation-line'),
    fgBg = [$bg, $fg, $btlContainer],
    $mouse = $('.c-mouse'),
    $millmash = $('.c-milling-mashing'),
    $btlnav = $('.e-navigation-bottle'),
    $fl = ('.c-flying-lemon');
    $ev = $('.events').text(events);

/* set the transform value with tweenMax at beginning & transform all initial components to their places*/
TweenMax.set(fgBg, {transform: "translate3d(10px, 0px, 0px)"});
TweenMax.set($mouse, {transform: "translate3d(2010px, 175px, 0px)"});
TweenMax.set($millmash, {transform: "translate3d(790px, 78px, 0px)"});
TweenMax.set($fl, {transform: "translate3d(1507px, 400px, 0px)"});


/* hinds & hanlers */
/* keep the scroll execution limited to 80 miliseconds with $.throttle ^ keeps the events limited to max ~20 at a time */
$('body').bind('DOMMouseScroll mousewheel', $.throttle( 80, scrolling ));
$( window ).resize(function() {
    animateNavigation(translateValue);
    setNavStepPoints();
});

function scrolling(e) {

    events+=2;
    $ev.text(events);
    /* Keep track of the scrolling events */
    if(e.originalEvent.wheelDelta /120 > 0 || e.originalEvent.detail < 0) {
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

    TweenMax.allTo(fgBg, 2, {transform: "translate3d(" + translateValue + "px, 0px, 0px)", onStart:tweenStart});
    TweenMax.to($btl, 2, {transform: "translate3d(" + -translateValue + "px, 0px, 0px)", onStart:tweenStart, onUpdate:$.throttle( 510, checkPosition)});
    displayBgPosition(n);
}

function checkPosition() {
    /* Check the current transform value */
    consoleLog('checkPosition;');
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


TweenMax.to($mouse, 3, {transform: "translate3d(2400px, 175px, 0px)", repeat:-1 , yoyo:true, ease: Power0.easeNone, onRepeat:switchDirection});

/* change background image according to animation direction */
function switchDirection() {
    if ($mouse.hasClass('right')) {
        $mouse.removeClass('right');
    }
    else {
        $mouse.addClass('right');
    }
}

var animBreakPoint1 = -300;

function checkbeerBottleState(n) {
    if (n < animBreakPoint1) {
        $btl.addClass('milled-mashed');
    }
    else if (n > animBreakPoint1) {
        $btl.removeClass('milled-mashed');
    }
}
/* FOREGROUND ANIMATIONS END */

/* NAVIGATION ANIMATIONS START */
var percentToTravel = 0;
var roadToTravel = 0;
var maxroad = 0;

animateNavigation(0);
function animateNavigation(value) {
    maxroad = parseInt($navLine.css('width'));
    /* calculate what is value from 100% (8000px) ^ calculate what is the road to pass for the percent that we get */
    percentToTravel = parseInt(-value/77);
    roadToTravel = (maxroad/100) * percentToTravel;
    if(roadToTravel < -12) { // Keep nav bottle from overthrowing its endpoint
        TweenMax.to($btlnav, 2, {left: -12 + "px", ease: Power4.easeNone});
    } else {
        TweenMax.to($btlnav, 2, {left: roadToTravel + "px", ease: Power0.easeNone});
    }// consoleLog('percentToTravel: ' + percentToTravel);
    // consoleLog('translateValue: ' + value);
}

function btlNavigationSet(translateValue) {
    // fores only if it is time to change the film
    // FIRES ALWAYS
    percentToTravel = parseInt(-translateValue / 80);
    s = (maxroad/100) * percentToTravel;
    consoleLog('set to '+ s);
    if(s < -12) {
        TweenMax.set($btlnav, {left: -12 + "px"});
    } else {
        TweenMax.set($btlnav, {left: s + "px"});
    }
    //Something like this should work
    // if(s < -12 && s > -30 ) {
    //     TweenMax.set($btlnav, {left: -12 + "px"});
    // } else {
    //     TweenMax.set($btlnav, {left: s + "px"});
    // }
}

var $pS1 = $('.e-step-1'),
    $pS2 = $('.e-step-2'),
    $pS3 = $('.e-step-3'),
    $pS4 = $('.e-step-4'),
    $pS5 = $('.e-step-5'),
    $points = [$pS1,$pS2,$pS3,$pS4,$pS5];

setNavStepPoints();
function setNavStepPoints() {
    var difference = maxroad / 4;
    var sum = 0;
    for (i = 0; i < 5; i++){
        TweenMax.to($points[i], 0, {left: sum + "px", ease: Power0.easeNone});
        sum = sum + difference;
    }
}
/* NAVIGATION ANIMATIONS END*/