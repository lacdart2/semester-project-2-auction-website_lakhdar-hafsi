
import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
/* import * as recentListings from "../../ui/recentListings.js"; */
/* import { filter } from "../../components/filter.js"; */

/* import { mediaChecker } from "../../ui/mediaChecker.js"; */
/* import { placeListings } from "./popular.js"; */
const action = "/listings";
const getListingsURL = `${API_AUCTION_URL}${action}?_active=true&_seller=true&sort=created&sortOrder=desc`;
/* const myListingsURL = `${API_AUCTION_URL}${action}?_tag=frame`; */



export async function read() {

    const listingsContainer = document.querySelector(".listings-container");
    const recent = document.querySelector(".recent-added");
    const mostWanted = document.querySelector(".most-wanted");

    try {
        const response = await fetchToken(getListingsURL)
        const json = await response.json();
        console.log(json);


        //***** */
        let filteredListings = json;
        /*  const listingsContainer = document.querySelector('.listings-container'); */
        const displayListings = () => {
            if (filteredListings.length < 1) {
                listingsContainer.innerHTML = `<h6 style="text-black fs-2">Sorry, no listings matched your search</h6>`;
                return;
            }

            listingsContainer.innerHTML = filteredListings
                .map((listing) => {
                    const { title, tags } = listing;
                    return
                    `<a a class="listing" href = "/post/detail/index.html?id=${listing.id}" >
                <div class="card">
                    <div class="card-body text-start overflow-hidden d-flex flex-column align-items-left">
                        <div class="card-top">
                            <div class="card-heading">
                                <h5 class="card-title">${listing.title}</h5>
                            </div>
                            <div class="card-details">
                                <small class="text-dark">
                                    <i class="fa-sharp fa-solid fa-clock"></i>
                                    ${ends}
                                </small>
                            </div>
                            <div class="listing-image">
                                <img src="${listing.media}" class="img-fluid rounded" alt="${listing.title}">
                            </div>
                            <div class="seller-info">
                                <a href="/post/detail/index.html?id=${listing.id}" class="">
                                    @ ${listing.seller.name}
                                </a>
                            </div>
                        </div>
                        <a href="/post/detail/index.html?id=${listing.id}" class="btn btn-primary mb-2">Place a Bid</a>
                        <a href="/post/detail/index.html?id=${listing.id}" class="btn btn-secondary">totals bids:${listing._count.bids} </a>
                    </div>
                </div>
             </a > 
            
            
            `;
                })
                .join('');
        };

        displayListings();

        // Text Filter

        /* const form = document.querySelector('.input-form'); */
        const searchInput = document.querySelector('.search-input');

        searchInput.addEventListener('keyup', (event) => {
            console.log(event);
            const inputValue = searchInput.value;
            filteredListings = json.filter((listing) => {
                listing.title.toLowerCase().includes(inputValue);
                return listing.tags[0].toLowerCase().includes(inputValue);
            });
            displayListings();
        });





        // recent added items END  :
        //*** */      
        const result = json.filter(listing => listing._count.bids > 1);
        const result2 = json.filter(listing => listing._count.bids <= 1);

        const totalArray = result.concat(result2);


        // display only still active bids ,not over dated
        const today = new Date();
        let stillActive = [];
        totalArray.map((listing) => {

            const listingDate = new Date(listing.endsAt);
            if (listingDate >= today) {
                // add to new array with only active
                stillActive.push(listing);
            }
        })
        console.log(stillActive);
        console.log(result.length, result2.length, totalArray.length);
        console.log(totalArray[3].media[0]);

        console.log(result);
        console.log([result2]);
        console.log(totalArray);


        console.log(json[1].endsAt);


        // listing end date :
        const endsDate = json[4].endsAt.toLocaleString();
        const splitEndDate = endsDate.split("T");
        console.log(splitEndDate);
        const ends = splitEndDate[0];
        //const event = new Date(latestJson.endsAt);
        const event = new Date(totalArray.endsAt);
        console.log(json[1].endsAt);

        listingsContainer.innerHTML = "";


        console.log(stillActive);

        stillActive.forEach(function (listing) {

            const endsDate = listing.endsAt.toLocaleString();
            const splitEndDate = endsDate.split("T");

            const ends = splitEndDate[0];

            // showing only active listings with media for better UI:
            if (listing.media.length >= 2) {


                listingsContainer.innerHTML +=
                    `<a class="listing" href = "/post/detail/index.html?id=${listing.id}">
                        <div class="listing-card">
                            <div class="card-body text-start overflow-hidden d-flex flex-column align-items-left">
                                <div class="card-top">
                                <div class="card-heading">
                               
                                    <h5 class="card-title text-white">${listing.title}</h5>
                           
                                 </div>
                                 <div class="card-details">
                                      <small class="listing-end-date">          
                                          <i class="fa-sharp fa-solid fa-clock p-3 ps-0"></i>
                                             ${ends}
                                        </small>   
                                     
                                    </div>
                                    <div class="listing-image ">
                                            <img src="${listing.media[0]}" class="img-fluid rounded first-img" alt="${listing.title}">
                                            <img src="${listing.media[1]}" class="img-fluid rounded second-img" alt="${listing.title}">
                                            <span class="img-counter p-2"><i class="fa-solid fa-image p-2"></i>${listing.media.length}</span>
                                            <div class="dots">
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                            </div>
                                     </div>     
                                      <div class="seller-info">
                                        <a href= "/post/detail/index.html?id=${listing.id}" class="listing-owner">
                                                @ ${listing.seller.name}          
                                         </a>
                                     </div>   
                                </div>
                               <a href="/post/detail/index.html?id=${listing.id}" class="btn btn-secondary">totals bids:${listing._count.bids} </a>
                                <a href="/post/detail/index.html?id=${listing.id}" class="btn btn-primary mt-2">Place a Bid</a>
                                 
                                </div> 
                        </div>
                     </a> `



            }

        });

        // recent added items :


        console.log(new Date());
        var yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        console.log(yesterday);
        var todayAtNoon = new Date(Date.now()).setHours(12, 0, 0, 0);
        console.log(todayAtNoon);

        function checkNewListings(json, todayAtNoon) {
            let newsArray = [];
            // Filter the items json to only include items added since yesterday and mark as new
            const newListings = json.filter(listing => new Date(listing.created) > yesterday);

            // add to array to be able later on to use forEach
            newsArray.push(newListings);
            console.log(json.created);
            console.log(newsArray);
            // Return the new array
            return newListings;
        }
        const newsArray = checkNewListings(json, yesterday);
        const fewRecent = newsArray.slice(-5);
        console.log(fewRecent);
        /*   const newsArray = newListings */


        //interval to check for new items :
        let currentTime = new Date();

        // Set the interval to check for new items every hour
        let interval = 3600 * 1000;

        // Check for new items every hour
        setInterval(function () {
            // Get the current time
            let currentTime = new Date();

            // Check if it's time to check for new items
            if (currentTime.getHours() === 12) {
                // Check for new items here
                checkNewListings(json, todayAtNoon)
                console.log("from interval function");
            }
        }, interval);

        recent.innerHTML = "";

        fewRecent.forEach(function (listing) {
            if (listing.media.length >= 1) {
                recent.innerHTML +=
                    `<a class="listing" href = "/post/detail/index.html?id=${listing.id}">
                        <div class="listing-card">
                            <div class="card-body text-start overflow-hidden d-flex flex-column align-items-left">
                                <div class="card-top">
                                    <div class="recent-added d-flex">
                                        <p class="btn btn-primary  ms-auto" href="#">New</p>
                                    </div>
                                <div class="card-heading">
                               
                                    <h5 class="card-title">${listing.title}</h5>
                           
                                 </div>
                                 <div class="card-details">
                                      <small class="listing-end-date">
                                          <i class="fa-sharp fa-solid fa-clock p-3 ps-0"></i>
                                             ${ends}
                                        </small>   
                                     
                                    </div>
                                    <div class="listing-image ">
                                            <img src="${listing.media[0]}" class="img-fluid rounded first-img" alt="${listing.title}">
                                            <img src="${listing.media[1]}" class="img-fluid rounded second-img" alt="${listing.title}">
                                            <span class="img-counter p-2"><i class="fa-solid fa-image p-2"></i>${listing.media.length}</span>
                                            <div class="dots">
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                            </div>
                                     </div>     
                                      <div class="seller-info">
                                        <a href= "/post/detail/index.html?id=${listing.id}" class="">
                                                @ ${listing.seller.name}          
                                         </a>
                                     </div>   
                                </div>
                                 <a href="/post/detail/index.html?id=${listing.id}" class="btn btn-secondary">totals bids:${listing._count.bids} </a>
                                <a href="/post/detail/index.html?id=${listing.id}" class="btn btn-primary mt-2">Place a Bid</a>
                                </div> 
                        </div>
                     </a> `

            }
        });

        // most wanted listings
        mostWanted.innerHTML = "";

        result.forEach(function (listing) {
            if (listing._count.bids >= 6) {
                mostWanted.innerHTML +=
                    `<a class="listing" href = "/post/detail/index.html?id=${listing.id}">
                        <div class="listing-card">
                            <div class="card-body text-start overflow-hidden d-flex flex-column align-items-left">
                                <div class="card-top">
                                 <div class="recent-added d-flex">
                                        <p class="btn btn-primary  ms-auto" href="#">Wanted</p>
                                    </div>                      
                                <div class="card-heading">
                               
                                    <h5 class="card-title">${listing.title}</h5>
                           
                                 </div>
                                 <div class="card-details">
                                       <small class="listing-end-date">
                                          <i class="fa-sharp fa-solid fa-clock p-3 ps-0"></i>
                                             ${ends}
                                        </small>   
                                     
                                    </div>
                                    <div class="listing-image ">
                                            <img src="${listing.media[0]}" class="img-fluid rounded first-img" alt="${listing.title}">
                                            <img src="${listing.media[1]}" class="img-fluid rounded second-img" alt="${listing.title}">
                                            <span class="img-counter p-2"><i class="fa-solid fa-image p-2"></i>${listing.media.length}</span>
                                            <div class="dots">
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                            </div>
                                     </div>     
                                      <div class="seller-info">
                                        <a href= "/post/detail/index.html?id=${listing.id}" class="">
                                                @ ${listing.seller.name}          
                                         </a>
                                     </div>   
                                </div>
                                 <a href="/post/detail/index.html?id=${listing.id}" class="btn btn-secondary">totals bids:${listing._count.bids} </a>
                                <a href="/post/detail/index.html?id=${listing.id}" class="btn btn-primary mt-2">Place a Bid</a>
                                 
                                </div> 
                        </div>
                     </a> `

            }

        });

    } catch (error) {
        console.log(error);

    }





};

