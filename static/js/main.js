
window.onload = function() {
  var rectangle = $('.rectangle');
  TweenLite.to(rectangle, 5, {left:"542px", backgroundColor:"yellow", borderBottomColor:"#90e500", color:"white"});
}

//Animation Development
var e = document.body,
    counterUp = 0,
    counterDown = 0,
    translateValue = 0,
    events = 0,
    bg = $('.c-brewing-background'),
    ev =$('.events').text(events);

// Keep the scroll execution limited to 80 miliseconds with $.throttle ^ keeps the events limited to max ~20 at a time
$('body').bind('DOMMouseScroll mousewheel', $.throttle( 80, scrolling ));

function scrolling (s){
    events++;
    ev.text(events);

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
    var n = parseInt(bg.css('transform').split(',')[4]);
    console.log("transformation value at moment: " + n);

    if(translateValue < n && n < -7800) {
        console.log("Return now");

        //get the exact translate value at the moment of jump
        var n = parseInt(bg.css('transform').split(',')[4]);
        console.log("transformation value at moment of jump: " + n);
        var newtranslateValue = -n -8000;
        translateValue = -newtranslateValue;

        TweenMax.set(bg, {transform: "translate3d(0px, 0px, 0px)"});
        TweenMax.to(bg, 1, {transform: "translate3d(" + translateValue + "px, 0px, 0px)", onStart:tweenStart});

        console.log("After Jump translatevalue is:  " + translateValue);
        r = f==="forward" ? translateValue = translateValue + 200 : translateValue = translateValue - 200;
        return false;
    } //else if(translateValue > 200) {
    //    var newtranslateValue = translateValue;
    //    translateValue = newtranslateValue - 8000;
    //
    //    TweenMax.set(bg, {transform: "translate3d(8000px, 0px, 0px)"});
    //    TweenMax.to(bg, 1, {transform: "translate3d(" + newtranslateValue + "px, 0px, 0px)", onStart:tweenStart});
    //
    //    console.log(newtranslateValue);
    //    return false;
    //}

    console.log("To be translated to: " + translateValue);
    TweenMax.to($('.c-brewing-background'), 2, {transform: "translate3d(" + translateValue + "px, 0px, 0px)", onStart:tweenStart});

    r = f==="forward" ? translateValue = translateValue + 200 : translateValue = translateValue - 200;
}

function tweenStart() {
    startCountdown();
    setTimeout( function(){
        finishedTween();
      }, 2000);
}

function finishedTween() {
    events--;
    console.log("Tween Finished");
    ev.text(events);

    var n = parseInt(bg.css('transform').split(',')[4]);
    if(translateValue < n && n < -7800) {
        console.log("Return now");

        //get the exact translate value at the moment of jump
        var newtranslateValue = -translateValue -8200;
        translateValue = -newtranslateValue - 200;
        var noscrollTranslation = translateValue;

        TweenMax.set(bg, {transform: "translate3d(" + n+7800 + "px, 0px, 0px)"});
        TweenMax.to(bg, 1, {transform: "translate3d(" + noscrollTranslation + "px, 0px, 0px)", onStart:tweenStart});

        console.log("After finishedtweetJump translatevalue is:  " + translateValue);
    }
}

function startCountdown() {

}

