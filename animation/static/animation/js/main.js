/* BG ANIMATIONS START */
var e = [document.body, $('.c-brewing-background-inner-right-overlay')],
    translateValue = 0,
    $bg = $('.c-brewing-background'),
    $fg = $('.c-brewing-foreground'),
    $btlContainer = $('.c-action-container'),
    $beerFill = $('svg.beer-fill.desktop'),
    $beerFillMobile = $('svg.beer-fill.mobile'),
    $pipes = $('.e-film-pipes'),
    $bottlingFill = $('.e-fill'),
    fgBg = [$bg, $fg, $btlContainer, $pipes],


    // foreground animatios
    $nipple = $('.c-nipple'),
    $meteor = $('.c-meteor'),
    $sun = $('.c-sun'),

    $btnAutoScroll = $('.c-auto-scroll-button'),
    $btnReplay = $('.replay'),
    moveObject = '',
    maxSnowFlakeCount = 0,
    loopBackwardAllowed = false,
    loopForwardAllowed = false,
    positionsArr = [],
    $thermometerNeedle = $('#needle'),
    $beerWaves = $('.beer-wave'),
    $fermentingWindow = $('.e-window'),
    bottlingContainerMoveFix = 0,
    bottlingContainerFixingPosition = 0,
    $smoke = $("#smoke circle, #smoke path"),

    // action item
    $actionItem = $('.c-action'),
    $warmBeams = $('path#e-cloud-warm-beam'), //include path so that jquery selects all TODO make warmItems per cloud so that they don't have to wait for eachother
    $coldLeftBeams = $('path#e-cloud-cold-left-beam'),
    $coldRightBeams = $('path#e-cloud-cold-right-beam'),
    $warmBeamUp = $('path#e-cloud-warm-beam-up'),
    $warmBeamUpLeft = $('path#e-cloud-warm-beam-up-left'),
    $warmBeamLeft = $('path#e-cloud-warm-beam-left'),
    $warmBeamUpRight = $('path#e-cloud-warm-beam-up-right'),
    $fermentingTank = $('g#tank'),

    colorOedipusGreen = '#a3d01a',
    colorOedipusPink = '#FF98B5',
    colorOedipusBlueDark = '#4d509b',
    colorOedipusBlue = '#4998d2',
    colorOedipusPinkDark = '#ca447f',
    oedipusColors = [colorOedipusGreen, colorOedipusPink, colorOedipusBlueDark, colorOedipusBlue, colorOedipusPinkDark],

        // //clouds
        cloudMillmashTl = new TimelineMax({repeat:-1}),
        cloudBoilingTl = new TimelineMax({repeat:-1}),
        cloudCoolingTlLeft = new TimelineMax({repeat:-1}),

    // steps
    $magicCloud = $('.c-magic-cloud.original'),
    $millmash = $('.c-milling-mashing'),
    $boiling = $('.c-boiling'),
    $cooling = $('.c-cooling-container'),
    $fermenting = $('.c-fermenting'),
    $bottling = $('.c-bottling-container'),
    $endPop = $('.c-end-pop.original'),

        // timelines per step
        boilingTl = new TimelineMax({}),
        fermentingTl = new TimelineMax({}),
        bottlingTl = new TimelineMax({});

/* set the transform value with tweenMax at beginning & transform all initial components to their places
 Have in mind that 'x:5' transforms into translate3d(5px, 0px, 0px) which is awesome and gets CPU boost*/

/* Setting things up at the beginning START */
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    positionsArr = [10, 2010,705, 107,800, -135, 1406, 2734, 4070, 5404, 6730, 7570]; //values which suit mobile screens
    bottlingContainerMoveFix = 100;
    bottlingContainerFixingPosition = -6635;
    fgBg.push($beerFillMobile);
    consoleLog('Added beerFill for mobile');
    moveObject = '.c-brewing-background-inner, .c-comment';
    maxSnowFlakeCount = 10;
} else {
    positionsArr = [10, 2010,705, 107,800, 5, 1536, 2864, 4200, 5534, 6860, 8000];
    bottlingContainerMoveFix = 400;
    bottlingContainerFixingPosition = -6500;
    fgBg.push($beerFill);
    startCloudWarmBeamsTl();
    consoleLog('Added beerFill');
    moveObject = '.c-brewing-background-inner';
    initFermentingItemsEffects();
    maxSnowFlakeCount = 20;
}

TweenMax.set(fgBg, {x: positionsArr[0]});
TweenMax.set($nipple, {x: 4650, y: 600});
TweenMax.set($sun, {x: 850, y: 0});
TweenMax.set($meteor, {x: 2000, y: 100});
// steps

TweenMax.set($magicCloud, {x: positionsArr[5]});
TweenMax.set($millmash, {x: positionsArr[6]});
TweenMax.set($boiling, {x: positionsArr[7]});
TweenMax.set($cooling, {x: positionsArr[8]});
TweenMax.set($fermenting, {x: positionsArr[9]});
TweenMax.set($bottling, {x: positionsArr[10]});
TweenMax.set($endPop, {x: positionsArr[11]});

/* Setting things up at the beginning END */


/* Setting up action item animation START */


//cloudTimeLines
function startCloudWarmBeamsTl() {
    cloudMillmashTl.staggerFromTo($warmBeams, 0.3, {opacity: 1, x: 40}, {opacity: 0, x: -50}, 0.1, "initial");

cloudBoilingTl.fromTo($warmBeamUp, 0.8, {opacity: 1, y: 20}, {opacity: 0, y: -10}, "initial")
              .fromTo($warmBeamUpLeft, 0.8, {opacity: 1, x: 5, y: 5}, {opacity: 0, x: -10, y: -30}, "initial")
              .fromTo($warmBeamUpRight, 0.8, {opacity: 1, x: -10, y: 10}, {opacity: 0, x: 10, y: -30}, "initial")
              .fromTo($warmBeamLeft, 0.8, {opacity: 1, x: 0, y: 0}, {opacity: 0, x: -30, y: 0}, "initial");
}
/* Setting up action item animation END */


