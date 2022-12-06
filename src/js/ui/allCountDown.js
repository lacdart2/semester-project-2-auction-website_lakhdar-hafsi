/* import { read } from "../api_settings/posts/read.js";


const event = new Date();

export function remainingAll(json) {
  

        setInterval(function () {
          
    
            
      
            const endDate = json.endsAt.toLocaleString();
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
          
       
                // If the count down is finished write
                if (distance < 0) {
                    clearInterval(remainingAll);
                    document.getElementById("minutes").innerHTML = "SOON";
          
                }
          
   

        }, 3000);
  

       read(json);
    
  }
 */


/* 
import { read } from "../api_settings/posts/read.js";

const event = new Date();


export function setupTimeElements() {

            
   
 
        const listing = document.querySelector(".post");
        const countDownSingle = document.querySelector(".countdown-container");
        const countWrapper = document.querySelector(".countdown-wrapper");
        const countSection = document.querySelector(".count-down-section");

        // create a new div element days
        const countDown = document.createElement("div");
        countDown.classList.add("countDown");

        // create a new div element
        const time = document.createElement("div");
        time.classList.add("time");

        // create a new P element
        const daysP = document.createElement("p");
        daysP.classList.add("days");

        // create a new small element
        const smallD = document.createElement("small");

        // and give it some content
        const smallTextD = document.createTextNode("Days");
   
   
    
        // create a new div element hours
        const timeH = document.createElement("div");
        timeH.classList.add("time");

        // create a new P element
        const hoursP = document.createElement("p");
        hoursP.classList.add("days");

        // create a new small element
        const smallH = document.createElement("small");

        // and give it some content
        const smallTextH = document.createTextNode("hours");

        // create a new div element minutes
        const timeM = document.createElement("div");
        timeM.classList.add("time");

        // create a new P element
        const minutesP = document.createElement("p");
        minutesP.classList.add("minutes");

        // create a new small element
        const smallM = document.createElement("small");

        // and give it some content
        const smallTextM = document.createTextNode("minutes");

        // create a new div element seconds
        const timeS = document.createElement("div");
        timeS.classList.add("time");

        // create a new P element
        const secondsP = document.createElement("p");
        secondsP.classList.add("seconds");

        // create a new small element
        const smallS = document.createElement("small");

        // and give it some content
        const smallTextS = document.createTextNode("seconds");

        time.appendChild(daysP, smallD);
        timeH.appendChild(hoursP, smallH);
        timeM.appendChild(minutesP, smallM);
        timeS.appendChild(secondsP, smallS);
        countDown.appendChild(time, timeH, timeM, timeS);


        countDownSingle.appendChild(countDown);
        countWrapper.appendChild(countDownSingle);
        countSection.appendChild(countWrapper);


        listing.appendChild(countSection);


      


}

export function remainingAll(days, time) {
   
    setInterval(function () {
  
        const endDate = json.endsAt.toLocaleString();
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

       

        document.querySelector(".days").innerHTML = days;
        document.querySelector(".hours").innerHTML = hours;
        document.querySelector(".minutes").innerHTML = minutes;
        document.querySelector(".seconds").innerHTML = seconds;






        // If the count down is finished write
        if (distance < 0) {
            clearInterval(remainingAll);
            document.getElementById("minutes").innerHTML = "SOON";
        }

        read(post);

    }, 1000);


}

 */

/* 
document.body.onload = addElement;

function addElement() {
    // create a new div element
    const newDiv = document.createElement("div");

    // and give it some content
    const newContent = document.createTextNode("Hi there and greetings!");

    // add the text node to the newly created div
    newDiv.appendChild(newContent);

    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
} */


export function remainingAll(latestJson) {

    setInterval(function () {
        /*   let latestJson = json.reverse(); */
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






        const countDownSingle = document.querySelector(".countdown-container");
        const countDown = document.querySelector(".countdown");



        var timeDays = document.querySelector(".timeD")
        var timeHours = document.querySelector(".timeH")
        var timeMinutes = document.querySelector(".timeM")
        var timeSeconds = document.querySelector(".timeS")
        // create a new P element
        const daysP = document.createElement("p");
        daysP.classList.add("days");

        // create a new small element
        const smallD = document.createElement("small");

        // and give it some content
        const smallTextD = document.createTextNode("Days");

        timeDays.appendChild(daysP, smallD)




        // create a new P element
        const hoursP = document.createElement("p");
        hoursP.classList.add("hours");

        // create a new small element
        const smallH = document.createElement("small");

        // and give it some content
        const smallTextH = document.createTextNode("hours");
        timeHours.appendChild(hoursP, smallH)


        // create a new P element
        const minutesP = document.createElement("p");
        minutesP.classList.add("minutes");

        // create a new small element
        const smallM = document.createElement("small");

        // and give it some content
        const smallTextM = document.createTextNode("minutes");
        timeMinutes.appendChild(minutesP, smallM)

  

        // create a new P element
        const secondsP = document.createElement("p");
        secondsP.classList.add("seconds");

        // create a new small element
        const smallS = document.createElement("small");

        // and give it some content
        const smallTextS = document.createTextNode("seconds");
        timeSeconds.appendChild(secondsP, smallS);

        countDown.appendChild(timeDays, timeHours, timeMinutes, timeSeconds);
        countDownSingle.appendChild(countDown);


        timeDays = days;
        timeHours = hours;
        timeMinutes = minutes;
        timeSeconds = seconds;

        /*  document.querySelector(".days").innerHTML = days;
         document.querySelector(".hours").innerHTML = hours;
         document.querySelector(".minutes").innerHTML = minutes;
         document.querySelector(".seconds").innerHTML = seconds; */


        // If the countdown is finished write
        if (distance < 0) {
            clearInterval(remainingAll);
            document.querySelector(".minutes").innerHTML = "SOON";
        }



    }, 1000);
    /*   read(post); */
    /*  postDetail(json); */
}
