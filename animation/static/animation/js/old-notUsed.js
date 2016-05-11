// /**
//  * Created by stoyans on 11/05/16.
//  */
//
//
// /* NAVIGATION ANIMATIONS START */
// var $navLine = $('.e-navigation-line'),
//     percentToTravel = 0,
//     roadToTravel = 0,
//     maxRoad = 0,
//     btlMaxRight = 0,
//     $btlnav = $('.e-navigation-bottle'),
//
// animateNavigation(0);
// function animateNavigation(value) {
//     maxRoad = parseInt($navLine.css('width'));
//     btlMaxRight = maxRoad + 7;
//
//     var btlMaxRoad = maxRoad; // keep the long roader so that there is time for the bottle to stay in one position before the change of film
//     /* calculate what is value from 100% (8000px) ^ calculate what is the road to pass for the percent that we get */
//     percentToTravel = parseInt(-value / 72);
//     // consoleLog('percentToTravel: ' + percentToTravel + '%');
//     roadToTravel = (btlMaxRoad/100) * percentToTravel;
//     // consoleLog('roadToTravel: ' + roadToTravel + 'px')  ;
//     if(roadToTravel < 11) { // Keep nav bottle from overthrowing its endpoint
//         TweenMax.to($btlnav, 1, {left: 11 + "px", ease: Power4.easeNone});
//     } else if(roadToTravel > btlMaxRight) {
//         TweenMax.to($btlnav, 1, {left: btlMaxRight + "px", ease: Power0.easeNone});
//     } else {
//         TweenMax.to($btlnav, 1, {left: roadToTravel + "px", ease: Power0.easeNone});
//     }
//     // consoleLog('percentToTravel: ' + percentToTravel);
//     // consoleLog('translateValue: ' + value);
// }
//
// function btlNavigationSet(translateValue) {
//     // fores only if it is time to change the film
//     // FIRES ALWAYS
//     percentToTravel = parseInt(-translateValue / 80);
//     s = (maxRoad/100) * percentToTravel;
//
//     if(s < 11) {
//         TweenMax.set($btlnav, {left: 11 + "px"});
//     } else if (s < btlMaxRight && s > 960) {
//         consoleLog('set to '+ btlMaxRight);
//         TweenMax.set($btlnav, {left: btlMaxRight + "px"});
//     } else if (translateValue < -5000){ // Some if-else's to check if the film is changing from right-left or from left-right
//         TweenMax.set($btlnav, {left: s + ((maxRoad/100)*5)  + "px"});
//     } else {
//         TweenMax.set($btlnav, {left: s + "px"});
//     }
// }
//
// var $pS1 = $('.e-step-1'),
//     $pS2 = $('.e-step-2'),
//     $pS3 = $('.e-step-3'),
//     $pS4 = $('.e-step-4'),
//     $pS5 = $('.e-step-5'),
//     $points = [$pS1,$pS2,$pS3,$pS4,$pS5];
//
// setNavStepPoints();
// function setNavStepPoints() {
//     var difference = maxRoad / 4;
//     var sum = 0;
//     for (i = 0; i < 5; i++){
//         TweenMax.to($points[i], 0, {left: sum + "px", ease: Power0.easeNone});
//         sum = sum + difference;
//     }
// }
// /* NAVIGATION ANIMATIONS END*/
//
// /* used to log the tween events at a time */
//
// function finishedTween() {
//     events--;
//     $ev.text(events);
// }
//
// function tweenStart() {
//     setTimeout( function(){
//         finishedTween();
//     }, 2000);
// }