function initFermentingItemsEffects() {
    var $note = $('.e-note'),
        $drum = $('.e-drum'),
        $drink = $('.e-drink'),
        $guitar = $('.e-guitar'),
        $hopsBag = $('.e-hops-bag'); // nasty but I am in a hurry

        fermentingTl.to($note, 3, {rotation: -10, repeat: -1, yoyo: true, ease: Elastic.easeOut}, "ferment")
                    .to($drum, 2, {rotation: 10, repeat: -1, yoyo: true, ease: Elastic.easeOut}, "ferment")
                    .to($drink, 3, {rotation: -10, repeat: -1, yoyo: true, ease: Elastic.easeOut}, "ferment")
                    .to($guitar, 1, {rotation: -10, repeat: -1, yoyo: true, ease: Elastic.easeOut}, "ferment")
                    .to($hopsBag, 3, {rotation: -10, repeat: -1, yoyo: true, ease: Elastic.easeOut}, "ferment");


    // Change the colors of the window
    tweenToRandomColor();
    var randomYellowColor = '#F9DF00';

    function tweenToRandomColor() {
        if (randomYellowColor == '#F9DF00') randomYellowColor = '#FFFF6A';
            else randomYellowColor = '#F9DF00';
        TweenMax.to($fermentingWindow, 4, {backgroundColor: randomYellowColor, onComplete:tweenToRandomColor});
    }


}

setInterval(function(){shakeAnimation($fermentingTank);},5000);


function shakeAnimation(element){
  TweenMax.to(element, .1, {x: -28, rotation: -1, ease: Quad.easeInOut});
  TweenMax.to(element, .1, {repeat: 4, x: 28, rotation: 1, yoyo: true, delay: .1, ease: Quad.easeInOut});
  TweenMax.to(element, .1, {x: 0, rotation: 0, delay: .1 * 4});
}



/* Setting up animation timelines per step END */


/* binds & hanlers */
/* keep the scroll execution limited to 180 miliseconds with $.throttle ^ keeps the events limited to max ~20 at a time */
$('body').bind('DOMMouseScroll mousewheel', $.throttle(180, scrolling)); // maybe use debounce as well here for the touchpad scrolling
$('body').bind('keydown', $.throttle(280, arrowBtnMove));


function scrolling(e) {
    e.preventDefault();

    // In case autoscroll was running
    if ($btnAutoScroll.hasClass('scrolling')) {
        $btnAutoScroll.removeClass('scrolling');
        stopAutoScroll();
    }

    /* Keep track of the scrolling events */
    if (e.originalEvent.wheelDelta / 120 > 0 || e.originalEvent.detail / 3) {
        moveBackground(f = "forward");
    }
    else {
        moveBackground();
    }
}

function arrowBtnMove(e) {
    e.preventDefault();
    var pressedBtnValue =  e.which;
    if (pressedBtnValue == 37) {
        moveBackground(f = "forward");
    } else if (pressedBtnValue == 39) {
        moveBackground();
    }
    consoleLog('btn number: ' + e.which + 'pressed');
}

function moveBackground(f) {
    r = f === "forward" ? translateValue = translateValue + 200 : translateValue = translateValue - 200;
    TweenMax.allTo(fgBg, 2, {x: translateValue});
    TweenMax.to($actionItem, 2, {
        x: -translateValue,
        onUpdate: $.throttle(510, checkPosition),
        onUpdateParams: ["{self}"]
    });
    if ($bottling.hasClass('fixed') && !$bottling.hasClass('exploded')) { //PLEASE WORK!!!
        TweenMax.to($bottling , 2, {x: -(translateValue - 400)});
        TweenMax.set($bottlingFill, {display: 'none'});
    } else if ($bottling.hasClass('fixed')) $bottling.removeClass('fixed');
    // displayBgPosition(n);
    checkBackgroundColors();
}

function checkPosition(tween) {
    /* Check the current transform value */
    var n = -tween._targets[0]._gsTransform.x.toFixed(2);

    if (n < -7800 && loopForwardAllowed) {
        /* sets new position at the start of the film  */
        loopBackwardAllowed = false;
        loopForwardAllowed = false;

        // set the bottling container to initial state
        $bottling.removeClass('fixed');
        setTimeout(function() {$bottling.removeClass('exploded');}, 1000);
        TweenMax.set($bottling, {x: positionsArr[10]});

        translateValue = n + 8000;
        TweenMax.set(fgBg, {x: translateValue});
        TweenMax.set($actionItem, {x: -translateValue});
    } else if (n >= 200 && loopBackwardAllowed) {
        /* sets new position at the end of the film  */
        translateValue = n - 8000;
        TweenMax.set(fgBg, {x: translateValue});
        TweenMax.set($actionItem, {x: -translateValue});
    } else if (n >= 160 && !loopBackwardAllowed) { /* checks if user is allowed to go to the end of the film */
        translateValue = 161;

        TweenMax.to(fgBg, 0.4, {x: translateValue});
        TweenMax.to($actionItem, 0.4, {x: -translateValue});
    } else if (n <= -7740 && !loopForwardAllowed) { /* checks if user is allowed to go to the beginning of the film */
        translateValue = -7741;

        if ($bottling.hasClass('exploded')) {}
        else {
            $bottling.addClass('exploded');
            $bottling.removeClass('fixed');
        }

        TweenMax.to(fgBg, 0.4, {x: translateValue});
        TweenMax.to($actionItem, 0.4, {x: -translateValue});
    }
    if (n < bottlingContainerFixingPosition) {
        if ($bottling.hasClass('fixed')) {}
        else if (!$bottling.hasClass('exploded')) {
            $bottling.addClass('fixed');
            TweenMax.to($bottling , 2, {x: -(translateValue - bottlingContainerMoveFix)});
        }
    } else {
        if($bottling.hasClass('fixed')) {
            $bottling.removeClass('fixed');
            TweenMax.set($bottling ,{x: -(n - bottlingContainerMoveFix)});
        }
    }
    // displayBgPosition(n);
}

