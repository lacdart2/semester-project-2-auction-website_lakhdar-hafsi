// Get a reference to the carousel wrapper element
var detailAlbum = document.querySelector('.carousel-wrapper');

// Set the initial position of the wrapper to show the first image
detailAlbum.style.transform = 'translateX(0%)';

// Set up a timer to switch the images every 5 seconds
setIntervalDetailCarousel(function (json) {
    // Get the current position of the wrapper
    var currentPosition = parseInt(wrapper.style.transform.split('(')[1].split('%')[0]);

    // Calculate the new position of the wrapper based on the current position
    var newPosition = currentPosition - 100;

    // If the new position is less than -100%, reset it to 0%
    if (newPosition < -100) {
        newPosition = 0;
    }

    // Update the transform property of the wrapper to the new position
    wrapper.style.transform = 'translateX(' + newPosition + '%)';
}, 1000);
