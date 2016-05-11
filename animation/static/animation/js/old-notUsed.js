/**
 * Created by stoyans on 11/05/16.
 */


function btlNavigationSet(translateValue) {
    // fores only if it is time to change the film
    // FIRES ALWAYS
    percentToTravel = parseInt(-translateValue / 80);
    s = (maxRoad/100) * percentToTravel;

    if(s < 11) {
        TweenMax.set($btlnav, {left: 11 + "px"});
    } else if (s < btlMaxRight && s > 960) {
        consoleLog('set to '+ btlMaxRight);
        TweenMax.set($btlnav, {left: btlMaxRight + "px"});
    } else if (translateValue < -5000){ // Some if-else's to check if the film is changing from right-left or from left-right
        TweenMax.set($btlnav, {left: s + ((maxRoad/100)*5)  + "px"});
    } else {
        TweenMax.set($btlnav, {left: s + "px"});
    }
}