jQuery(moveObject)
    .bind('move', function (e) {
        var n = parseInt($bg.css('transform').split(',')[4]);

        TweenMax.set(fgBg, {x: (n + e.deltaX)});
        TweenMax.set($actionItem, {
            x: -(n + e.deltaX),
            onUpdate: $.throttle(810, checkPosition),
            onUpdateParams: ["{self}"]
        });
        if ($bottling.hasClass('fixed') && !$bottling.hasClass('exploded')) { //PLEASE WORK!!! TODO make magic happen on mobile
            TweenMax.set($bottling , {x: -(n + e.deltaX + -bottlingContainerMoveFix)});
        }
        // displayBgPosition(n);
        checkBackgroundColors();
    })
    .bind('moveend', function () {
        // In case autoscroll was running
        translateValue = parseInt($bg.css('transform').split(',')[4]);
        if ($btnAutoScroll.hasClass('scrolling')) {
            $btnAutoScroll.removeClass('scrolling');
        }
    });

var n = parseInt($bg.css('transform').split(',')[4]);
/* BG ANIMATIONS END */

/* INFORMATIVE FUNCTIONS */

function consoleLog(e) {
    console.log(e);
}

// function displayBgPosition(n) {
//     $('.bg-position').text(n);
// }

/* INFORMATIVE FUNCTIONS END */

/* FOREGROUND ANIMATIONS START */

function windSwitchDirection() {
    switchDirection($actionItem);
}

function switchDirection(object) {
    if (object.hasClass('right')) {
        object.removeClass('right');
        object.addClass('left');
    }
    else {
        object.removeClass('left');
        object.addClass('right');
    }
}


function checkActionItemState(classToAdd) {
    // first remove all classes
    if ($actionItem.hasClass(classToAdd)) {
        //nothing
    } else {
        $actionItem.removeClass();
        $actionItem.addClass('c-action');
        $actionItem.addClass(classToAdd);
        checkForActionItemEffects(classToAdd);
    }
}
/* FOREGROUND ANIMATIONS END */


/* SNOWFLAKES START */
var random_num1, random_num2, random_num3, snow, snow_x, snow_y, interval, snowFlakeCount = 0, random_color,
snowContainer = $('.c-snow-frame'),
container_height = $(document).height();

$(window).resize(function() {
  container_height = $(document).height();
});

var isSnowing = false;

function checkSnow(activate) {
    if (activate) {
        isSnowing = true;
        snowContainer.addClass('active');
        snowInterval = setInterval(function () {
            random_num1 = Math.round(Math.random() * 100);
            random_num2 = Math.round(Math.random() * 100);
            random_num3 = Math.floor(Math.random() * 15) + 5;
            random_color = oedipusColors[Math.floor((Math.random() * 4) + 1)];
            if(snowFlakeCount < maxSnowFlakeCount) {
                create_flake();
            }
            destroy_flake();
        }, 200);
    } else {
        // fading out flakes is done with css
        isSnowing = false;
        setTimeout(function() {
            if (!isSnowing) {
                destroyAllflakes();
            }
        }, 2000);
        if (snow) {
            clearInterval(snowInterval);
        }
        snowContainer.removeClass('active');
    }
}

function destroyAllflakes() {
    if (snow) { //preventing the snow doesn't exist console error
        snow.each(function () {
            $(this).remove();
            snowFlakeCount-=1;
        });
    }
}

function create_flake() {
    snowFlakeCount+=1;
    var snow_flake = '<div class="snow" style="left:' + random_num1 + '%;transform:scale(' + (random_num2 / 50) + '); animation-duration:' + (random_num3) + 's">' + flakeBeginning + random_color + flakeEnd + '</div>';

    $(snow_flake).appendTo(snowContainer);
}

function destroy_flake() {
    snow = $('.snow');
    snow.each(function () {
        snow_y = $(this).offset().top;
        snow_x = $(this).offset().left;
        if (snow_y > (container_height - 100)) {
            $(this).remove();
            snowFlakeCount-=1;
        }
    });
}



