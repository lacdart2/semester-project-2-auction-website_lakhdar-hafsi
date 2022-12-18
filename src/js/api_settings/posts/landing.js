
import { API_AUCTION_URL } from "../constants.js";
import { fetchToken } from "../fetchToken.js";
const action = "/listings";
const getListingsURL = `${API_AUCTION_URL}${action}?_active=true&_seller=true&sort=created&sortOrder=desc`;




export async function readLanding() {

    const shortRecent = document.querySelector(".recent-added-short");
    const shortMostWanted = document.querySelector(".most-wanted-short");

    try {
        const response = await fetchToken(getListingsURL)
        const json = await response.json();
        console.log(json);
        // recent added items END  :

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

        /*  shortListings.innerHTML = ""; */


        console.log(stillActive);

        stillActive.forEach(function (listing) {

            const endsDate = listing.endsAt.toLocaleString();
            const splitEndDate = endsDate.split("T");

            const ends = splitEndDate[0];

            // showing only active listings with media for better UI:
            /*  if (listing.media.length >= 1 && listing.length <= 4) {
 
 
                 shortListings.innerHTML +=
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
 
 
 
             } */

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

        shortRecent.innerHTML = "";

        fewRecent.forEach(function (listing) {
            if (listing.media.length >= 1) {
                shortRecent.innerHTML +=
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
        shortMostWanted.innerHTML = "";

        result.forEach(function (listing) {
            if (listing._count.bids >= 6) {
                shortMostWanted.innerHTML +=
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

