import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
import { remaining } from "../../ui/countDown.js";
import *  as storage from "../../utils/storage.js";
/* import * as ui from "../../ui/detailCarousel.js"; */
/* import { createBid } from "../bids/placeBid.js"; */
import { displayMessage } from "../../components/displayMessage.js";
/* import { submitBid } from "./bid.js"; */
/* import { placeBidListener } from "./placeBid.js"; */
/* const messageContainer = document.querySelector(".message-container") */


const action = "/listings";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");


if (!id) {
    /*  document.location.href = "/"; */
}

// access listing + seller name and bids :
const getListingsURL = `${API_AUCTION_URL}${action}/${id}?_seller=true&_bids=true`;
/* const getBidURL = `${API_AUCTION_URL}${action}/${id}/bids`; */
/* console.log(getBidURL); */

console.log(getListingsURL);


export async function listingDetail() {
    try {
        const response = await fetchToken(getListingsURL);
        console.log(response);
        const json = await response.json();
        console.log(json);

        console.log(json.created.toLocaleString())
        const test = json.created.toLocaleString();
        const splitCreatedDate = test.split("T");
        const created = splitCreatedDate[0];

        // bids total :
        const bidsCounter = json.bids.length;
        console.log(bidsCounter);
        console.log(created);

        // last highest  bid :
        const bidsArray = json.bids;

        // last highest bid amount :

        const lastBid = bidsArray.slice(-1);
        const lastBidAmount = lastBid[0].amount;

        // last bider :
        const lastBider = lastBid[0].bidderName;


        // bids created date :

        // display bids history :


        function displayBids(bid) {

            /*             var bidYear = elementDate.getFullYear() 
                        var bidHours = elementDate.getHours();
                        var bidMins = elementDate.getMinutes();
                        var bidExactDate = (bidYear.toString() + "-" + monthNo.toString() + "-" + day.toString()); */
            bidsArray.forEach(bid => {

                const bidEvent = new Date(bid.created);
                const createdBid = bidEvent.toLocaleString();
                console.log(createdBid.split("."));
                const createdBidArray = createdBid.split(".");
                const bidDate = createdBidArray[0].split(",")[0];
                const bidTime = createdBidArray[0].split(",")[1];

                console.log(createdBidArray);




                console.log(bid.created.toLocaleString());
                console.log(bid.created.split('T')[1] + "/")
                // bids history
                console.log("bid:" + bid.amount + "by: " + bid.bidderName)
                bidsContainer.innerHTML += `<div class="bid-row text-dark border-bottom p-2 d-flex flex-row align-items-center  justify-content-between">
                                                <h6>${bid.amount}<i class="fa-solid fa-coins px-2 "></i>  by
                                                 <a href="/post/edit/index.html" class="btn btn-light ">
                   
                                                  @${bid.bidderName} 
                                                 </a></h6> 
                                                
                                                <span class="text-dark fs-6">${bidDate} -- ${bidTime}</span>
                                            </div>`

                /*  bidsContainer.innerHTML += `<p>Your bid ${Number(newBid)} is successfully sent </p>`
                 placeBid(id, Number(newBid)); */
            });


        }


        console.log(bidsArray);
        console.log(lastBid);
        console.log(lastBidAmount);
        ////////////////////////////////////////////////////// send a bid :

        ////////////////////////////////////////////////////// send a bid  END :
        // bids history in modal :

        //test
        // end time
        /*     const endDate = json.endsAt.toLocaleString();
            console.log(endDate);
    
            var bidEndDate = new Date(endDate).getTime();
            console.log(bidEndDate); */

        // Update the count down every 1 second

        // Get todays date and time

        //end test


        /* const event = new Date(json.endsAt).getTime(); */
        const event = new Date(json.endsAt).getTime();

        const endTime = json.endsAt.toLocaleString();
        const auctionEndTime = new Date(endTime).getTime();

        console.log(json.endsAt.toLocaleString());


        /*  test */

        const startTime = json.created.toLocaleString();
        const auctionStartTime = new Date(startTime).getTime();
        console.log(auctionStartTime);


        const start = new Date(json.created).getTime();
        const end = new Date(json.endsAt).getTime();

        async function auctionStatus(start, end) {

            let currentTime = new Date().getTime();
            console.log(currentTime)
            if (currentTime < end && currentTime > start) {
                console.log('Auction is in progress.');
            } else if (currentTime > end) {
                console.log('Auction is over.');
            } else {
                console.log('Auction has not started yet.');
            }
            /*     if (currentTime >= start && currentTime <= end) {
                    console.log('Auction is in progress.');
                } else if (currentTime > end) {
                    console.log('Auction is over.');
                } else {
                    console.log('Auction has not started yet.');
                } */
        }

        /*  end test */


        //const event = new Date(details.endsAt);
        /*      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', time: "numeric" };
             console.log(event.toLocaleDateString("en-EG",options)); */
        console.log(event.toLocaleString());


        document.title = json.title;

        const listingContainer = document.querySelector(".listing-container");
        const bidsContainer = document.querySelector(".bids-content");
        /*      const placeBidContainer = document.querySelector(".bids-content"); */


        listingContainer.innerHTML = `<a class="listing listing-details" href = "/">
                                        <div data-end = ${json.endsAt} class="card ">
                                            <div class="card-body text-start overflow-hidden d-flex flex-column align-items-left">
                                                <div class="card-top">
                    
                                                    <h5 class="card-title">${json.title}</h5>
                    
                                                    <div class="card-details p-2">
                                                        <p class="description fs-6 text-left text-dark">
                                                           ${json.description}
                                                        </p>
                                                        <div class="listing-info p-2  ms-0 ps-0">
                                                         <div class="border listing-info-top col12-col-md12-col-sm-6 d-flex  align-items-left justify-content-left ">
                                                            
                                                           <div id="carouselExampleControls" class="carousel  listing-image slide" data-bs-ride="carousel">
                                                                <div class="carousel-inner">
                                                                    <div class="carousel-item active">
                                                                    <img src="${json.media[0]}" class="" alt="${json.title}">
                                                                    </div>
                                                                    <div class="carousel-item">
                                                                    <img src="${json.media[1]}" class="" alt="${json.title}">
                                                                    </div>
                                                                
                                                                </div>
                                                                <button class="carousel-control-prev " type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                                    <span class="btn  carousel-control-prev-icon" aria-hidden="true"></span>
                                                                    <span class="visually-hidden">Previous</span>
                                                                </button>
                                                                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                                    <span class="btn  carousel-control-next-icon" aria-hidden="true"></span>
                                                                    <span class="visually-hidden">Next</span>
                                                                </button>
                                                            </div>
                                                        
                                                             <div class="listing-update text-dark d-flex flex-column  ">
                                                                    <p class="bids-info ">Total Bids :
                                                                            <a href="/" class="btn btn-light ms-2">
                                                                                ${bidsCounter}
                                                                            </a>
                                                                    </p>
                                                                    <p class="bids-info">current bid : 
                                                                       <a href="/" class="btn btn-light ms-2">
                                                                            ${lastBidAmount} <i class="fa-solid fa-coins ms-2"></i> 
                                                                        </a>
                                                                    </p>
                                                                     <p class="bids-info">Last Bider :
                                                                       <a href="/" class="btn btn-light ms-2">
                                                                              @ ${lastBider} 
                                                                        </a>
                                                                    </p>
                                                                   
                                                                </div>
                                                         </div>
                                                              
                                                         <div class="border seller-info d-flex flex-row  align-items-center justify-content-between my-2">                                                        
                                                                   
                                                                   <a href="/post/edit/index.html" class="btn btn-seller p-2 ">
                                                                        @ ${json.seller.name} <img class="profile-avatar" 
                                                                        src="${json.seller.avatar}"/>
                                                                    </a>
                                                                                                                              
                                                                    <button type="submit" class="btn btn-primary " data-bs-toggle="modal"
                                                                              data-bs-target="#exampleModal">
                                                                               <i class="fa-solid fa-arrow-down pe-2 pt-2"></i>
                                                                               See all bids (${bidsCounter})
                                                                    </button>
                                                                  
                                                          </div>
                                                        </div>
                                                        <small class="mb-3">
                                                            <i class="fa-solid fa-calendar-days"></i>
                                                           
                                                            posted: ${created}
                                                        </small>
                                                    </div>
                                                </div>
                                                 <section id="count-down-section" data-count ="count">
                                                      <div class="countdown-wrapper">
                                                          <div class="countdown-container">
                                                           <h3>Time Left</h3>
                                                            <div class="countdown" id="countdown">
                                                               <div class="time">
                                                                   <p id="days"></p>
                                                                    <small>days</small>
                                                                 </div>
                                                                  <div class="time">
                                                                     <p id="hours"></p>
                                                                      <small>hours</small>
                                                                   </div>
                                                                   <div class="time">
                                                                       <p id="minutes"></p>
                                                                        <small>minutes</small>
                                                                    </div>
                                                                    <div class="time">
                                                                         <p id="seconds"></p>
                                                                         <small>seconds</small>
                                                                    </div>
                                                          </div>
                                                        </div>
                                                     </div>
                                                     <div class="expired"></div>
                                                 </section>
                                                 <form class="bid-form">
                                                    <div class="form-group mb-3">
                                                    <label for="bid-input" class="py-3">Bid Now and win a great Deal</label>
                                                        <input class="form-control" id="bid-input" placeholder="Higher Than ${lastBidAmount} " 
                                                        type="text" name="bid">
                                                    </div>
                                                    <button type="submit" class="btn btn-primary ">       
                                                            PACE BID
                                                </button>
                                            
                                            </form>
                                            </div>
                                        </div>
                                 </a> `

        const imageAvatar = document.querySelectorAll(".profile-avatar");
        if (!json.seller.avatar) {
            imageAvatar.style.visibility = "hidden";
        }
        auctionStatus(json.created, json.endsAt);
        displayBids();
        remaining(json);
        /*   submitBid(id, amount); */



        /*  placeBid() */
    } catch (error) {


        displayMessage("warning", "", error, "", ".message-container");
    }


};
/* < div class="listing-image col-12 col-md-10 mt-lg-5 mt-5 text-dark d-flex flex-wrap
    justify - content - center align - items - start gap - 2">
    < a target="_blank" ><img src="${json.media[0]}" class="album-img rounded mb-2" alt="${json.title}"></>
        <a target="_blank"><img src="${json.media[1]}" class="album-img  rounded " alt="${json.title}"></a>
</div > */
{/* <div class="listing-image row col-12">
    <img src="${json.media[0]}" class="rounded mb-2" alt="${json.title}">
        <img src="${json.media[1]}" class="img-thumbnail rounded" alt="${json.title}">
        </div> 
    
    
<div id="carousel">        
    <div class="carousel-wrapper">
            <img src="${json.media[0]}" alt="${json.title}">
          <img src="${json.media[1]}" alt="${json.title}">
      </div>
</div>

    
    
    
    
    */}