var flakeBeginning = '<svg width="294pt" height="324pt" viewBox="0 0 294 324" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="',
    flakeEnd = '" stroke="" stroke-width="0.09375" opacity="1.00" d=" M 146.27 0.00 L 151.80 0.00 C 151.91 6.61 152.07 13.21 152.20 19.82 C 158.95 16.75 165.73 13.74 172.52 10.73 C 174.08 14.30 175.78 17.81 177.17 21.45 C 168.94 24.96 160.87 28.83 152.62 32.27 C 152.47 41.72 152.96 51.17 153.06 60.63 C 165.24 55.22 177.41 49.79 189.61 44.43 C 191.18 47.97 192.75 51.51 194.32 55.06 C 180.67 61.11 167.04 67.19 153.38 73.21 C 153.47 82.97 153.76 92.72 153.95 102.47 C 158.32 100.04 162.67 97.58 167.04 95.14 C 168.95 98.52 170.85 101.91 172.75 105.29 C 166.68 108.78 160.47 112.05 154.46 115.64 C 153.97 120.22 154.55 124.87 154.55 129.48 C 160.04 132.73 165.61 135.88 171.13 139.08 C 175.76 136.40 180.40 133.74 185.01 131.02 C 185.79 122.01 186.57 113.01 187.33 104.00 C 191.20 104.32 195.07 104.65 198.95 105.00 C 198.38 111.32 197.89 117.64 197.28 123.96 C 205.49 119.19 213.66 114.34 221.96 109.71 C 221.50 92.58 220.42 75.47 219.74 58.35 C 223.61 58.17 227.48 57.99 231.36 57.83 C 232.05 72.88 232.78 87.93 233.42 102.99 C 241.89 98.05 250.40 93.17 258.86 88.22 C 257.84 77.59 256.80 66.96 255.79 56.34 C 259.64 55.95 263.51 55.58 267.37 55.22 C 268.30 64.06 268.96 72.94 270.03 81.77 C 275.90 78.37 281.76 74.95 287.64 71.57 C 289.62 74.88 291.26 78.46 294.00 81.24 L 294.00 81.59 C 292.58 81.86 291.33 82.60 290.19 83.45 C 285.63 86.31 280.93 88.91 276.26 91.57 C 282.18 96.00 288.09 100.45 293.98 104.92 L 294.00 102.95 L 294.00 106.40 L 293.95 105.10 C 291.64 108.15 289.37 111.23 287.04 114.26 C 279.82 108.83 272.59 103.42 265.41 97.95 C 257.24 102.62 249.11 107.37 240.96 112.09 C 251.58 120.13 262.19 128.16 272.80 136.20 C 270.47 139.30 268.11 142.39 265.76 145.48 C 253.83 136.50 241.97 127.42 230.01 118.46 C 221.55 123.31 213.13 128.23 204.69 133.12 C 209.44 136.08 214.21 139.01 218.96 141.96 C 216.92 145.27 214.87 148.57 212.82 151.87 C 206.32 147.78 199.70 143.90 193.30 139.67 C 187.89 142.89 182.41 146.01 176.96 149.18 C 176.97 156.00 176.84 162.83 177.04 169.65 C 180.49 172.11 183.64 174.96 187.14 177.36 C 188.68 177.62 190.16 176.72 191.65 176.41 C 198.86 174.14 206.12 172.03 213.33 169.77 C 214.55 173.47 215.68 177.20 216.73 180.96 C 210.62 182.73 204.57 184.70 198.44 186.45 C 206.12 192.17 213.56 198.20 221.13 204.07 C 236.72 197.03 252.26 189.90 267.84 182.85 C 269.46 186.37 271.07 189.90 272.67 193.44 C 258.95 199.69 245.22 205.93 231.50 212.17 C 240.27 218.90 248.81 225.94 257.72 232.48 C 266.25 227.93 274.89 223.58 283.47 219.11 C 285.25 222.56 287.04 226.00 288.83 229.45 C 281.74 233.11 274.69 236.83 267.56 240.41 C 272.02 243.80 276.40 247.29 280.82 250.74 C 278.41 253.81 276.05 256.91 273.56 259.91 C 268.42 255.79 263.20 251.76 258.01 247.71 C 256.05 254.84 254.14 261.98 252.19 269.12 C 248.43 268.11 244.69 267.10 240.94 266.07 C 243.30 257.35 245.68 248.63 248.04 239.90 C 240.64 234.13 233.28 228.31 225.84 222.58 C 222.26 235.36 218.77 248.16 215.31 260.97 C 211.52 260.06 207.78 258.98 204.03 257.94 C 207.92 243.50 212.03 229.11 215.81 214.63 C 208.05 208.83 200.64 202.56 192.79 196.88 C 191.92 201.74 191.09 206.62 190.22 211.48 C 186.39 210.83 182.56 210.16 178.75 209.45 C 179.98 202.54 181.14 195.62 182.41 188.72 C 178.42 185.34 174.23 182.19 170.09 178.99 C 164.67 182.28 159.01 185.19 153.68 188.61 C 152.94 192.63 153.53 196.88 153.27 200.99 C 153.49 202.77 152.49 205.37 154.51 206.39 C 161.47 211.35 168.44 216.29 175.38 221.27 C 173.14 224.44 170.88 227.59 168.62 230.75 C 163.45 227.07 158.27 223.41 153.13 219.68 C 153.04 229.18 153.03 238.69 152.86 248.19 C 167.88 256.42 183.12 264.27 198.22 272.35 C 196.42 275.80 194.62 279.26 192.71 282.65 C 179.43 275.54 166.09 268.53 152.79 261.46 C 152.80 271.28 152.48 281.11 152.68 290.93 C 162.36 295.27 171.89 299.96 181.58 304.31 C 180.05 307.90 178.34 311.41 176.69 314.94 C 168.52 311.11 160.31 307.35 152.18 303.43 C 152.72 310.27 152.17 317.14 152.31 324.00 L 140.65 324.00 C 140.71 317.36 140.71 310.73 140.84 304.09 C 134.01 306.94 127.13 309.68 120.33 312.59 C 118.72 309.04 117.29 305.42 115.81 301.82 C 124.15 298.39 132.47 294.88 140.85 291.55 C 141.07 282.12 141.01 272.70 141.14 263.27 C 128.81 268.31 116.48 273.37 104.15 278.40 C 102.68 274.82 101.23 271.24 99.73 267.68 C 113.51 261.91 127.36 256.33 141.19 250.68 C 141.42 240.89 141.30 231.09 141.53 221.30 C 136.53 223.92 131.59 226.67 126.48 229.08 C 124.76 225.64 122.95 222.24 121.17 218.83 C 127.99 215.32 134.71 211.62 141.60 208.25 C 141.62 201.27 141.72 194.29 141.76 187.31 C 136.74 184.43 131.71 181.57 126.73 178.62 C 121.89 181.00 117.21 183.70 112.51 186.33 C 111.47 195.30 110.52 204.28 109.50 213.25 C 105.64 212.84 101.79 212.42 97.93 211.98 C 98.62 205.68 99.33 199.39 100.02 193.10 C 91.66 197.71 83.26 202.26 74.90 206.88 C 75.26 223.95 75.65 241.03 76.01 258.10 C 72.13 258.19 68.26 258.27 64.38 258.36 C 64.05 243.29 63.68 228.22 63.42 213.15 C 54.86 217.81 46.35 222.58 37.73 227.16 C 38.21 237.87 39.27 248.56 39.90 259.27 C 36.04 259.53 32.18 259.82 28.31 260.08 C 27.69 251.18 26.98 242.29 26.42 233.38 C 20.46 236.71 14.45 239.96 8.45 243.24 C 6.58 239.84 4.72 236.44 2.86 233.03 C 8.65 229.82 14.50 226.73 20.25 223.44 C 14.41 218.92 8.65 214.28 2.84 209.71 C 5.24 206.65 7.66 203.61 10.08 200.58 C 17.17 206.16 24.23 211.78 31.31 217.37 C 39.63 212.98 47.83 208.36 56.09 203.87 C 45.68 195.57 35.26 187.29 24.86 178.98 C 27.27 175.94 29.69 172.90 32.12 169.88 C 43.81 179.17 55.49 188.48 67.17 197.78 C 75.78 193.13 84.33 188.39 92.91 183.72 C 88.20 180.71 83.57 177.59 78.85 174.60 C 80.89 171.28 83.06 168.04 85.20 164.79 C 91.67 168.99 98.11 173.24 104.59 177.43 C 109.76 174.42 115.03 171.55 120.34 168.79 C 120.68 162.17 120.41 155.55 120.50 148.93 C 116.28 146.49 111.93 144.26 107.68 141.87 C 99.50 145.80 91.41 149.91 83.27 153.93 C 81.53 150.45 79.77 146.98 78.08 143.47 C 83.75 140.69 89.42 137.86 95.08 135.05 C 86.71 130.49 78.35 125.92 69.96 121.40 C 55.74 130.88 41.60 140.49 27.40 150.00 C 25.22 146.78 23.04 143.57 20.89 140.33 C 33.37 131.91 45.90 123.57 58.34 115.08 C 49.77 110.38 41.18 105.70 32.57 101.06 C 24.05 107.51 15.49 113.89 6.93 120.28 C 4.63 117.19 2.27 114.15 0.00 111.04 L 0.00 110.92 C 6.46 106.06 12.94 101.23 19.42 96.39 C 20.10 95.85 21.94 94.80 20.08 94.25 C 14.54 91.19 8.95 88.22 3.40 85.17 C 5.25 81.75 7.11 78.35 8.97 74.94 C 14.98 78.13 20.88 81.52 26.93 84.63 C 26.55 77.21 28.13 69.76 28.62 62.33 C 32.48 62.70 36.35 63.07 40.21 63.52 C 39.29 72.46 38.44 81.41 37.51 90.36 C 45.70 95.03 54.06 99.41 62.33 103.95 C 63.64 90.71 65.03 77.47 66.37 64.23 C 70.23 64.62 74.09 65.02 77.95 65.41 C 76.46 80.26 74.89 95.11 73.42 109.97 C 81.99 114.68 90.60 119.32 99.19 124.00 C 99.17 118.40 99.25 112.79 99.28 107.19 C 103.16 107.24 107.04 107.24 110.91 107.27 C 110.87 114.95 110.83 122.62 110.73 130.30 C 115.98 133.15 121.27 135.95 126.46 138.91 C 131.98 135.93 137.33 132.64 142.81 129.60 C 142.58 126.00 143.22 122.11 142.29 118.68 C 135.07 113.41 127.45 108.68 120.07 103.63 C 122.19 100.38 124.37 97.16 126.53 93.94 C 131.83 97.45 137.12 100.98 142.37 104.57 C 142.10 95.04 141.95 85.50 141.75 75.97 C 126.46 68.28 111.05 60.81 95.72 53.20 C 97.45 49.72 99.15 46.24 100.90 42.77 C 114.43 49.43 127.97 56.10 141.49 62.80 C 141.21 51.81 140.99 40.82 140.79 29.83 C 131.90 25.81 122.87 22.10 113.95 18.13 C 115.50 14.58 117.03 11.02 118.59 7.47 C 125.90 10.63 133.22 13.78 140.53 16.97 C 140.35 11.39 140.27 5.81 140.14 0.23 C 142.18 0.17 144.23 0.08 146.27 0.00 M 129.82 147.86 C 129.87 155.16 129.70 162.48 129.91 169.78 C 136.25 173.25 142.44 176.99 148.73 180.55 C 155.03 176.91 161.33 173.28 167.62 169.65 C 167.63 162.39 167.61 155.13 167.63 147.88 C 161.38 144.19 155.05 140.65 148.81 136.95 C 142.43 140.50 136.15 144.22 129.82 147.86 Z" /></svg>';
    // flakeFull = '<svg width="294pt" height="324pt" viewBox="0 0 294 324" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#3a3025" stroke="#3a3025" stroke-width="0.09375" opacity="1.00" d=" M 146.27 0.00 L 151.80 0.00 C 151.91 6.61 152.07 13.21 152.20 19.82 C 158.95 16.75 165.73 13.74 172.52 10.73 C 174.08 14.30 175.78 17.81 177.17 21.45 C 168.94 24.96 160.87 28.83 152.62 32.27 C 152.47 41.72 152.96 51.17 153.06 60.63 C 165.24 55.22 177.41 49.79 189.61 44.43 C 191.18 47.97 192.75 51.51 194.32 55.06 C 180.67 61.11 167.04 67.19 153.38 73.21 C 153.47 82.97 153.76 92.72 153.95 102.47 C 158.32 100.04 162.67 97.58 167.04 95.14 C 168.95 98.52 170.85 101.91 172.75 105.29 C 166.68 108.78 160.47 112.05 154.46 115.64 C 153.97 120.22 154.55 124.87 154.55 129.48 C 160.04 132.73 165.61 135.88 171.13 139.08 C 175.76 136.40 180.40 133.74 185.01 131.02 C 185.79 122.01 186.57 113.01 187.33 104.00 C 191.20 104.32 195.07 104.65 198.95 105.00 C 198.38 111.32 197.89 117.64 197.28 123.96 C 205.49 119.19 213.66 114.34 221.96 109.71 C 221.50 92.58 220.42 75.47 219.74 58.35 C 223.61 58.17 227.48 57.99 231.36 57.83 C 232.05 72.88 232.78 87.93 233.42 102.99 C 241.89 98.05 250.40 93.17 258.86 88.22 C 257.84 77.59 256.80 66.96 255.79 56.34 C 259.64 55.95 263.51 55.58 267.37 55.22 C 268.30 64.06 268.96 72.94 270.03 81.77 C 275.90 78.37 281.76 74.95 287.64 71.57 C 289.62 74.88 291.26 78.46 294.00 81.24 L 294.00 81.59 C 292.58 81.86 291.33 82.60 290.19 83.45 C 285.63 86.31 280.93 88.91 276.26 91.57 C 282.18 96.00 288.09 100.45 293.98 104.92 L 294.00 102.95 L 294.00 106.40 L 293.95 105.10 C 291.64 108.15 289.37 111.23 287.04 114.26 C 279.82 108.83 272.59 103.42 265.41 97.95 C 257.24 102.62 249.11 107.37 240.96 112.09 C 251.58 120.13 262.19 128.16 272.80 136.20 C 270.47 139.30 268.11 142.39 265.76 145.48 C 253.83 136.50 241.97 127.42 230.01 118.46 C 221.55 123.31 213.13 128.23 204.69 133.12 C 209.44 136.08 214.21 139.01 218.96 141.96 C 216.92 145.27 214.87 148.57 212.82 151.87 C 206.32 147.78 199.70 143.90 193.30 139.67 C 187.89 142.89 182.41 146.01 176.96 149.18 C 176.97 156.00 176.84 162.83 177.04 169.65 C 180.49 172.11 183.64 174.96 187.14 177.36 C 188.68 177.62 190.16 176.72 191.65 176.41 C 198.86 174.14 206.12 172.03 213.33 169.77 C 214.55 173.47 215.68 177.20 216.73 180.96 C 210.62 182.73 204.57 184.70 198.44 186.45 C 206.12 192.17 213.56 198.20 221.13 204.07 C 236.72 197.03 252.26 189.90 267.84 182.85 C 269.46 186.37 271.07 189.90 272.67 193.44 C 258.95 199.69 245.22 205.93 231.50 212.17 C 240.27 218.90 248.81 225.94 257.72 232.48 C 266.25 227.93 274.89 223.58 283.47 219.11 C 285.25 222.56 287.04 226.00 288.83 229.45 C 281.74 233.11 274.69 236.83 267.56 240.41 C 272.02 243.80 276.40 247.29 280.82 250.74 C 278.41 253.81 276.05 256.91 273.56 259.91 C 268.42 255.79 263.20 251.76 258.01 247.71 C 256.05 254.84 254.14 261.98 252.19 269.12 C 248.43 268.11 244.69 267.10 240.94 266.07 C 243.30 257.35 245.68 248.63 248.04 239.90 C 240.64 234.13 233.28 228.31 225.84 222.58 C 222.26 235.36 218.77 248.16 215.31 260.97 C 211.52 260.06 207.78 258.98 204.03 257.94 C 207.92 243.50 212.03 229.11 215.81 214.63 C 208.05 208.83 200.64 202.56 192.79 196.88 C 191.92 201.74 191.09 206.62 190.22 211.48 C 186.39 210.83 182.56 210.16 178.75 209.45 C 179.98 202.54 181.14 195.62 182.41 188.72 C 178.42 185.34 174.23 182.19 170.09 178.99 C 164.67 182.28 159.01 185.19 153.68 188.61 C 152.94 192.63 153.53 196.88 153.27 200.99 C 153.49 202.77 152.49 205.37 154.51 206.39 C 161.47 211.35 168.44 216.29 175.38 221.27 C 173.14 224.44 170.88 227.59 168.62 230.75 C 163.45 227.07 158.27 223.41 153.13 219.68 C 153.04 229.18 153.03 238.69 152.86 248.19 C 167.88 256.42 183.12 264.27 198.22 272.35 C 196.42 275.80 194.62 279.26 192.71 282.65 C 179.43 275.54 166.09 268.53 152.79 261.46 C 152.80 271.28 152.48 281.11 152.68 290.93 C 162.36 295.27 171.89 299.96 181.58 304.31 C 180.05 307.90 178.34 311.41 176.69 314.94 C 168.52 311.11 160.31 307.35 152.18 303.43 C 152.72 310.27 152.17 317.14 152.31 324.00 L 140.65 324.00 C 140.71 317.36 140.71 310.73 140.84 304.09 C 134.01 306.94 127.13 309.68 120.33 312.59 C 118.72 309.04 117.29 305.42 115.81 301.82 C 124.15 298.39 132.47 294.88 140.85 291.55 C 141.07 282.12 141.01 272.70 141.14 263.27 C 128.81 268.31 116.48 273.37 104.15 278.40 C 102.68 274.82 101.23 271.24 99.73 267.68 C 113.51 261.91 127.36 256.33 141.19 250.68 C 141.42 240.89 141.30 231.09 141.53 221.30 C 136.53 223.92 131.59 226.67 126.48 229.08 C 124.76 225.64 122.95 222.24 121.17 218.83 C 127.99 215.32 134.71 211.62 141.60 208.25 C 141.62 201.27 141.72 194.29 141.76 187.31 C 136.74 184.43 131.71 181.57 126.73 178.62 C 121.89 181.00 117.21 183.70 112.51 186.33 C 111.47 195.30 110.52 204.28 109.50 213.25 C 105.64 212.84 101.79 212.42 97.93 211.98 C 98.62 205.68 99.33 199.39 100.02 193.10 C 91.66 197.71 83.26 202.26 74.90 206.88 C 75.26 223.95 75.65 241.03 76.01 258.10 C 72.13 258.19 68.26 258.27 64.38 258.36 C 64.05 243.29 63.68 228.22 63.42 213.15 C 54.86 217.81 46.35 222.58 37.73 227.16 C 38.21 237.87 39.27 248.56 39.90 259.27 C 36.04 259.53 32.18 259.82 28.31 260.08 C 27.69 251.18 26.98 242.29 26.42 233.38 C 20.46 236.71 14.45 239.96 8.45 243.24 C 6.58 239.84 4.72 236.44 2.86 233.03 C 8.65 229.82 14.50 226.73 20.25 223.44 C 14.41 218.92 8.65 214.28 2.84 209.71 C 5.24 206.65 7.66 203.61 10.08 200.58 C 17.17 206.16 24.23 211.78 31.31 217.37 C 39.63 212.98 47.83 208.36 56.09 203.87 C 45.68 195.57 35.26 187.29 24.86 178.98 C 27.27 175.94 29.69 172.90 32.12 169.88 C 43.81 179.17 55.49 188.48 67.17 197.78 C 75.78 193.13 84.33 188.39 92.91 183.72 C 88.20 180.71 83.57 177.59 78.85 174.60 C 80.89 171.28 83.06 168.04 85.20 164.79 C 91.67 168.99 98.11 173.24 104.59 177.43 C 109.76 174.42 115.03 171.55 120.34 168.79 C 120.68 162.17 120.41 155.55 120.50 148.93 C 116.28 146.49 111.93 144.26 107.68 141.87 C 99.50 145.80 91.41 149.91 83.27 153.93 C 81.53 150.45 79.77 146.98 78.08 143.47 C 83.75 140.69 89.42 137.86 95.08 135.05 C 86.71 130.49 78.35 125.92 69.96 121.40 C 55.74 130.88 41.60 140.49 27.40 150.00 C 25.22 146.78 23.04 143.57 20.89 140.33 C 33.37 131.91 45.90 123.57 58.34 115.08 C 49.77 110.38 41.18 105.70 32.57 101.06 C 24.05 107.51 15.49 113.89 6.93 120.28 C 4.63 117.19 2.27 114.15 0.00 111.04 L 0.00 110.92 C 6.46 106.06 12.94 101.23 19.42 96.39 C 20.10 95.85 21.94 94.80 20.08 94.25 C 14.54 91.19 8.95 88.22 3.40 85.17 C 5.25 81.75 7.11 78.35 8.97 74.94 C 14.98 78.13 20.88 81.52 26.93 84.63 C 26.55 77.21 28.13 69.76 28.62 62.33 C 32.48 62.70 36.35 63.07 40.21 63.52 C 39.29 72.46 38.44 81.41 37.51 90.36 C 45.70 95.03 54.06 99.41 62.33 103.95 C 63.64 90.71 65.03 77.47 66.37 64.23 C 70.23 64.62 74.09 65.02 77.95 65.41 C 76.46 80.26 74.89 95.11 73.42 109.97 C 81.99 114.68 90.60 119.32 99.19 124.00 C 99.17 118.40 99.25 112.79 99.28 107.19 C 103.16 107.24 107.04 107.24 110.91 107.27 C 110.87 114.95 110.83 122.62 110.73 130.30 C 115.98 133.15 121.27 135.95 126.46 138.91 C 131.98 135.93 137.33 132.64 142.81 129.60 C 142.58 126.00 143.22 122.11 142.29 118.68 C 135.07 113.41 127.45 108.68 120.07 103.63 C 122.19 100.38 124.37 97.16 126.53 93.94 C 131.83 97.45 137.12 100.98 142.37 104.57 C 142.10 95.04 141.95 85.50 141.75 75.97 C 126.46 68.28 111.05 60.81 95.72 53.20 C 97.45 49.72 99.15 46.24 100.90 42.77 C 114.43 49.43 127.97 56.10 141.49 62.80 C 141.21 51.81 140.99 40.82 140.79 29.83 C 131.90 25.81 122.87 22.10 113.95 18.13 C 115.50 14.58 117.03 11.02 118.59 7.47 C 125.90 10.63 133.22 13.78 140.53 16.97 C 140.35 11.39 140.27 5.81 140.14 0.23 C 142.18 0.17 144.23 0.08 146.27 0.00 M 129.82 147.86 C 129.87 155.16 129.70 162.48 129.91 169.78 C 136.25 173.25 142.44 176.99 148.73 180.55 C 155.03 176.91 161.33 173.28 167.62 169.65 C 167.63 162.39 167.61 155.13 167.63 147.88 C 161.38 144.19 155.05 140.65 148.81 136.95 C 142.43 140.50 136.15 144.22 129.82 147.86 Z" /></svg>';
