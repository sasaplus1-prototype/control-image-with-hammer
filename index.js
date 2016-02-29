(function(){

  'use strict';

  var frame = document.getElementById('js-frame'),
      image = document.getElementById('js-image'),
      hammer = new Hammer.Manager(image);

  var pan = new Hammer.Pan();

  var frameWidth = frame.clientWidth,
      frameHeight = frame.clientHeight;

  var width = image.width,
      height = image.height;

  var firstX, firstY, startLeft, startTop;

  //----------------------------------------------------------------------------

  pan.set({
    threshold: 20
  });

  hammer.add([pan]);

  //----------------------------------------------------------------------------

  hammer.on('panstart', function(event) {
    console.group('panstart');
    console.log(event);
    console.groupEnd();

    image.style.top || (image.style.top = '0px');
    image.style.left || (image.style.left = '0px');

    startLeft = parseInt(image.style.left, 10) || 0;
    startTop = parseInt(image.style.top, 10) || 0;

    firstX = event.deltaX;
    firstY = event.deltaY;
  });

  hammer.on('pan', function(event) {
    var left, top;

    console.group('pan');
    console.log(event);
    console.groupEnd();

    left = (startLeft + event.deltaX - firstX);
    top = (startTop + event.deltaY - firstY);

    if (left > 0) {
      image.style.left = '0px';
    } else if (left < 0 - width + frameWidth) {
      image.style.left = (0 - width + frameWidth) + 'px';
    } else {
      image.style.left = left + 'px';
    }

    if (top > 0) {
      image.style.top = '0px';
    } else if (top < 0 - height + frameHeight) {
      image.style.top = (0 - height + frameHeight) + 'px';
    } else {
      image.style.top = top + 'px';
    }
  });

}());
