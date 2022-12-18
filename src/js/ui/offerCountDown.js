// countdown offer remaining dates

// Set the date to end offer
var offerEnds = new Date(2023, 1, 1).getTime();

// Update the count down every 1 second

export function offerToNewUser() {


    var offerCD = setInterval(function () {
        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = offerEnds - now;

        // Time calculations for days, hours, minutes and seconds
        var daysOffer = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hoursOffer = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutesOffer = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var secondsOffer = Math.floor((distance % (1000 * 60)) / 1000);

        document.querySelector("#daysContainer").innerHTML = daysOffer;
        document.querySelector("#hoursContainer").innerHTML = hoursOffer;
        document.querySelector("#minutesContainer").innerHTML = minutesOffer;
        document.querySelector("#secondsContainer").innerHTML = secondsOffer;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(offerCD);
            document.getElementById("year").innerHTML = "SOON";
        }
    }, 1000);
}