/* SNOWFLAKES END */
/* AutoScrollButton START */

$btnAutoScroll.click(function (e) {
    e.preventDefault();
    changeScrollButtonClass();
});

function changeScrollButtonClass() {
    var n = parseInt($bg.css('transform').split(',')[4]);
    if ($btnAutoScroll.hasClass('scrolling')) {
        $btnAutoScroll.removeClass('scrolling');
        stopAutoScroll();
    } else if (n < -7690) {
        $btnAutoScroll.addClass('scrolling');
        loopBackwardAllowed =  true;
        loopForwardAllowed = true;
        moveBackground();
        setTimeout(function(){
            startAutoScroll();
        }, 2000);
    } else {
        $btnAutoScroll.addClass('scrolling');
        startAutoScroll();
    }
}

$btnReplay.click(function (e) {
    e.preventDefault();
    replayFilm();
});

function replayFilm() {
    loopBackwardAllowed =  true;
    loopForwardAllowed = true;
    moveBackground();
    moveBackground();
}

function startAutoScroll() {
    // calculate depending on the position what time to set for the animation to be consistent throughout all the film (% stuff)
    var n = parseInt($bg.css('transform').split(',')[4]),
        filmEnd = 7750,
        filmStart = 200,
        maxTime = 20,
        oneTimePercent,
        oneFilmPercent,
        percentAtTheMoment,
        timeToAnimate;

    if (n <= -7600) {
        TweenMax.set(fgBg, {x: filmStart});
        TweenMax.set($actionItem, {x: -filmStart});
    }

    oneTimePercent = maxTime / 100;
    oneFilmPercent = parseInt(filmEnd / 99);
    percentAtTheMoment = 100 - (-parseInt(n / oneFilmPercent));
    timeToAnimate = oneTimePercent * percentAtTheMoment;

    TweenMax.allTo(fgBg, timeToAnimate, {ease: Power0.easeNone, x: -filmEnd});
    TweenMax.to($actionItem, timeToAnimate, {
        ease: Power0.easeNone,
        x: filmEnd,
        onUpdate: customOnUpdate,
        onUpdateParams: ["{self}"],
        onComplete: changeScrollButtonClass
    });

    function customOnUpdate(tween) {
        checkBackgroundColors();
        var n = -tween._targets[0]._gsTransform.x.toFixed(2);

        if (n < -6500 && !$bottling.hasClass('exploded')) {
            if ($bottling.hasClass('fixed')) {
                TweenMax.set($bottling , {x: -(n - 400)});
            }
            else {
                $bottling.addClass('fixed');
                TweenMax.set($bottling , {x: -(n - 400)});
            }
        } else {
            if($bottling.hasClass('fixed')) {
                $bottling.removeClass('fixed');
                TweenMax.set($bottling ,{x: -(n - 400)});
            }
        }
        if (n <= -7740 && !loopForwardAllowed) {

            if ($bottling.hasClass('exploded')) {}
            else {
                $bottling.addClass('exploded');
                $bottling.removeClass('fixed');
            }
        }
    }
}

