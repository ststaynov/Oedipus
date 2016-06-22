
// Copyright 2013 William Malone (www.williammalone.com)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

(function() {
	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	// MIT license

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {} 
else initAllCanvasItems();

function initAllCanvasItems () {

	var magicCloud,
        actionCloud,
        plane,
		magicCloudImage,
        actionCloudImage,
        planeImage,
		canvasMagicCloud,
        canvasActionCloud,
        canvasPlane;

	function magicCloudGameLoop () {
        window.requestAnimationFrame(magicCloudGameLoop);

        magicCloud.update();
        actionCloud.update();
        plane.update();

        magicCloud.render();
        actionCloud.render();
        plane.render();
	}

	function sprite (options) {

		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;

		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;

		that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

				tickCount = 0;

                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };

		that.render = function () {

		  // Clear the canvas
		  that.context.clearRect(0, 0, that.width, that.height);

		  // Draw the animation
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames,
		    0,
		    that.width / numberOfFrames,
		    that.height,
		    0,
		    0,
		    that.width / numberOfFrames,
		    that.height);
		};

		return that;
	}

	// Get canvas
	canvasMagicCloud = document.getElementById("canvas-magic-cloud-animation");
	canvasMagicCloud.width = 1000;
	canvasMagicCloud.height = 500;
    
    canvasActionCloud = document.getElementById("canvas-action-cloud-animation");
    canvasActionCloud.width = 173;
	canvasActionCloud.height = 135;

    canvasPlane = document.getElementById("canvas-plane-animation");
    canvasPlane.width = 245;
	canvasPlane.height = 63;

	// Create sprite sheet
	magicCloudImage = new Image();
    actionCloudImage = new Image();
    planeImage = new Image();

	// Create sprite
	magicCloud = sprite({
		context: canvasMagicCloud.getContext("2d"),
		width: 15000,
		height: 500,
		image: magicCloudImage,
		numberOfFrames: 15,
		ticksPerFrame: 4
	});

    actionCloud = sprite({
		context: canvasActionCloud.getContext("2d"),
		width: 13875,
		height: 135,
		image: actionCloudImage,
		numberOfFrames: 75,
		ticksPerFrame: 1
	});

    plane = sprite({
		context: canvasPlane.getContext("2d"),
		width: 5880,
		height: 63,
		image: planeImage,
		numberOfFrames: 24,
		ticksPerFrame: 1.5
	});

	// Load sprite sheet
	magicCloudImage.addEventListener("load", magicCloudGameLoop);
    // actionCloudImage.addEventListener("load", actionCloudGameLoop);

	magicCloudImage.src = "/static/animation/images/desktop/step1/magic_spritesheet_15f_1000x500_15000_optimised.png";
    actionCloudImage.src = "/static/animation/images/desktop/action-item/animation_spritesheet_75f_173x135_13875_optimized.png";
    planeImage.src = "/static/animation/images/desktop/foreground/plane_spritesheet_24f_245x63_5880.png";
}

