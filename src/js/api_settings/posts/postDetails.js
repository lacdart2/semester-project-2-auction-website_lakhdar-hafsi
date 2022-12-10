import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";

import { remaining } from "../../ui/countDown.js";


/* import { displayMessage } from "../../components/displayMessage.js";
const messageContainer = document.querySelector(".message-container") */
const action = "/listings";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");


if (!id) {
    /*  document.location.href = "/"; */
}

// access listing + seller name and bids :
const getListingURL = `${API_AUCTION_URL}${action}/${id}?_seller=true&_bids=true`;


console.log(getListingURL);


export async function postDetail() {
    try {
        const response = await fetchToken(getListingURL);
        console.log(response);
        const json = await response.json();
        console.log(json.description);

        console.log(json.created.toLocaleString())
        const test = json.created.toLocaleString();
        const splitCreatedDate = test.split("T");
        const created = splitCreatedDate[0];

        // bids total :
        const bidsCounter = json.bids.length;
        console.log(bidsCounter);
        console.log(created);

        // last highest last bid :
        const bidsArray = json.bids;

        // last highest bid amount :
        const lastBid = bidsArray.slice(-1);
        const lastBidAmount = lastBid[0].amount + " ,-";

        // last bider :
        const lastBider = lastBid[0].bidderName;


        // bids created date :

        // display bids history :

        function displayBids(bid) {

            bidsArray.forEach(bid => {

                console.log("bid:" + bid.amount + "by: " + bid.bidderName)
                bidsContainer.innerHTML += `<div class="bid-row text-dark border-bottom p-2 d-flex flex-row align-items-center  justify-content-between">
                                                <h6>${bid.amount},-  by
                                                 <a href="/post/edit/index.html" class="btn btn-light ">
                   
                                                  @${bid.bidderName} 
                                                 </a></h6> 
                                                
                                                <span class="text-dark fs-6">${bid.created}</span>
                                            </div>`
            });
        }


        console.log(bidsArray);
        console.log(lastBid);
        console.log(lastBidAmount);


        // bids history in modal :

        /*   const findHighestBid = bidsArray.findLast((element) => element > 0); */
        /*         console.log(findHighestBid); */



        /*         console.log(typeof details.endsAt.split('-'));
                console.log(typeof parseInt(details.endsAt)); */

        const event = new Date(json.endsAt);
        console.log(json.endsAt.toLocaleString());
        //const event = new Date(details.endsAt);
        /*      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', time: "numeric" };
             console.log(event.toLocaleDateString("en-EG",options)); */
        console.log(event.toLocaleString());




        //////////////////////




        //////////////////////

        document.title = json.title;

        const postContainer = document.querySelector(".post-container");
        const bidsContainer = document.querySelector(".bids-content");


        postContainer.innerHTML = `<a class="post post-details" href = "/">
                                        <div data-end = ${json.endsAt} class="card">
                                            <div class="card-body text-start overflow-hidden d-flex flex-column align-items-left">
                                                <div class="card-top">
                    
                                                    <h5 class="card-title">${json.title}</h5>
                    
                                                    <div class="card-details p-2">
                                                        <p class="fs-6 text-left text-dark">
                                                           ${json.description}
                                                        </p>
                                                        <div class="listing-info p-3 ps-0">
                                                            <div class="d-flex flex-row  align-items-center justify-content-center gap-5 border listing-row p-3">
                                                                <div class="post-image">
                                                                    <img src="${json.media}" class="img-thumbnail rounded mb-2" alt="${json.title}">
                                                                </div>
                                                                <div class="listing-update text-dark d-flex flex-column ">
                                                                    <p>Total Bids :
                                                                        <a href="/post/edit/index.html" class="btn btn-light ">
                                                                            ${bidsCounter}
                                                                        </a>
                                                                        </p>
                                                                    <p>Last Bid :<a href="/" class="btn btn-light ">
                                                                      ${lastBidAmount} </a>
                                                                     </p>
                                                                    
                                                                    <p>Last Bider : 
                                                                        <a href="/post/edit/index.html" class="btn btn-light ">
                                                                            @ ${lastBider} 
                                                                        </a>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                              
                                                         <div class="seller-info d-flex flex-row  align-items-center justify-content-between my-2">
                                                           
                                                                    <a href="/post/edit/index.html" class="btn btn-primary btn-danger">
                                                                        @ ${json.seller.name} <img class="profile-avatar" src="${json.seller.avatar}"/>
                                                                    </a>
                                                                                                                              
                                                                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                                                                        data-bs-target="#exampleModal">
                                                                                    <i class="fa-regular fa-timer "></i>${bidsCounter}
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
                                                           <h3>Time Left<i class="fa-solid fa-timer"></i></h3>
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
                                               
                                                <a href="/post/edit/index.html" class="btn btn-primary btn-danger">Place Bid</a>
                                            </div>
                                        </div>
                                 </a> `

        displayBids();
        remaining(json);

    } catch (error) {


        /*    displayMessage("warning", error, "", ".message-container"); */
    }


};

{/* <a href="/post/edit/index.html" class="btn btn-primary ">Highest Bid : ${lastBidAmount}</a> */ }

{/* <div class="avatar">
    <a href="/post/edit/index.html" class="btn btn-primary btn-danger btn-avatar p-0 py-0">
        <img class="seller-avatar img-thumbnail rounded
                                                                        " src="${json.seller.avatar}" alt="seller avatar" />
    </a>
</div> */}
{/* <span class="bids-number"><img src="/assets/images/auction.png" /> ${bidsCounter}</span>  */ }