function stopAutoScroll() {
    var n = parseInt($bg.css('transform').split(',')[4]);

    translateValue = n;
    TweenMax.set(fgBg, {x: n});
    TweenMax.set($actionItem, {x: -n});
}
/* AutoScrollButton END */

/* Change Background per Step START */

/*
 color change breakpoints
 step1: 0-650
 step2: 650-1840
 step3: 1840-3150
 step4: 3150-4490
 step5: 4490-5830
 step6: 5830-7055
 step7: 7055-8000
 */


var step1Duration = -650,
    step2Duration = -1840,
    step3Duration = -3150,
    step4Duration = -4490,
    step5Duration = -5830,
    step6Duration = -7055,
    step6End = -8000;

function checkBackgroundColors() {
    var n = parseInt($bg.css('transform').split(',')[4]);

    if (n > step4Duration) {

        if (n > step1Duration) { //step 1
            TweenMax.to(e, 1.5, {backgroundColor: '#fff'});
            checkActionItemState('initial');
        } else if (n > step2Duration) { // step 2
            TweenMax.to(e, 1.5, {backgroundColor: colorOedipusPink});
            checkActionItemState('milled-mashed');
        } else if (n > step3Duration) { // step 3
            TweenMax.to(e, 1.5, {backgroundColor: colorOedipusPinkDark});
            checkActionItemState('boiling');
        } else { //step 4
            TweenMax.to(e, 1.5, {backgroundColor: colorOedipusBlue});
            checkActionItemState('cooling');
        }
    } else {
        if (n > step5Duration) { // step5
            TweenMax.to(e, 1.5, {backgroundColor: colorOedipusGreen});
            checkActionItemState('fermenting');
        } else if (n > step6Duration) { // step6
            TweenMax.to(e, 5.5, {backgroundColor: '#fff'});
            checkActionItemState('bottling');
        } else if (n > step6End) { // step7
            TweenMax.to(e, 1.5, {backgroundColor: '#fff'});
            checkActionItemState('bottling');
        }
    }
}
/* Change Background per Step END */


