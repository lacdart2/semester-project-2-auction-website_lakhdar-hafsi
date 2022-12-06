
import { read } from "../api_settings/posts/read.js";

const event = new Date();

export function remaining(latestJson) {

  setInterval(function () {

    const endDate = latestJson.endsAt.toLocaleString();
        console.log(endDate);

        var bidEndDate = new Date(endDate).getTime();
        console.log(bidEndDate);
   
        // Update the count down every 1 second

        // Get todays date and time
        var now = new Date().getTime();
        console.log(now);

        // distance between now and the bid date
        var distance = bidEndDate - now;
        console.log(distance);

        // Time calculations for days, hours, minutes and seconds
    
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        console.log(days, hours, minutes, seconds);

       
   


   
    document.querySelector("#days").innerHTML = days;
    document.querySelector("#hours").innerHTML = hours;
    document.querySelector("#minutes").innerHTML = minutes;
    document.querySelector("#seconds").innerHTML = seconds;
        

        // If the countdown is finished write
        if (distance < 0) {
            clearInterval(remaining);
            document.querySelector("#minutes").innerHTML = "SOON";
        }
        


    }, 1000);

    }

