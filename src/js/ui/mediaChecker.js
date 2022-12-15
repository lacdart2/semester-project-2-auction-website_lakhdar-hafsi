import { read } from "../api_settings/posts/read.js";

export async function mediaChecker(json) {

    /*     read(json); */
    /*  const listWithImages = []
     for (i = 0; i < totalArray.length; i++)
         if (totalArray.media[0]) {
             totalArray.push(listWithImages);
             console.log(listWithImages);
         }; */
    if (json.media.length === 1) {
        /*  read(json); */
        return totalArray.push(json.media.length === 1);
    } else {
        return totalArray.unshift(json.media.length === 1)
    }

}

/*  test */
/* const auctionStartTime = new Date(json.created);
console.log(auctionStartTime);
const bidStatus = document.querySelector(".action-status");
function auctionStatus(auctionStartTime, event) {

    let currentTime = new Date();
    console.log(currentTime);
    if (currentTime >= auctionStartTime && currentTime <= event) {
        bidStatus.innerHTML += `<p> Auction is in progress</p>`
        console.log('Auction is in progress.');
    } else if (currentTime > event) {
        bidStatus.innerHTML += `<p> Auction is Over !</p>`
        console.log('Auction is over.');
    } else {
        bidStatus.innerHTML += `<p> Auction has not started yet!</p>`
        console.log('Auction has not started yet.');
    }
} */
/*  end test */