/* action item stages START */
var mainActionItemtl = new TimelineMax({}); // I know it's easier to add all children(per step) to the mainTimeline at beginning and then per step reference them but no one's perfect
var boilingTimelineRunning = false;

function checkForActionItemEffects(hasClass) {
    switch (hasClass) {
        case "initial":
            mainActionItemtl.clear();
            boilingTl.clear();
            boilingTimelineRunning = false;
            TweenMax.to($actionItem, 0.8, {top: '30vh', left: '70vw'});
            break;
        case "milled-mashed":
            mainActionItemtl.clear();
            if(!boilingTimelineRunning) getBoilingTimeline();
            TweenMax.to($actionItem, 0.8, {top: '17vh', left: '70vw'});
            break;
        case "boiling":
            //clear Timeline from previous tweens&callbacks
            mainActionItemtl.clear();
            cloudCoolingTlLeft.clear();
            mainActionItemtl.eventCallback("repeat", null);
            checkSnow(false);
            TweenMax.to($actionItem, 0.8, {top: '4vh', left: '25vw'});
            break;
        case "cooling":
            $actionItem.addClass('right');
            //clear Timeline from previous tweens&callbacks
            mainActionItemtl.clear();
            bottlingTl.clear();
            clearBottlingTimelineProps();
            checkSnow(true);
            if(!boilingTimelineRunning) getBoilingTimeline();
            TweenMax.to($actionItem, 0.8, {top: '4vh', left: '80vw', onComplete:setCloudLeft});
            function setCloudLeft(){
                if ($actionItem.hasClass('left')) {}
                else {
                    $actionItem.addClass('left');
                    $actionItem.removeClass('right');
                }
            }

            setTimeout(function(){
              getCoolingTimeline();
            }, 800);
            break;
        case "fermenting":
            mainActionItemtl.clear();
            cloudCoolingTlLeft.clear();
            boilingTl.kill();
            boilingTimelineRunning = false;
            getBottlingTimeline();
            checkSnow(false);
            mainActionItemtl.add(getFermentingTimeline());
            break;
        case "bottling":
            mainActionItemtl.clear();
            TweenMax.to($actionItem, 0.8, {top: '4vh', left: '45vw'});
            TweenMax.to($actionItem, 0.8, {top: '4vh', left: '110vw', delay:1});
            break;
        default:
    }
}