/* 
const bidBtn = document.querySelector(".bid-btn");
const bidInput = document.querySelector(".bid-input");
const currentBid = lastBid[0].amount;
console.log(currentBid + "SOUK AHRAS MAN");
const userCredit = storage.getFromStorage("credit");

bidBtn.addEventListener("click", createBid);

const method = "POST";

function createBid(event) {
    event.preventDefault();

    const bidValue = parseFloat(bidInput.value);
    console.log("souk ahras " + bidValue);
    // check that amount is greater than current bid
    if (bidValue <= currentBid) {
        alert("Your bid must be higher than the current bid");
        return;
    }
    if (currentBid && bidValue.length === 0 && isNaN(bidValue)) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }
    placeBid(amount);
}
const BidURL = `${API_AUCTION_URL}${action}/${id}/bids`;
async function placeBid(amount) {


    const data = JSON.stringify({
        amount: bidValue,
    });
    const options = {
        method: method,
        body: data,

    };
    try {
        const response = await fetchToken(BidURL, options);
        const jsonBid = await response.json();
        console.log(jsonBid);

        if (jsonBid) {
            // update current bid
            console.log(jsonBid.bids)
            currentBid = amount;
            displayMessage("success", "", "Product created", "", ".message-container");

            // (json.id).storage.saveToStorage("myId", id); 
            console.log(jsonBid.id);
            bidInput.clear();

        }

        if (jsonBid.error) {
            displayMessage("error", "", jsonBid.message, "", ".message-container");
        }

        console.log(jsonBid);
    } catch (error) {
        console.log(error);
        displayMessage("error", "An error occurred", ".message-container");
    }
    // check that the user is logged in
    // if (!loggedIn) {
    //alert("Please log in to place a bid");
    //return;
    //} 






    // send bid to server
    //listingDetails(amount);
}
 */