function getCoolingTimeline() {
    mainActionItemtl.to($actionItem, 3, {left: '20vw', ease: Power0.easeNone, yoyo:true, repeat: -1, onRepeat: windSwitchDirection}, "cool")
                    .to($actionItem, 1, {top: '10vh', ease: Power0.easeNone, yoyo:true, repeat: -1}, "cool");
    cloudCoolingTlLeft.staggerFromTo($coldLeftBeams, 0.3, {opacity: 1, x: 10, y: -10}, {opacity: 0, x: -40, y: 50}, 0.1, "initial")
                      .staggerFromTo($coldRightBeams, 0.3, {opacity: 1, x: -10, y: -20}, {opacity: 0, x: -30, y: 40}, 0.1, "initial");
}

function getBoilingTimeline() {
    boilingTl.to($thermometerNeedle, 2, {transformOrigin: "50% 80%", rotation: -30, repeat: -1, yoyo: true, ease: Elastic.easeOut}, "boil")
             .staggerFromTo($smoke, 1, {scale: 0}, {scale: 1}, 0.1, "boil")
             .staggerFromTo($smoke, 1, {opacity: 0.8, y: 40}, {opacity: 0.3, y: -50, repeat: -1, repeatDelay: -2, ease: Circ.easeOut}, 0.1, "boil");
}

function getBottlingTimeline() {
   bottlingTl.staggerTo($beerWaves, 1, {y: -25, repeat:-1, yoyo:true, clearProps: "all"}, 0.4);
}

function clearBottlingTimelineProps() {
   bottlingTl.set($beerWaves,{ clearProps: "all" });
}

function getFermentingTimeline() {
    var tl = new TimelineMax({delay: 0.8});

    tl.to($actionItem, 2, {left: '70vw', top: '5vh'});

    return tl;
}
/* action item stages END */

/* Fermenting vessel window START */
function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function moveRandom(obj) {
    var newY = randomFromTo(1, 80),
        newX = randomFromTo(1, 80);

    TweenMax.to(obj, 2, {y: newY, x: newX, ease:Power0.easeNone, onComplete:moveRandomThis});

    function moveRandomThis() {
        moveRandom(obj);
    }
}

$('.cell').each(function() {
    moveRandom($(this))
});

/* Fermenting vessel window END */